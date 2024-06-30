import React from 'react';
import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { Task } from "../api/types/task";
import TaskStatus from "./TaskStatus";

interface TaskTreeProps {
    tasks: Task[];
    onTaskSelect: (taskId: number) => void;
}

/**
 * This Component provides `Task` hierarchical tree
 * @param tasks List of `Task` instances
 * @param onTaskSelect Callback
 * @constructor
 */
const TaskTree: React.FC<TaskTreeProps> = ({ tasks, onTaskSelect }) => {
    const convertTasksToTreeData = (tasks: Task[]): DataNode[] => {
        return tasks.map(task => ({
            key: task.id,
            title: <p><b>{task.name}</b> <TaskStatus status={task.status}/></p>,
            children: task.children ? convertTasksToTreeData(task.children) : [],
        }));
    };

    const treeData = convertTasksToTreeData(tasks);

    const handleSelect = (selectedKeys: React.Key[]) => {
        const selectedTaskId = selectedKeys[0] as number;
        onTaskSelect(selectedTaskId);
    };

    return (
        <Tree
            treeData={treeData}
            showLine={true}
            style={{"paddingTop": "20px"}}
            onSelect={handleSelect}
        />
    );
};

export default TaskTree;