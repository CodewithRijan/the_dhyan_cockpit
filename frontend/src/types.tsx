
export type timer_status = "not_started" | "playing" | "paused";


export interface timer {
  minutes: number;
  seconds: number;
  timer_status: timer_status
}

export interface session {
  id: string;
  time: string,
  todos: todo[]
}

export interface todo {
  id: string,
  description: string;
  completed: boolean;
}

export interface defaultTimer {
  minutes: number,
  seconds: number,
  todos: todo[]
}
