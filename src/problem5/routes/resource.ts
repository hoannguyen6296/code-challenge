import { Router } from 'express';
import { connectDB } from '../database';

const router = Router();

router.post('/', async (req, res) => {
  const db = await connectDB();
  const { name, type } = req.body;
  const result = await db.run(`INSERT INTO resources (name, type) VALUES (?, ?)`, [name, type]);
  res.json({ id: result.lastID, name, type });
});

router.get('/', async (req, res) => {
  const db = await connectDB();
  const { type } = req.query;
  const rows = await db.all(
    `SELECT * FROM resources ${type ? 'WHERE type = ?' : ''}`,
    type ? [type] : []
  );
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const db = await connectDB();
  const resource = await db.get(`SELECT * FROM resources WHERE id = ?`, [req.params.id]);
  if (!resource) return res.status(404).json({ error: 'Not found' });
  res.json(resource);
});

router.put('/:id', async (req, res) => {
  const db = await connectDB();
  const { name, type } = req.body;
  await db.run(`UPDATE resources SET name = ?, type = ? WHERE id = ?`, [name, type, req.params.id]);
  res.json({ id: req.params.id, name, type });
});

router.delete('/:id', async (req, res) => {
  const db = await connectDB();
  await db.run(`DELETE FROM resources WHERE id = ?`, [req.params.id]);
  res.json({ message: 'Deleted' });
});

export default router;
