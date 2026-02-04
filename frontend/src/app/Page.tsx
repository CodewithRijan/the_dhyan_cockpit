
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import { Todos, type Todo } from '@/components/Todos';
import { EditModal } from '@/components/EditModal';

const MOCK_TODOS: Todo[] = [
  {
    id: '1',
    title: 'Design dashboard system architecture',
    time: '18:00',
    completed: false,
  },
  {
    id: '2',
    title: 'Review PR for background animations',
    time: '11:30',
    completed: false,
  },
  {
    id: '3',
    title: 'Coffee break & stretch',
    time: '08:45',
    completed: true,
  },
];

export default function Home() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestartClick = () => {
    setMinutes(25);
    setSeconds(0);
    setIsPlaying(false);
  };

  const handleToggleTask = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSaveChanges = (newMinutes: number, newSeconds: number, updatedTodos: Todo[], newTaskTitle?: string) => {
    setMinutes(newMinutes);
    setSeconds(newSeconds);
    setTodos(updatedTodos);

    if (newTaskTitle?.trim()) {
      const newTodo: Todo = {
        id: String(Date.now()),
        title: newTaskTitle,
        time: '00:00',
        completed: false,
      };
      setTodos((prev) => [...prev, newTodo]);
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-16 px-4 py-16">
        {/* Timer Section */}
        <Timer
          minutes={minutes}
          seconds={seconds}
          isPlaying={isPlaying}
          onPlayClick={handlePlayClick}
          onRestartClick={handleRestartClick}
        />

        {/* Todos Section */}
        <Todos
          todos={todos}
          onToggleTask={handleToggleTask}
        />
        {/* Edit Modal */}
        <EditModal
          minutes={minutes}
          seconds={seconds}
          todos={todos}
          onSaveChanges={handleSaveChanges}
        />
      </main>
    </>
  );
}
