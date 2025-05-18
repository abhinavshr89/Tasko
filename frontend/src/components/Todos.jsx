import React from "react";
import SingleTodo from "./SingleTodo";
import { useDrop } from "react-dnd";

const ITEM_TYPE = "TODO";

const Todos = ({ todos, updateTodoStatus }) => {
  const activeTodos = todos.filter((todo) => todo.status === "active");
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  const [, dropActive] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => {
      if (item.status !== "active") {
        updateTodoStatus(item.id, "active");
      }
    },
  });

  const [, dropCompleted] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => {
      if (item.status !== "completed") {
        updateTodoStatus(item.id, "completed");
      }
    },
  });

  return (
    <div className="bg-white rounded shadow p-4 flex justify-between gap-2">
      <div className="flex-1 p-2" ref={dropActive}>
        <h2 className="font-bold mb-2">Active Tasks</h2>
        <ul className="list-none min-h-[40px]">
          {activeTodos.length === 0 ? (
            <div className="text-gray-500 text-center">No active todos.</div>
          ) : (
            activeTodos.map((todo) => <SingleTodo key={todo.id} todo={todo} />)
          )}
        </ul>
      </div>
      <div className="flex-1 p-2" ref={dropCompleted}>
        <h2 className="font-bold mb-2">Completed Tasks</h2>
        <ul className="list-none min-h-[40px]">
          {completedTodos.length === 0 ? (
            <div className="text-gray-500 text-center">No completed todos.</div>
          ) : (
            completedTodos.map((todo) => <SingleTodo key={todo.id} todo={todo} />)
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
