import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { Task } from "../../api/types/task";
import { Statuses } from "../../api/types/statuses";

interface ModalFormProps {
    open: boolean;
    onCancel: () => void;
    tasks: Task[];
    submitCallback: (values: any) => void;
    task?: Task | null;
}

const TaskForm: React.FC<ModalFormProps> = ({ open, onCancel, tasks, submitCallback, task }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (task) {
                const parentTaskId = task.parent ? task.parent : null;
                form.setFieldsValue({
                    name: task.name,
                    description: task.description,
                    performer: task.performer,
                    planned_effort: task.planned_effort,
                    actual_effort: task.actual_effort,
                    status: task.status,
                    parent: parentTaskId
                });
            } else {
                form.resetFields();
            }
        }
    }, [form, task, open]);

    const onOk = () => {
        form.submit();
    };

    return (
        <Modal title={task ? "Edit Task" : "Add a new task"} open={open} onOk={onOk} onCancel={onCancel}>
            <Form form={form} layout="vertical" name="taskForm" onFinish={submitCallback}>
                <Form.Item name="name" label="Task name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="status" label="Status">
                    <Select
                        style={{textTransform: "capitalize"}}
                        disabled={!task}
                        defaultValue={Statuses.ASSIGNED}
                        options={Object.keys(Statuses).map((key) => ({
                            label: Statuses[key as keyof typeof Statuses],
                            value: Statuses[key as keyof typeof Statuses],
                        }))} />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input />
                </Form.Item>
                <Form.Item name="performer" label="Performer" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="planned_effort" label="Planned effort" rules={[{ required: true }, { type: "number", min: 0 }]}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="actual_effort" label="Actual effort" rules={[{ type: "number", min: 0 }]}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="parent" label="Parent task">
                    <Select
                        showSearch
                        placeholder="Select a parent task"
                        optionFilterProp="label"
                        allowClear
                        defaultValue={null}
                        options={tasks.map((task) => ({
                            label: task.name,
                            value: task.id
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskForm;
