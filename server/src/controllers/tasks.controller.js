import { Task } from '../models/index.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    if (!task)
      return res.status(404).json({ msg: 'Task have not been created' });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    if (tasks.length === 0)
      return res.status(404).json({ msg: 'Tasks not found' });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    //console.error(error);
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ msg: 'Task not found to update' });

    task.set(data);
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    //console.error(error);
    next(error);
  }
};
