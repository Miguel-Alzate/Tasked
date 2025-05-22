require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { swaggerUi, swaggerSpec } = require('./config/swaggerConfig');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'active',
    documentation: '/docs',
  });
});

//  Port config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running`);
});