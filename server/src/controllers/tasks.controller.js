import { Task, User } from '../models/index.js';

export const createTask = async (req, res, next) => {
  try {
    const { assigneeUserIds, ...data } = req.body;
    const task = await Task.create(data);

    if (!task)
      return res.status(404).json({ msg: 'Task have not been created' });

    if (assigneeUserIds && assigneeUserIds.length > 0) {
      await task.setAssignees(assigneeUserIds);
    }

    const taskWithAssignees = await Task.findByPk(task.id, {
      include: [
        {
          model: User,
          as: 'assignees',
          attributes: ['id', 'name']
        }
      ]
    });

    res.status(201).json(taskWithAssignees);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: 'assignees',
          attributes: ['id', 'name']
        }
      ]
    });
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
    const { assigneeUserIds, ...data } = req.body;
    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ msg: 'Task not found to update' });
    await task.update(data);

    if (assigneeUserIds) {
      await task.setAssignees(assigneeUserIds);
    }

    const updatedTask = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignees',
          attributes: ['id', 'name']
        }
      ]
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.destroy({ where: { id } });

    if (!task) return res.status(404).json({ msg: 'Task not found to delete' });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
