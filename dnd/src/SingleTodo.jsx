import React from 'react'
import { useDrag } from 'react-dnd'

const ITEM_TYPE = "TODO";

const SingleTodo = ({ todo }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: todo.id, status: todo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={drag}
      className={`border-b last:border-b-0 py-2 px-2 hover:bg-gray-100 transition-colors cursor-move ${isDragging ? "opacity-50" : ""}`}
    >
      <span className="text-gray-800">{todo.content}</span>
    </li>
  )
}

export default SingleTodo