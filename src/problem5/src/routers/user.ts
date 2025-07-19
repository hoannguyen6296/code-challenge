import express from 'express';
import { UserService } from '../application/use-cases/user';
import { createUserSchema, updateUserSchema } from '../application/validations/user';


export function createUserRouter(userService: UserService) {
  const router = express.Router();

  router.get('/', async (_req, res) => {
    try {
      const users = await userService.listUsers();
      res.json(users);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.json(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.post('/', async (req, res) => {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    try {
      const user = await userService.createUser({ id: '', ...parsed.data });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.put('/:id', async (req, res) => {
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    try {
      const user = await userService.updateUser({ id: req.params.id, email: '', ...parsed.data });
      res.json(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  return router;
}