const {
  getInstructors,
  createInstructor,
  getInstructor,
  updateInstructor,
  deleteInstructor,
} = require('./instructors.controller');

const lessonsRouter = require('express').Router();

lessonsRouter.post('/', createInstructor);
lessonsRouter.get('/', getInstructors);
lessonsRouter.get('/:instructor_id', getInstructor);
lessonsRouter.put('/:instructor_id', updateInstructor);
lessonsRouter.delete('/:instructor_id', deleteInstructor);

module.exports = lessonsRouter;
