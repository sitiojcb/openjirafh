import { useRouter } from "next/router";
import { useState, ChangeEvent, useMemo, FC, useContext } from "react";
import { GetServerSideProps } from "next";
//import { isValidObjectId } from "mongoose";
//al usar dbEntries ya no usa mongoose
import { dbEntries } from "../../database";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  IconButton,
} from "@mui/material";
import { EntriesContext } from "../../context/entries";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Layout } from "../../components/layouts";
import { EntryStatus, Entry } from "../../interfaces";
import { dateFunctions } from "../../utils";

//comenta podemos crear endpoint pero aca lo hace en duro
const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  // age: number;video 149
  entry: Entry;
}
// export const EntryPage: FC<Props> = (props) => { v151
export const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  //console.log({ props });
  // const [inputValue, setInputValue] = useState("");v151
  const [inputValue, setInputValue] = useState(entry.description);
  // const [status, setStatus] = useState<EntryStatus>("pending");
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );
  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    //cuando el campo cambie llama a la funcion y actualiza el valor
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    //console.log("desde onStatusChanged: " + event.target.value);
    setStatus(event.target.value as EntryStatus);
  };
  const onSave = () => {
    //console.log({ inputValue, status });
    //video 151
    //si no tengo texto no sigue
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status: status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
  };
  //copio de comentario de alumno
  const onDelete = () => {
    deleteEntry(entry, true);
    router.push("/");
  };
  return (
    <>
      {/* <Layout title="....."> */}
      <Layout title={inputValue.substring(0, 20) + " ..."}>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader
                title={`Entrada: `}
                subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                  entry.createdAt
                )} `}
              />
              <CardContent>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  placeholder="Nueva entrada."
                  autoFocus
                  multiline
                  label="Nueva entrada"
                  value={inputValue}
                  onChange={onInputValueChanged}
                  onBlur={() => setTouched(true)}
                  helperText={isNotValid && "Ingrese un valor"}
                  error={isNotValid}
                />
              </CardContent>
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <CardActions>
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled={inputValue.length <= 0}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <IconButton
          onClick={onDelete}
          sx={{
            position: "fixed",
            bottom: "30px",
            right: 30,
            backgroundColor: "error.dark",
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Layout>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//esto corre del lado del servidor!, podemos usar tokens o secret key sin problemas
//const { data } = await entriesApi; comenta no tiene sentido hacer esta peticion
//lo que necesito en realidad es obtener el id por el url y si no es valido impedirlo
//console.log(ctx.params);
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById(id);
  //comenta que no tiene sentido renderizar la pag si el id no es valido
  // if (!isValidObjectId(id)) { video 149
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      //recuerda que lo que pase aca lo recibe arriba como parametro mas alla de lo de la interface
      //id: isValidObjectId(id),
      // name: "juan",
      //id,//video 149
      //si uso entry: entry._id da error object/object
      entry,
    },
  };
};
export default EntryPage;
