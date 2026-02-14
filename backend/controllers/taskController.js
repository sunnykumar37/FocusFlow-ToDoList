const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const { category, priority } = req.query;
        // Filter by logged in user
        let query = { user: req.user.id };

        if (category) {
            query.category = category;
        }

        if (priority) {
            query.priority = priority;
        }

        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a task
// @route   POST /tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        if (!req.body.title) {
            res.status(400); // Bad Request
            throw new Error('Please add a title field');
        }

        const task = await Task.create({
            title: req.body.title,
            category: req.body.category,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            user: req.user.id, // Add user ID
        });
        res.status(201).json(task);
    } catch (error) {
        // Mongoose validation error handling
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).json({ message: messages.join(', ') });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

// @desc    Update a task
// @route   PUT /tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the task user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true // Ensure updates are also validated
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the task user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
