import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entry]-Add"; payload: Entry }
  | { type: "[Entry]-Updated"; payload: Entry }
  | { type: "[Entry]-Refresh-data"; payload: Entry[] }
  | { type: "[Entry] - Entry-Deleted"; payload: Entry };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry]-Add":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entry]-Updated":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            //return action.payload;
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          //ahora regresa la entry modificada
          return entry;
        }),
      };
    case "[Entry]-Refresh-data":
      return {
        ...state,
        entries: [...action.payload],
      };
    case "[Entry] - Entry-Deleted":
      return {
        ...state,
        entries: state.entries.filter(
          (entry) => entry._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
