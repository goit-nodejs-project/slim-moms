const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./helpers/swagger');

// Route importları dosyanın başında tanımlandı
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const diaryRoutes = require('./routes/diaryRoutes');

dotenv.config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/diary', diaryRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
