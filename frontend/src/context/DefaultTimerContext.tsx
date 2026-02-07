import type { defaultTimer, todo } from "@/types";
import { createContext } from "react";

interface contexttype {
  defaultTimer: defaultTimer,
  setDefaultTimer: any
}


const DefaultTimerContext = createContext<contexttype>({
  defaultTimer: {
    minutes: 0,
    seconds: 15,
    todos: []
  },
  setDefaultTimer: () => { }
});

export default DefaultTimerContext;
