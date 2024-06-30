export interface Task {
    id: number
    name: string
    description: string
    status: string
    planned_effort: number
    actual_effort?: number
    children_planned_effort: number
    children_actual_effort: number
    performer: string
    parent?: number
    children: Task[]
}