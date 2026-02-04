
'use client';

import { Plus } from 'lucide-react';

export interface Todo {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface TodosProps {
  todos: Todo[];
  onAddTask?: () => void;
  onToggleTask?: (id: string) => void;
}

export function Todos({ todos, onAddTask, onToggleTask }: TodosProps) {
  const remainingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="border border-border rounded-lg bg-card bg-opacity-60 backdrop-blur-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-foreground">Today's Tasks</h2>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {remainingCount} remaining
          </span>
        </div>

        {/* Todo Items */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 group hover:bg-secondary hover:bg-opacity-20 p-2 rounded transition-colors duration-200"
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggleTask?.(todo.id)}
                className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200"
                style={{
                  borderColor: todo.completed ? '#ff6b35' : '#4a4940',
                  backgroundColor: todo.completed ? '#ff6b35' : 'transparent',
                }}
                aria-label={`Toggle ${todo.title}`}
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
                    />
                  </svg>
                )}
              </button>

              {/* Task Title and Time */}
              <div className="flex-1 flex items-center justify-between min-w-0">
                <span
                  className={`text-sm transition-colors duration-200 ${todo.completed
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground'
                    }`}
                >
                  {todo.title}
                </span>
                <span className="text-sm text-muted-foreground flex-shrink-0 ml-3">
                  {todo.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 mt-6 text-muted-foreground hover:text-foreground transition-colors duration-200 pt-2 border-t border-border"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm">Add a new task...</span>
        </button>
      </div>
    </div>
  );
}

