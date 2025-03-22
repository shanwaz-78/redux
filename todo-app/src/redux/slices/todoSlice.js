import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodo = createAsyncThunk("Fetch Todos", async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos`
  );
  return response.data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    isError: false,
    data: [], 
    localData: [], 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, _) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload; 
    });
    builder.addCase(fetchTodo.rejected, (state, _) => {
      state.isLoading = false;
      state.isError = true;
      state.data = [];
    });
  },
  reducers: {
    addItem: (state, action) => {
      const newTodo = {
        id: Date.now(), 
        title: action.payload, 
        completed: false, 
      };
      state.localData.push(newTodo); 
    },
  
    editItem: (state, action) => {
      const { id, title } = action.payload;
      const todoToEdit =
        state.data.find((todo) => todo.id === id) ||
        state.localData.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.title = title;
      }
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter((todo) => todo.id !== id);
      state.localData = state.localData.filter((todo) => todo.id !== id);
    },
  },
});

export const { addItem, editItem, deleteItem } = todoSlice.actions;

export default todoSlice.reducer;