// src/redux/taskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
}

interface TaskState {
  items: Task[];
  loading: boolean;
  error: string | null;
  search: string;
  priorityFilter: string | null;
  page: number;
  limit: number;
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
  search: "",
  priorityFilter: null,
  page: 1,
  limit: 10, // Default items per page
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setPriorityFilter(state, action: PayloadAction<string | null>) {
      state.priorityFilter = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { setTasks, setLoading, setError, setSearch, setPriorityFilter, setPage, setLimit } = taskSlice.actions;

export default taskSlice.reducer;
