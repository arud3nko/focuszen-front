import React from 'react';

import { Descriptions } from 'antd';
import {Task} from "../api/types/task";
import TaskStatus from "./TaskStatus";

interface TaskDetailsProp {
    task: Task
}

/**
 * This component provides detailed info about single task
 */
const TaskDetails: React.FC<TaskDetailsProp> = ({task}) => (
    <>
    <Descriptions labelStyle={{fontWeight: "bold"}} title={task.name + " #" + task.id} bordered>
        <Descriptions.Item style={{maxWidth: 200}} label="Description">{task.description}</Descriptions.Item>
        <Descriptions.Item label="Status"><TaskStatus status={task.status} /></Descriptions.Item>
        <Descriptions.Item label="Performer">{task.performer}</Descriptions.Item>
        <Descriptions.Item label="Planned effort">{task.planned_effort}</Descriptions.Item>
        <Descriptions.Item label="Actual effort">{task.actual_effort ? task.actual_effort : "Not stated"}</Descriptions.Item>
    </Descriptions>
    <Descriptions style={{marginTop: 20}} labelStyle={{fontWeight: "bold"}} title="Counted values" bordered>
        <Descriptions.Item label="Subtasks Planned effort">{task.children_planned_effort}</Descriptions.Item>
        <Descriptions.Item label="Subtasks Actual effort">{task.children_actual_effort}</Descriptions.Item>
    </Descriptions>
    </>
)

export default TaskDetails;
