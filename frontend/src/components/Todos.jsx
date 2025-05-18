import React from "react";
import SingleTodo from "./SingleTodo";
import { useDrop } from "react-dnd";

const ITEM_TYPE = "TODO";

const Todos = ({ todos, updateTodoStatus, columnLabel, columnStatus }) => {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => {
      if (item.status !== columnStatus) {
        updateTodoStatus(item.id, columnStatus);
      }
    },
  });

  return (
    <div
      ref={drop}
      className="rounded-xl min-h-[300px] flex flex-col gap-2 transition-all"
    >
      <ul className="list-none min-h-[40px] flex flex-col gap-2">
        {todos.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No tasks.</div>
        ) : (
          todos.map((todo) => <SingleTodo key={todo._id} todo={todo} />)
        )}
      </ul>
    </div>
  );
};

export default Todos;
