import { FC, useReducer, PropsWithChildren } from "react";
import { UIContext, uiReducer } from "./";
//comenta
//aca se pasan los valores del estado!
export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  children?: React.ReactNode;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  // children: undefined,
};

// export const UIProvider: FC<PropsWithChildren<UIState>> = ({ children }) => {
export const UIProvider: FC<UIState> = ({ children }) => {
  //comenta que aca podemos usar useState en lugar de useReducer si se trata de algo mas chico
  //useReducer(elReducer, estadoInicial)
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const closeSideMenu = () => dispatch({ type: "[UI] - Close Sidebar" });
  const openSideMenu = () => dispatch({ type: "[UI] - Open Sidebar" });
  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "[UI] - isAddingEntry", payload: isAdding });
  };
  const startDragging = () => {
    dispatch({ type: "[UI] - startDragging" });
  };
  const endDragging = () => {
    dispatch({ type: "[UI] - endDragging" });
  };
  return (
    <UIContext.Provider
      value={{
        //sidemenuOpen:false
        //sidemenuOpen: state.sidemenuOpen,
        ...state,
        //methods
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
