import {queryOptions} from "@tanstack/react-query";
import axios from "axios";
import type Task from "./Task.ts";

function fetchTasks(): Promise<Task[]> {
    return axios.get("http://localhost:8081/task").then((response) => {
        return response.data;
    });
}

export const tasksListOptions = queryOptions({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
})