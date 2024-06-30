import React from 'react';

import { List } from "antd";

import TaskButton from "./TaskButton";
import { Task } from "../api/types/task";
import TaskStatus from "./TaskStatus";


/**
 * This interface provides props for `TaskList` class
 */
interface TaskListProps {
    tasks: Task[];
    onSelectTask: (taskId: number) => void;
}

/**
 * This component provides list of `TaskButton` components
 */
const TaskList: React.FC<TaskListProps> = ({tasks, onSelectTask}) => (
    <List
        header={<div>Subtasks</div>}
        style={{marginTop: 50}}
        bordered
        dataSource={tasks}
        renderItem={task => (
            <List.Item>
                <TaskButton key={task.id} task={task} callback={onSelectTask}/>
                <TaskStatus status={task.status} />
            </List.Item>
        )}
    />

)


export default TaskList;
