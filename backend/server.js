const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Export app for Vercel
module.exports = app;

// Only start server if run directly
if (require.main === module) {
    const startServer = async () => {
        try {
            await connectDB();
            app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        } catch (error) {
            console.error('Failed to connect to database. Server not started.', error);
            process.exit(1);
        }
    };
    startServer();
} else {
    // Determine if we are in a serverless environment and connect
    connectDB();
}
