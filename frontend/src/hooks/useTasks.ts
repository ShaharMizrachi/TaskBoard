// src/hooks/useTasks.ts
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import api from "../services/api";

const fetchTasks = async (page: number, limit: number, search: string, priorityFilter: string | null) => {
  const params = {
    page,
    limit,
    title: search || undefined,
    priority: priorityFilter || undefined,
  };

  const response = await api.get("/tasks", { params });
  return response.data;
};

const useTasks = () => {
  // Get the pagination, search, and filter state from Redux
  const { page, limit, search, priorityFilter } = useSelector((state: RootState) => state.tasks);

  // Use React Query to fetch tasks based on the current state
  return useQuery(["tasks", page, limit, search, priorityFilter], () => fetchTasks(page, limit, search, priorityFilter), {
    keepPreviousData: true,
  });
};

export default useTasks;
