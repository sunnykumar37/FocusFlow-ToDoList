import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>No tasks yet. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
