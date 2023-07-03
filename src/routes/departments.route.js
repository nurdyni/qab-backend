const {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
} = require('./departments.controller');

const departmentsRouter = require('express').Router();

departmentsRouter.post('/', createDepartment);
departmentsRouter.get('/', getDepartments);
departmentsRouter.get('/:dep_id', getSingleDepartment);
departmentsRouter.put('/:dep_id', updateDepartment);
departmentsRouter.delete('/:dep_id', deleteDepartment);

module.exports = departmentsRouter;
