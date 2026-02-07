import DefaultTimerContext from "@/context/DefaultTimerContext"
import type { defaultTimer } from "@/types"
import { useState } from "react"

function DefaultTimerProvider({ children }: { children: any }) {

  const [defaultTimer, setDefaultTimer] = useState<defaultTimer>({
    minutes: 0,
    seconds: 15,
    todos: [
      {
        id: "1",
        description: "Design dashboard system architecture",
        completed: false
      },
      {

        id: "2",
        description: "Do your gorydamn work",
        completed: false
      }
    ]
  });

  return (
    <>
      <DefaultTimerContext.Provider value={{
        defaultTimer,
        setDefaultTimer
      }}>
        {children}
      </DefaultTimerContext.Provider>
    </>
  )
}

export default DefaultTimerProvider
