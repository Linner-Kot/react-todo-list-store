import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const data: Todo[] = await response.json();
  return data;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const title = action.payload.trim();
      if (title === "") return;

      const newTask: Todo = {
        id: Date.now(),
        title: title,
        completed: false,
      };
      state.todos.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== taskId);
    },
    toggleCompletion: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const todo = state.todos.find((todo) => todo.id === taskId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
      }
    );
  },
});

export const { addTask, deleteTask, toggleCompletion } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;
