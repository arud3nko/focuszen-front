import React from "react";

import {Statuses} from "../api/types/statuses";

interface TaskStatusProps {
    status: string
}

const TaskStatus: React.FC<TaskStatusProps> = ({ status }) => {
    const statusColors: Record<Statuses, string> = {
        [Statuses.ASSIGNED]: "#2DCCFF",
        [Statuses.RUNNING]: "#FFB302",
        [Statuses.SUSPENDED]: "#FF3838",
        [Statuses.COMPLETED]: "#56F000"
    };

    const backgroundColor = statusColors[status as Statuses] || "#000000";

    const statusStyle = {
        backgroundColor,
        color: "#ffffff",
        padding: "2px 6px",
        marginLeft: "20px",
        borderRadius: "6px",
        display: "inline-block",
        textTransform: "capitalize",
    } as React.CSSProperties;

    return (
        <span style={statusStyle}>
            {status}
        </span>
    );
}

export default TaskStatus;