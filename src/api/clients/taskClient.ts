import { Task } from '../types/task';
import { apiClient } from './apiClient';

const BASE_URL = 'http://127.0.0.1:8000/api/todolist';

export const taskClient = {
    async getTasks(): Promise<Task[]> {
        return apiClient<Task[]>(`${BASE_URL}/`, {
            method: 'GET',
        });
    },
    async getTask(id: number): Promise<Task> {
        return apiClient<Task>(`${BASE_URL}/hierarchy/${id}/`, {
            method: 'GET',
        });
    },
    async getTaskHierarchy(): Promise<Task[]> {
        return apiClient<Task[]>(`${BASE_URL}/hierarchy/`, {
            method: 'GET',
        });
    },
    async createTask(task: Omit<Task, 'id' | 'children'>): Promise<Task> {
        return apiClient<Task>(`${BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    },
    async updateTask(id: number, task: Partial<Task>): Promise<Task> {
        return apiClient<Task>(`${BASE_URL}/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    },
    async patchTask(id: number, task: Partial<Task>): Promise<Task> {
        return apiClient<Task>(`${BASE_URL}/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    },
    async deleteTask(id: number): Promise<void> {
        await apiClient<void>(`${BASE_URL}/${id}/`, {
            method: 'DELETE',
        });
    },
};