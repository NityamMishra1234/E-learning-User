import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleComplete, deleteTodo } from '../../features/todoSlice';
import { motion, AnimatePresence } from 'framer-motion';
import './Todo.css';

function Todo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const handleAddTodo = () => {
    if (title && targetDate) {
      dispatch(addTodo({ title, description, targetDate }));
      setTitle('');
      setDescription('');
      setTargetDate('');
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">Task Manager</h1>

      <div className="todo-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddTodo} className="add-btn">Add Task</button>
      </div>

    
      <div className="todo-list">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`todo-card ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-content">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p className="date-info">Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
                <p className="date-info">Target: {new Date(todo.targetDate).toLocaleDateString()}</p>
              </div>

              
              <div className="progress-bar">
                <div className={`progress ${todo.completed ? 'full' : ''}`}></div>
              </div>

             
              <div className="todo-actions">
                <button onClick={() => dispatch(toggleComplete(todo.id))} className="complete-btn">
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => dispatch(deleteTodo(todo.id))} className="delete-btn">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Todo;
