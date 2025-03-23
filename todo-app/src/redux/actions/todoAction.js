import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTodos = createAsyncThunk(
  "Fetch Todod",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todosI"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get todos."
      );
    }
  }
);

export default fetchTodos;
