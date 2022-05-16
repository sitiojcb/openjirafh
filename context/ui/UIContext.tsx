import { createContext } from "react";
//comenta
// esta interface son las propiedades de UIContext pero no el estado en si. esos valores son los del UIProvider interface
//export
interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  //methods
  closeSideMenu: () => void;
  openSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
  //children?: React.ReactNode;
}

export const UIContext = createContext({} as ContextProps);
