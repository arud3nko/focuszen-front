import { Task } from '../types/task';
import { taskClient } from '../clients/taskClient';
import {MessagesHandler} from "../../utils/MessagesHandler";

export class TaskService {
    messagesHandler: MessagesHandler

    constructor(messagesHandler: MessagesHandler) {
        this.messagesHandler = messagesHandler
    }

    updateTasksHierarchy = async (pre: Task[]): Promise<Task[]> => {
        try {
            return await taskClient.getTaskHierarchy();
        } catch (error: any) {
            this.messagesHandler.error(error.message)
            return pre
        }
    }

    updateTaskStatus = async (id: number, status: string): Promise<Task | null> => {
        try {
            return await taskClient.patchTask(id, {"status": status})
        } catch (error: any) {
            this.messagesHandler.error(error.message)
            return null
        }
    }

    getTask = async (id: number): Promise<Task | null> => {
        try {
            return await taskClient.getTask(id);
        } catch (error: any) {
            this.messagesHandler.error(error.message)
            return null
        }
    }
    createTask = async (task: Omit<Task, 'id' | 'children'>): Promise<Task | null> => {
        try {
            return await taskClient.createTask(task);
        } catch (error: any) {
            this.messagesHandler.error(error.message)
            return null;
        }
    }
    updateTask = async (id: number, task: Task): Promise<Task | null> => {
        try {
            const _ = await taskClient.updateTask(id, task);
            this.messagesHandler.success()
            return _
        } catch (error: any) {
            this.messagesHandler.error(error.message)
            return null;
        }
    }
    deleteTask = async (id: number): Promise<boolean> => {
        try {
            await taskClient.deleteTask(id);
            this.messagesHandler.success()
            return true;
        } catch (error: any) {
            this.messagesHandler.error(error.message)
            return false
        }
    }
}
