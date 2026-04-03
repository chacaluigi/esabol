import { sequelize } from '../config/database.js';

import Role from './role.model.js';
import Rank from './rank.model.js';
import Position from './position.model.js';
import Speciality from './specialities.model.js';
import User from './user.model.js';
import Task from './task.model.js';
import Team from './team.model.js';
import TeamMember from './team-member.model.js';
import DailyReport from './daily-report.model.js';
import Subtask from './subtask.model.js';
import WorkdayType from './workday-type.model.js';
import TaskAssignee from './task-assignees.model.js';

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

Rank.hasMany(User, { foreignKey: 'rankId' });
User.belongsTo(Rank, { foreignKey: 'rankId' });

Position.hasMany(User, { foreignKey: 'positionId' });
User.belongsTo(Position, { foreignKey: 'positionId' });

Speciality.hasMany(User, { foreignKey: 'specialityId' });
User.belongsTo(Speciality, { foreignKey: 'specialityId' });

// RELACIONES PARA USER
User.hasMany(Task, { foreignKey: 'creatorId' });
Task.belongsTo(User, { foreignKey: 'creatorId' });

//relación para el lider del equipo
User.hasMany(Team, { foreignKey: 'leaderUserId' });
Team.belongsTo(User, { foreignKey: 'leaderUserId' });

User.belongsToMany(Team, {
  through: TeamMember,
  foreignKey: 'userId',
});
Team.belongsToMany(User, {
  through: TeamMember,
  as: 'members',
  foreignKey: 'teamId',
});

User.hasMany(DailyReport, { foreignKey: 'userId' });
DailyReport.belongsTo(User, { foreignKey: 'userId' });

//RELACIONES PARA TASK
Task.hasMany(Subtask, { foreignKey: 'taskId' });
Subtask.belongsTo(Task, { foreignKey: 'taskId' });

Task.hasMany(DailyReport, { foreignKey: 'taskId' });
DailyReport.belongsTo(Task, { foreignKey: 'taskId' });

//RELACIONES PARA DAILY REPORT
DailyReport.hasMany(WorkdayType, { foreignKey: 'workdayTypeId' });
WorkdayType.belongsTo(DailyReport, { foreignKey: 'workdayTypeId' });

Team.hasMany(Task, { foreignKey: 'assigneeTeamId' });
Task.belongsTo(Team, { foreignKey: 'assigneeTeamId' });

Task.belongsToMany(User, {
  through: TaskAssignee,
  as: 'assignees',
  foreignKey: 'taskId'
});

User.belongsToMany(Task, {
  through: TaskAssignee,
  as: 'tasks',
  foreignKey: 'userId'
});

export {
  sequelize,
  Role,
  Rank,
  Position,
  Speciality,
  User,
  Task,
  Team,
  TeamMember,
  DailyReport,
  Subtask,
  WorkdayType,
  TaskAssignee
};
