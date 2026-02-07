
'use client';

import type { todo } from '@/types';
import { Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Todo {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface TodosProps {
  sessionTodo: todo[],
  handleDeleteTodo: (id: string) => void,
  onToggleTask: (id: string) => void,
  onAddTask: (newTaskTitle: string, setNewTaskTitle: (newTaskTitle: string) => void) => void
}

export function Todos({ sessionTodo, handleDeleteTodo, onToggleTask, onAddTask }: TodosProps) {


  const [remainingCount, setRemainingCount] = useState(0);


  const [newTaskTitle, setNewTaskTitle] = useState('');



  useEffect(() => {

    setRemainingCount(sessionTodo.filter((t) => !t.completed).length);

  }, [sessionTodo]);





  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="border border-border rounded-lg bg-card bg-opacity-60 backdrop-blur-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-foreground font-mono">Today's Tasks</h2>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
            {remainingCount} remaining
          </span>
        </div>

        {/* Todo Items */}
        <div className="space-y-3">
          {sessionTodo.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 group hover:bg-secondary hover:bg-opacity-20 p-2 rounded transition-colors duration-200"
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggleTask?.(todo.id)}
                className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200"
                style={{
                  borderColor: todo.completed ? '#ff6b35' : '#4a4940',
                  backgroundColor: todo.completed ? '#ff6b35' : 'transparent',
                }}
                aria-label={`Toggle ${todo.description}`}
              >
                {todo.completed && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    /> </svg>)}
              </button>

              {/* Task Title and Time */}
              <div className="font-mono flex-1 flex items-center justify-between min-w-0">
                <span
                  className={`text-sm transition-colors duration-200 ${todo.completed
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground'
                    }`}
                >
                  {todo.description}
                </span>
                <button className='cursor-pointer' onClick={() => handleDeleteTodo(todo.id)}>
                  <Trash color='red' />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <div className="bg-secondary bg-opacity-30 border border-border rounded px-4 py-3 flex items-center gap-3 mt-2">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddTask(newTaskTitle, setNewTaskTitle);
              }
            }}
            className="font-mono flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
          />
          {newTaskTitle.trim() && (
            <button
              onClick={() => onAddTask(newTaskTitle, setNewTaskTitle)}
              className="text-accent hover:text-orange-600 transition-colors shrink-0"
              aria-label="Add task"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

