import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const TaskForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Personal');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({ title, category, priority, dueDate });
        setTitle('');
        setCategory('Personal');
        setPriority('Medium');
        setDueDate('');
    };

    const inputClasses = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 transform transition-all hover:shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3 text-sm">NEW</span>
                Add Task
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                <div className="md:col-span-12 lg:col-span-5">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputClasses}
                        required
                    />
                </div>
                <div className="md:col-span-4 lg:col-span-2">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                        <option value="Study">Study</option>
                    </select>
                </div>
                <div className="md:col-span-4 lg:col-span-2">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="md:col-span-4 lg:col-span-3">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className={inputClasses}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <FaPlus /> Create Task
            </button>
        </form>
    );
};

export default TaskForm;
