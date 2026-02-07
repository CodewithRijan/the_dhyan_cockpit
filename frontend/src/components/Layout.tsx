import { Outlet } from "react-router-dom"
import Header from "./Header"
import MenuContextProvider from "@/provider/MenuContextProvider"
import DefaultTimerProvider from "@/provider/DefaultTimerProvider"
import { Toaster } from "sonner"


function Layout() {
  return (
    <>
      <MenuContextProvider>
        <DefaultTimerProvider>
          <div className="min-h-screen flex flex-col">

            {/* Header */}
            <Header status="FOCUSING" />
            <Outlet />
            <Toaster />
          </div>
        </DefaultTimerProvider>
      </MenuContextProvider>
    </>
  )
}

export default Layout
