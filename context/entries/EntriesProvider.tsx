import { FC, useReducer, useEffect } from "react";
//import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
export interface EntriesState {
  entries: Entry[]; //esto es el estado!
  children?: React.ReactNode;
}
//video 128 quita y deja array vacio
// const Entries_INITIAL_STATE: EntriesState = {
//   entries: [
// {
//   _id: uuidv4(),
//   description: "Pendiente: algo como descripcion",
//   status: "pending",
//   createdAt: Date.now(),
// },
// {
//   _id: uuidv4(),
//   description: "In-Progress: algo como descripcion para el segundo",
//   status: "in-progress",
//   createdAt: Date.now() - 1000000,
// },
// {
//   _id: uuidv4(),
//   description: "Finished: algo como descripcion para el tercero",
//   status: "finished",
//   createdAt: Date.now() - 1000000,
// },
//   ],
// };
const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};
export const EntriesProvider: FC<EntriesState> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  //para el snackbar
  const { enqueueSnackbar } = useSnackbar();

  //video 112
  const addNewEntry = async (description: string) => {
    //video 132 quita junto con uuidv4
    // const newEntry: Entry = {
    //   //en produccion no usamos uuidv4
    //   _id: uuidv4(),
    //   description: description,
    //   createdAt: Date.now(),
    //   status: "pending",
    // };
    //----
    const { data } = await entriesApi.post<Entry>("/entries", {
      description: description,
    });
    //ahora necesito llamar el dispatch de esta accion
    // dispatch({ type: "[Entry]-Add", payload: newEntry });
    //video 132
    dispatch({ type: "[Entry]-Add", payload: data });
  };
  //video 116 modifica en video 135
  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar?: boolean
  ) => {
    try {
      //lo manda al backend
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry]-Updated", payload: data });

      //mostrar snackbar pero no al hacer drop
      if (showSnackbar) {
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  //video 129
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    //console.log(resp) ve que le interesa la data
    //una vez editado el reducer usamos
    dispatch({ type: "[Entry]-Refresh-data", payload: data });
  };
  useEffect(() => {
    refreshEntries();
  }, []);

  //video 151
  const deleteEntry = async (entry: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`);

      dispatch({
        type: "[Entry] - Entry-Deleted",
        payload: data,
      });

      if (showSnackbar) {
        enqueueSnackbar("Entrada borrada correctamente", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
