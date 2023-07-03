const {
  getInstructors,
  createInstructor,
  getInstructor,
  updateInstructor,
  deleteInstructor,
} = require('./instructors.controller');

const timetablesRouter = require('express').Router();

timetablesRouter.post('/', createInstructor);
timetablesRouter.get('/', getInstructors);
timetablesRouter.get('/:instructor_id', getInstructor);
timetablesRouter.put('/:instructor_id', updateInstructor);
timetablesRouter.delete('/:instructor_id', deleteInstructor);

module.exports = timetablesRouter;
