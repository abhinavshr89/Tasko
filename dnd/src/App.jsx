import React, { useState } from "react";
import Todos from "./Todos";

const App = () => {
  const [todos, setTodos] = useState([]);

  const AddTodo = (e) => {
    e.preventDefault();
    const todo = e.target[0].value;
    const todoObject = {
      id: Date.now(),
      content: todo,
      status: "active",
    };
    if (todo) {
      setTodos((prev) => [...prev, todoObject]);
      e.target[0].value = "";
    }
  };

  const updateTodoStatus = (id, status) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  return (
    <div className="flex flex-col items-center h-screen p-2">
      <form
        className="w-[40%] flex justify-center items-center"
        onSubmit={AddTodo}
      >
        <input
          type="text"
          placeholder="Add a todo"
          className="border border-black p-3 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 ml-2"
        >
          Add
        </button>
      </form>
      <div className="w-[40%] mt-4">
        <Todos todos={todos} updateTodoStatus={updateTodoStatus} />
      </div>
    </div>
  );
};

export default App;
