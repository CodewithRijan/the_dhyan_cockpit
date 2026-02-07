'use client';

import React, { useContext, useEffect, useInsertionEffect } from "react"

import { X, Plus, Menu, Trash } from 'lucide-react';
import { useState } from 'react';
import MenuContext from "@/context/MenuContext";
import type { todo } from "@/types";


interface EditModalProps {
  minutes: number;
  seconds: number;
  todos: todo[];
  onSaveChanges: (minutes: number, seconds: number, todos: todo[], newTaskTitle?: string) => void;
}

export function EditModal({
  minutes,
  seconds,
  todos,
  onSaveChanges,
}: EditModalProps) {
  const [editMinutes, setEditMinutes] = useState(minutes);
  const [editSeconds, setEditSeconds] = useState(seconds);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [localTodos, setLocalTodos] = useState<todo[]>(todos);

  const context = useContext(MenuContext);


  if (!context?.isModalOpen) return null;

  const onClose = () => {
    context?.setIsModalOpen(false);
  }

  const handleSave = () => {
    onSaveChanges(editMinutes, editSeconds, localTodos);
    setNewTaskTitle('');
    onClose();
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(99, Math.max(0, parseInt(e.target.value) || 0));
    setEditMinutes(value);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
    setEditSeconds(value);
  };

  const handleAddTask = () => {

    setLocalTodos(prevTodos => {
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
      setNewTaskTitle('');
    }
  }


  const handleDeleteTodo = (id: string) => {
    setLocalTodos(prevTodo => prevTodo.filter((todo) => todo.id !== id));
  }


  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <div
      className="font-mono fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-lg w-full max-w-md p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-foreground">Edit Timer & Tasks</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Duration Section */}
        <div className="mb-6">
          <label className="block text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">
            Duration
          </label>
          <div className="bg-secondary bg-opacity-30 border border-border rounded-lg p-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="99"
                value={editMinutes}
                onChange={handleMinutesChange}
                className="w-16 bg-transparent text-3xl font-light text-foreground text-center outline-none"
              />
              <span className="text-3xl font-light text-foreground">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={editSeconds}
                onChange={handleSecondsChange}
                className="w-16 bg-transparent text-3xl font-light text-foreground text-center outline-none"
              />
            </div>
          </div>
        </div>

        {/* Todo List Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Todo List
            </label>
            <span className="text-xs text-muted-foreground">{todos.length} items</span>
          </div>
          <div className="space-y-2">
            {localTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-secondary bg-opacity-30 border border-border rounded px-4 py-3 flex items-center gap-3 justify-between"
              >
                <span className="text-sm text-foreground">{todo.description}</span>

                <button className='cursor-pointer' onClick={() => handleDeleteTodo(todo.id)}>
                  <Trash color='red' />
                </button>
              </div>
            ))}

            {/* Add New Task Input */}
            <div className="bg-secondary bg-opacity-30 border border-border rounded px-4 py-3 flex items-center gap-3">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTask();
                  }
                }}
                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
              />
              {newTaskTitle.trim() && (
                <button
                  onClick={handleAddTask}
                  className="text-accent hover:text-orange-600 transition-colors shrink-0"
                  aria-label="Add task"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-accent hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
          </svg>
          Save Changes
        </button>

        {/* Helper Text */}
        <p className="text-xs text-muted-foreground text-center mt-3">
          Changes will be applied immediately to your current session.
        </p>
      </div>
    </div>
  );
}

