import express from 'express';
import { UserService } from '../application/use-cases/user';
import { createUserSchema, findUserSchema, updateUserSchema } from '../entities/users/user.validation';
import { customError, customErrorCodes } from '../common/error';
import { z } from 'zod';


export function createUserRouter(userService: UserService) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const parsed = findUserSchema.safeParse(req.query);
    if (!parsed.success) return res.status(400).json(z.prettifyError(parsed.error));
    try {

      const users = await userService.listUsers(parsed.data);
      res.json(users);
    } catch (err) {
      res.status(500).send(err.message ?? JSON.stringify(err));
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const user = await userService.getUser(req.params.id);
      res.json(user);
    } catch (err) {
      if (!(err instanceof customError)) {
        return res.status(500).send(err.message);
      }
      if (err.code === customErrorCodes.USER_NOT_FOUND) {
        return res.status(404).send(err.message);
      }
      return res.status(400).send(err.message);
    }
  });

  router.post('/', async (req, res) => {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(z.prettifyError(parsed.error));
    try {
      const user = await userService.createUser({ id: '', ...parsed.data });
      res.status(201).json(user);
    } catch (err) {
      if (!(err instanceof customError)) {
        return res.status(500).send(err.message);
      }
      return res.status(400).send(err.message);
    }
  });

  router.patch('/:id', async (req, res) => {
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(z.prettifyError(parsed.error));
    try {
      const user = await userService.updateUser({ id: req.params.id, ...parsed.data });
      res.json(user);
    } catch (err) {
      if (!(err instanceof customError)) {
        return res.status(500).send(err.message);
      }
      return res.status(400).send(err.message);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      if (!(err instanceof customError)) {
        return res.status(500).send(err.message);
      }
      return res.status(400).send(err.message);
    }
  });

  return router;
}