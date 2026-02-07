import type { timer } from "@/types";

export default function TimerReducer(timer: timer, action: any) {

  switch (action.type) {

    case "play_timer": {
      return {
        ...timer,
        timer_status: "playing"
      }
    }

  }

}
