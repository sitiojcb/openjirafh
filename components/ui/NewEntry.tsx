import { ChangeEvent, useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
//
export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  // const [isAdding, setIsAdding] = useState(false);
  //video 113 cambia por el context
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };
  const onSave = () => {
    if (inputValue.length === 0) return;
    // console.log(inputValue);
    //aca debemos llamar al addEntry del context
    addNewEntry(inputValue); //con esto grabamos
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue("");
  };
  //border: "#d94e18"
  return (
    <>
      <Box sx={{ marginBottom: 2, paddingX: 1 }}>
        {isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder="Nueva tarea"
              autoFocus
              multiline
              label="Nueva tarea"
              helperText={
                inputValue.length <= 0 && touched && "Ingrese tarea a realizar."
              }
              value={inputValue}
              onChange={onTextFieldChanged}
              error={inputValue.length <= 0 && touched}
              onBlur={() => setTouched(true)}
            />
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<CancelPresentationOutlinedIcon />}
                onClick={() => setIsAddingEntry(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}
              >
                Guardar
              </Button>
            </Box>
          </>
        ) : (
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar Tarea
          </Button>
        )}
      </Box>
    </>
  );
};
