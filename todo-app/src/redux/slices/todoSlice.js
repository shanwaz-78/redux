import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "../actions/todoActions";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    isError: false,
    todos: [],
    localTodos: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.localTodos.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
      });
    },
    editItem: (state, action) => {
      const { id, title } = action.payload;
      const todoToEdit =
        state.todos.find((todo) => todo.id === id) ||
        state.localTodos.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.title = title;
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
      state.localTodos = state.localTodos.filter((todo) => todo.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addItem, editItem, deleteItem } = todoSlice.actions;
export default todoSlice.reducer;
