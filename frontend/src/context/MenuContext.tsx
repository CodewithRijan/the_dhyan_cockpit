import { createContext } from "react";

export interface menu {
  isModalOpen: boolean,
  setIsModalOpen: any
}

const MenuContext = createContext<menu | null>(null);

export default MenuContext;
