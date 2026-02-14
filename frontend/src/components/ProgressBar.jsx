import React from 'react';

const ProgressBar = ({ total, completed }) => {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${percentage}%` }}
            >
                {percentage > 5 && `${percentage}%`}
            </div>
        </div>
    );
};

export default ProgressBar;
