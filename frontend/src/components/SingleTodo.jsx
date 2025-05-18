import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/slices/taskSlice";
import { Trash2 } from "lucide-react";

const ITEM_TYPE = "TODO";

const SingleTodo = ({ todo }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: todo._id, status: todo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = () => {
    dispatch(deleteTask(todo._id));
  };

  return (
    <li
      ref={drag}
      className={`bg-[#23272f] border border-[#2d3748] rounded-xl shadow-md px-4 py-3 flex items-center justify-between cursor-move transition-all ${
        isDragging ? "opacity-50 scale-95" : "hover:scale-105"
      }`}
    >
      <div>
        <span className="text-white font-semibold">{todo.title}</span>
        {todo.description && (
          <div className="text-gray-400 text-sm mt-1">{todo.description}</div>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="ml-3 p-1 rounded hover:bg-red-100 transition-colors"
        title="Delete"
      >
        <Trash2 size={20} className="text-red-500" />
      </button>
    </li>
  );
};

export default SingleTodo;
