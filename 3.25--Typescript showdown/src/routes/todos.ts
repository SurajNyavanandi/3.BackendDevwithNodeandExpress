import { Router } from 'express';
import { Todo } from '../models/todo';

type RequestBody = { text: string; id?: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);

  res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === params.todoId);

  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: 'Updated todo', todos: todos });
  }

  res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === params.todoId);

  if (todoIndex >= 0) {
    todos.splice(todoIndex, 1);
    return res.status(200).json({ message: 'Deleted todo', todos: todos });
  }

  res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.post('/todo/delete', (req, res, next) => {
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === body.id);

  if (todoIndex >= 0) {
    todos.splice(todoIndex, 1);
    return res.status(200).json({ message: 'Deleted todo', todos: todos });
  }

  res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.post('/todo/edit', (req, res, next) => {
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === body.id);

  if (todoIndex >= 0) {
    todos[todoIndex].text = body.text;
    return res.status(200).json({ message: 'Edited todo', todos: todos });
  }

  res.status(404).json({ message: 'Could not find todo for this id.' });
});

export default router;
