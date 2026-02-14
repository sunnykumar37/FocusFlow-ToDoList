import React from 'react';
import { FaTrash, FaCheckCircle, FaUndo, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import clsx from 'clsx';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
    const priorityStyles = {
        High: {
            badge: 'bg-red-100 text-red-700',
            border: 'border-red-500',
            shadow: 'shadow-red-50'
        },
        Medium: {
            badge: 'bg-orange-100 text-orange-700',
            border: 'border-orange-500',
            shadow: 'shadow-orange-50'
        },
        Low: {
            badge: 'bg-green-100 text-green-700',
            border: 'border-green-500',
            shadow: 'shadow-green-50'
        },
    };

    const style = priorityStyles[task.priority] || priorityStyles.Medium;

    return (
        <div className={clsx(
            "group flex flex-col sm:flex-row sm:items-center justify-between p-5 mb-4 bg-white rounded-xl shadow-sm border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            task.completed ? "border-gray-300 bg-gray-50 opacity-75" : style.border,
            !task.completed && style.shadow
        )}>
            <div className="flex-1 mb-3 sm:mb-0">
                <div className="flex items-center gap-2 mb-2">
                    <span className={clsx(
                        "text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide",
                        style.badge
                    )}>
                        {task.priority || 'Medium'}
                    </span>
                    <span className="text-xs text-gray-500 px-2.5 py-1 bg-gray-100 rounded-full font-medium">
                        {task.category || 'General'}
                    </span>
                </div>
                <h3 className={clsx(
                    "text-lg font-semibold text-gray-800 mb-1 transition-colors",
                    task.completed && "line-through text-gray-400"
                )}>
                    {task.title}
                </h3>
                {task.dueDate && (
                    <div className="flex items-center text-sm text-gray-400 font-medium">
                        <FaCalendarAlt className="mr-1.5" />
                        {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 justify-end">
                <button
                    onClick={() => onToggleComplete(task._id, !task.completed)}
                    className={clsx(
                        "p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                        task.completed
                            ? "text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400"
                            : "text-green-500 hover:bg-green-50 focus:ring-green-400"
                    )}
                    title={task.completed ? "Mark Incomplete" : "Mark Complete"}
                >
                    {task.completed ? <FaUndo size={18} /> : <FaCheckCircle size={20} />}
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="p-3 text-red-400 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
                    title="Delete Task"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
