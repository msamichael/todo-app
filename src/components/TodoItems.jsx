import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({ todoName, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex items-center flex-1 cursor-pointer"
      >
        <img className="w-7" src={isComplete ? tick : not_tick} alt="" />
        <p className= {`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete && "line-through" }`}>{todoName}</p>
      </div>

      <img
        className="w-3.5 cursor-pointer"
        src={delete_icon}
        alt=""
        onClick={() => {
          deleteTodo(id);
        }}
      />
    </div>
  );
};

export default TodoItems;
