import express from 'express';
import dotenv from 'dotenv';
import resourceRouter from './routes/resource';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/resources', resourceRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
