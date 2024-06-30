import React from 'react';

import { Button, Popover } from 'antd';

import {Task} from "../api/types/task";
import TaskStatus from "./TaskStatus";

interface TaskButtonProps {
    task: Task;
    callback: (taskId: number) => any
}



/**
 * This component provides info about single task
 */
const TaskButton: React.FC<TaskButtonProps> = ({task, callback}) => {
    const details = (
        <div>
            <p><b>Performer:</b> {task.performer}</p>
            <p><b>Status:</b> <TaskStatus status={task.status} /></p>
        </div>
    )

    return (
        <Popover content={details}>
            <Button onClick={() => callback(task.id)} type={"default"}>{task.name} </Button>
        </Popover>
    )
}

export default TaskButton;
