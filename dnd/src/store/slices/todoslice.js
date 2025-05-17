import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodoStatus: (state, action) => {
      const { id, status } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.status = status;
      }
    },
  },
});
