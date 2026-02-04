import { Outlet } from "react-router-dom"
import Header from "./Header"
import MenuContextProvider from "@/provider/MenuContextProvider"


function Layout() {
  return (
    <>
      <MenuContextProvider>
        <div className="min-h-screen flex flex-col">

          {/* Header */}
          <Header status="FOCUSING" />
          <Outlet />
        </div>
      </MenuContextProvider>
    </>
  )
}

export default Layout
