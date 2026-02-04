import MenuContext from "@/context/MenuContext"
import { useState } from "react";

function MenuContextProvider({ children }: { children: any }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <MenuContext.Provider value={{
        isModalOpen,
        setIsModalOpen
      }} >
        {children}
      </MenuContext.Provider>
    </div>
  )
}

export default MenuContextProvider
