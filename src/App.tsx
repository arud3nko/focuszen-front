import React, { useEffect, useState } from 'react';
import { Button, Layout, message } from "antd";

import 'antd/dist/reset.css';

import TaskList from "./components/TaskList";
import { Task } from "./api/types/task";
import TaskTree from "./components/TaskTree";
import TaskDetails from "./components/TaskDetails";
import { TaskService } from "./api/services/taskService";
import TaskForm from "./components/forms/TaskForm";
import TaskControls from "./components/TaskControls";
import { MessagesHandler } from "./utils/MessagesHandler";

const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [tasksHierarchy, setTasksHierarchy] = useState<Task[]>([]);
    const [openTaskModalForm, setOpenTaskModalForm] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const messagesHandler = new MessagesHandler(messageApi);
    const taskService = new TaskService(messagesHandler);

    useEffect(() => {
        updateTasksHierarchy().then((tasks) => setTasksHierarchy(tasks || []));
    }, []);

    async function updateTasksHierarchy() {
        return await taskService.updateTasksHierarchy(tasksHierarchy);
    }

    async function updateSelectedTask(taskId: number) {
        if (!taskId) {
            return null
        }
        const task = await taskService.getTask(taskId);
        setSelectedTask(task);
    }

    const hideTaskModal = () => {
        setOpenTaskModalForm(false);
        setEditingTask(null);
    };

    const showTaskModal = (task?: Task) => {
        setEditingTask(task || null);
        setOpenTaskModalForm(true);
    };

    const updateTaskStatus = async (taskId: number, status: string) => {
        await taskService.updateTaskStatus(taskId, status)
        await updateSelectedTask(taskId)
        updateTasksHierarchy().then((tasks) => setTasksHierarchy(tasks || []));
    }

    const deleteTask = async (taskId: number) => {
        const deleted: boolean = await taskService.deleteTask(taskId)
        if (deleted) {
            updateTasksHierarchy().then((tasks) => setTasksHierarchy(tasks || []));
            setSelectedTask(null)
        }
    }

    const postTask = async (values: any) => {
        if (editingTask) {
            await taskService.updateTask(editingTask.id, values);
            await updateSelectedTask(editingTask.id)
        } else {
            await taskService.createTask(values);
        }
        hideTaskModal();
        updateTasksHierarchy().then((tasks) => setTasksHierarchy(tasks || []));
    };

    const flattenTasks = (tasks: Task[]): Task[] => {
        return tasks.reduce<Task[]>((acc, task) => {
            acc.push(task);
            if (task.children && task.children.length > 0) {
                acc = acc.concat(flattenTasks(task.children));
            }
            return acc;
        }, []);
    };

    return (
        <Layout style={{ height: '100vh' }}>
            {contextHolder}
            <Sider
                width={450}
                theme="light"
                style={{ overflow: 'auto', height: '100%', position: "fixed", borderRight: "solid" }}
            >
                {tasksHierarchy.length > 0 ? (
                    <TaskTree tasks={tasksHierarchy} onTaskSelect={(taskId) => updateSelectedTask(taskId)} />
                ) : (
                    <div>Loading tasks...</div>
                )}
            </Sider>
            <Layout style={{ marginLeft: 450 }}>
                <Header style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <h1 style={{ marginTop: "10px" }}>Tasks Manager</h1>
                    </div>
                    <Button type="primary" onClick={() => showTaskModal()}>New Task</Button>
                </Header>
                <Content style={{ padding: '20px' }}>
                    {selectedTask ? (
                        <>
                            <TaskDetails task={selectedTask} />
                            <TaskControls
                                task={selectedTask}
                                updateCallback={() => showTaskModal(selectedTask)}
                                updateStatusCallback={(taskId, status) => updateTaskStatus(taskId, status)}
                                deleteCallback={(taskId) => deleteTask(taskId)}
                            />
                            <TaskList tasks={flattenTasks(selectedTask.children)} onSelectTask={(taskId) => updateSelectedTask(taskId)} />
                        </>
                    ) : (
                        <div>No tasks to display</div>
                    )}
                </Content>
                <Footer>
                    <TaskForm
                        open={openTaskModalForm}
                        onCancel={hideTaskModal}
                        tasks={flattenTasks(tasksHierarchy)}
                        submitCallback={postTask}
                        task={editingTask}
                    />
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App;
