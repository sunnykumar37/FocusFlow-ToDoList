import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ProgressBar from '../components/ProgressBar';
import PomodoroTimer from '../components/PomodoroTimer';
import { FaExclamationCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, logout } = useAuth();

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to load tasks.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (task) => {
        setError(null);
        try {
            const res = await api.post('/tasks', task);
            setTasks([...tasks, res.data]);
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Failed to add task.');
        }
    };

    const toggleComplete = async (id, status) => {
        const originalTasks = [...tasks];
        setTasks(tasks.map((task) => (task._id === id ? { ...task, completed: status } : task)));

        try {
            await api.put(`/tasks/${id}`, { completed: status });
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task status.');
            setTasks(originalTasks);
        }
    };

    const removeTask = async (id) => {
        const originalTasks = [...tasks];
        setTasks(tasks.filter((task) => task._id !== id));

        try {
            await api.delete(`/tasks/${id}`);
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task.');
            setTasks(originalTasks);
        }
    };

    const completedTasks = tasks.filter((task) => task.completed).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900 relative">
            {/* Background shapes - SAME as Login/Register */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            </div>

            {/* Main Content Container - Wider and more padding */}
            <div className="max-w-7xl mx-auto relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 sm:p-12">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-center border-b border-gray-100 pb-8">
                    <div>
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-2 tracking-tight">
                            FocusFlow
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">
                            Welcome back, <span className="text-indigo-600">{user?.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="mt-6 md:mt-0 flex items-center gap-3 px-8 py-4 bg-gray-50 hover:bg-gray-100 text-slate-700 rounded-full font-bold transition-all shadow-sm hover:shadow-md text-base group border border-gray-200"
                    >
                        <FaSignOutAlt className="group-hover:text-red-500 transition-colors text-lg" /> Logout
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 space-y-10">
                        <PomodoroTimer />

                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="text-xl font-bold text-slate-700">Daily Progress</h3>
                                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    {Math.round((tasks.length > 0 ? completedTasks / tasks.length : 0) * 100)}%
                                </span>
                            </div>
                            <ProgressBar total={tasks.length} completed={completedTasks} />
                            <p className="text-base text-slate-400 text-center mt-4 font-medium">
                                Keep it up! {completedTasks} / {tasks.length} tasks completed.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 mb-8 rounded-r-xl shadow-sm flex items-center text-lg">
                                <FaExclamationCircle className="mr-4 text-2xl" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <div className="mb-10">
                            <TaskForm onAdd={addTask} />
                        </div>

                        <div className="mb-8 flex justify-between items-center px-2">
                            <h2 className="text-3xl font-bold text-slate-800">Your Tasks</h2>
                            <span className="bg-indigo-100 text-indigo-700 text-base font-bold px-4 py-2 rounded-full shadow-inner">
                                {tasks.length} Active
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex flex-col justify-center items-center py-24">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-indigo-600 mb-6"></div>
                                <p className="text-slate-500 text-lg font-medium animate-pulse">Syncing your workflow...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <TaskList
                                    tasks={tasks}
                                    onToggleComplete={toggleComplete}
                                    onDelete={removeTask}
                                />
                                {tasks.length === 0 && (
                                    <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
                                        <p className="text-slate-400 text-xl">No tasks yet. Start by adding one above!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
