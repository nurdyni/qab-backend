const {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require('./courses.controller');

const coursesRouter = require('express').Router();

coursesRouter.post('/', createCourse);
coursesRouter.get('/', getCourses);
coursesRouter.get('/:course_code', getSingleCourse);
coursesRouter.put('/:course_code', updateCourse);
coursesRouter.delete('/:course_code', deleteCourse);

module.exports = coursesRouter;
