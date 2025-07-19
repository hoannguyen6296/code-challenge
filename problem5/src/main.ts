import express from 'express';
import { UserService } from './application/use-cases/user';
import { createUserRouter } from './routers/user';

const app = express();
app.use(express.json());
const apiVersion = '/api/v1';
const userService = new UserService();
app.use(`${apiVersion}/users`, createUserRouter(userService));

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));