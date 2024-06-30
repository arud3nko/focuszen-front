import React from 'react';

import {Button, Popconfirm, Space} from 'antd';

import {Task} from "../api/types/task";

interface TaskControlsProps {
    task:                   Task;
    updateCallback:         (taskId: number) => any;
    updateStatusCallback:   (taskId: number, status: string) => any;
    deleteCallback:         (taskId: number) => any;
}

const TaskControlsStyles = {
    marginTop: 20,
} as React.CSSProperties

const TaskControls: React.FC<TaskControlsProps> = ({task, updateCallback, updateStatusCallback, deleteCallback}) => {
    return (
        <Space style={TaskControlsStyles}>
            <Button type={"default"} onClick={() => updateCallback(task.id)}>Edit</Button>
            <Button block type={"primary"} onClick={() => updateStatusCallback(task.id, "completed")}>Complete</Button>
            <Popconfirm
                title="Delete the task"
                description="Are you sure want to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteCallback(task.id)}>
                <Button danger>Delete</Button>
            </Popconfirm>
        </Space>
    );
};

export default TaskControls;
