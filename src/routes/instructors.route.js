const {
  getInstructors,
  createInstructor,
  getInstructor,
  updateInstructor,
  deleteInstructor,
} = require('./instructors.controller');

const instructorsRouter = require('express').Router();

instructorsRouter.post('/', createInstructor);
instructorsRouter.get('/', getInstructors);
instructorsRouter.get('/:instructor_id', getInstructor);
instructorsRouter.put('/:instructor_id', updateInstructor);
instructorsRouter.delete('/:instructor_id', deleteInstructor);

module.exports = instructorsRouter;
