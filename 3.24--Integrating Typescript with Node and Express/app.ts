import express, { Request, Response } from 'express';
import todoRoutes from './routers/todoRoutes';
import { Todo } from './interfaces/todo';

const app = express();

app.use(express.json());
app.use('/api', todoRoutes);

let todos: Todo[] = [
    { id: 1, text: 'Learn TypeScript', completed: false },
    { id: 2, text: 'Build a REST API', completed: false }
];

app.get('/api/todos', (req: Request, res: Response) => {
    res.status(200).json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
    const newTodo: Todo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo added successfully', newTodo });
});

app.post('/api/delete-todo', (req: Request, res: Response) => {
    const { id } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.post('/api/edit-todo', (req: Request, res: Response) => {
    const { id, newText } = req.body;
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.text = newText;
        res.status(200).json({ message: 'Todo updated successfully', todo });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
