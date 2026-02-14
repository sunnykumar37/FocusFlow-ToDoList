import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import clsx from 'clsx';

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // 'focus' or 'break'

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optional: Play sound here
            if (mode === 'focus') {
                setMode('break');
                setTimeLeft(5 * 60);
            } else {
                setMode('focus');
                setTimeLeft(25 * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMode('focus');
        setTimeLeft(25 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>

            <h2 className="text-lg font-medium mb-4 uppercase tracking-wider opacity-90">
                {mode === 'focus' ? 'Focus Time' : 'Break Time'}
            </h2>

            <div className="text-6xl font-bold font-mono mb-8 tracking-wider">
                {formatTime(timeLeft)}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={toggleTimer}
                    className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full p-4 shadow-lg transition-transform hover:scale-105 active:scale-95"
                    title={isActive ? "Pause" : "Start"}
                >
                    {isActive ? <FaPause size={24} /> : <FaPlay size={24} className="ml-1" />}
                </button>

                <button
                    onClick={resetTimer}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
                    title="Reset"
                >
                    <FaRedo size={20} />
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
