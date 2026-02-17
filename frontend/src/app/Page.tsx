
'use client';

import { useContext, useEffect, useReducer, useState } from 'react';
import Timer from '@/components/Timer';
import { Todos, type Todo } from '@/components/Todos';
import { EditModal } from '@/components/EditModal';

import { type timer, type todo } from '@/types';
import DefaultTimerContext from '@/context/DefaultTimerContext';
import { toast } from 'sonner';


export default function Home() {


  const { defaultTimer, setDefaultTimer } = useContext(DefaultTimerContext);

  const [sessionTodo, setSessionTodo] = useState<todo[]>([]);


  const handleSaveChanges = (newMinutes: number, newSeconds: number, updatedTodos: todo[]) => {

    setDefaultTimer({
      minutes: newMinutes,
      seconds: newSeconds,
      todos: updatedTodos,
    })
    console.log("The default timer context state has been updated successfully!");
    console.log(`The new data was minutes: ${newMinutes} , seconds: ${newSeconds} and updatedsTodos: ${updatedTodos}`);

    toast.success("New timer information was saved successfully!", { position: "top-right" });
  };

  useEffect(() => {

    setSessionTodo(defaultTimer.todos);

  }, [defaultTimer])


  const handleDeleteTodo = (id: string) => {

    setSessionTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  }

  const onToggleTask = (id: string) => {
    setSessionTodo(
      (prevTodo) => prevTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  }


  const onAddTask = (newTaskTitle: string, setNewTaskTitle: (newTaskTitle: string) => void) => {

    setSessionTodo(prevTodos => {
      return [
        ...prevTodos,
        {
          id: crypto.randomUUID(),
          description: newTaskTitle,
          completed: false,
        }
      ]
    });

    if (newTaskTitle.trim()) {
      setNewTaskTitle("");
    }

  }

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center gap-16 px-4 py-16">
        <Timer
          timer={{
            minutes: defaultTimer.minutes,
            seconds: defaultTimer.seconds
          }}
        />

        {/* Todos Section */}
        <Todos
          sessionTodo={sessionTodo}
          handleDeleteTodo={handleDeleteTodo}
          onToggleTask={onToggleTask}
          onAddTask={onAddTask}
        />
        {/* Edit Modal */}
        <EditModal
          minutes={defaultTimer.minutes}
          seconds={defaultTimer.seconds}
          todos={defaultTimer.todos}
          onSaveChanges={handleSaveChanges}
        />
      </main>
    </>
  );
}
