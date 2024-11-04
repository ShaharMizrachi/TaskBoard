// src/hooks/useTasks.ts
import { useQuery } from "react-query";
import api from "../services/api";

const fetchTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

const useTasks = () => {
  return useQuery("tasks", fetchTasks);
};

export default useTasks;
