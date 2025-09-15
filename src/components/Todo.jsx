import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
import todoPreloader from "../constant";


const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos")?
  JSON.parse(localStorage.getItem("todos")):[...todoPreloader

  ]);

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodoItem = {
      id: Date.now(),
      name: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodoItem]);

    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => {
      return prev.filter((todoItem) => todoItem.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prev) => {
      return prev.map((todoItem) => {
        if (todoItem.id === id) {
          return { ...todoItem, isComplete: !todoItem.isComplete };
        }
        return todoItem;
      });
    });
  };

  useEffect(()=>{
    
    localStorage.setItem("todos", JSON.stringify(todoList));
    
  },[todoList])


  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* -------- title -------- */}

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* -------- input box -------- */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full ">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
          ref={inputRef}
        />
        <button
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg cursor-pointer"
          onClick={add}
        >
          ADD +
        </button>
      </div>

      {/* -------- todo list -------- */}

      <div>
        <ul>
          {todoList.map((todoItem, index) => {
            return (
              <li key={index}>
                <TodoItems
                  todoName={todoItem.name}
                  id={todoItem.id}
                  isComplete={todoItem.isComplete}
                  deleteTodo={deleteTodo}
                  toggle={toggle}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
