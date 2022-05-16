import { UIState } from "./";

type UIActionType =
  | { type: "[UI] - Open Sidebar" }
  | { type: "[UI] - Close Sidebar" }
  | { type: "[UI] - isAddingEntry"; payload: boolean }
  | { type: "[UI] - startDragging" }
  | { type: "[UI] - endDragging" };
export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "[UI] - Open Sidebar":
      return {
        //state.open=true por ej no se puede! seria cambiar el estado
        ...state, //con spread copio y modifico solo sidemenuOpen
        sidemenuOpen: true,
      };

    case "[UI] - Close Sidebar":
      return {
        ...state,
        sidemenuOpen: false,
      };
    case "[UI] - isAddingEntry":
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case "[UI] - startDragging":
      return {
        ...state,
        isDragging: true,
      };
    case "[UI] - endDragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
