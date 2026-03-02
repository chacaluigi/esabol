import { Role } from './role.model.js';
import { User } from './user.model.js';
import { Task } from './task.model.js';
import { Team } from './team.model.js';
import { TeamMember } from './teamMember.model.js';
import { DailyReport } from './dailyReport.model.js';
import { Subtask } from './subtask.model.js';
import { WorkdayType } from './workdayType.model.js';

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// RELACIONES PARA USER
User.hasMany(Task, { foreignKey: 'creatorId' });
Task.belongsTo(User, { foreignKey: 'creatorId' });

User.hasMany(Task, { foreignKey: 'assigneeUserId' });
Task.belongsTo(User, { foreignKey: 'assigneeUserId' });

//relación para el lider del equipo
User.hasMany(Team, { foreignKey: 'leaderUserId' });
Team.belongsTo(User, { foreignKey: 'leaderUserId' });

User.hasMany(TeamMember, { foreignKey: 'userId' });
TeamMember.belongsTo(User, { foreignKey: 'userId' });

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

Team.hasMany(TeamMember, { foreignKey: 'teamId' });
TeamMember.belongsTo(Team, { foreignKey: 'teamId' });
