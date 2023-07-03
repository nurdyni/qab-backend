const answersRouter = require('express').Router();

const {
  createAnswer,
  getAnswers,
  getSingleAnswer,
  updateAnswer,
  deleteAnswer,
} = require('./answers.controller');

answersRouter.post('/', createAnswer);
answersRouter.get('/', getAnswers);
answersRouter.get('/:answer_id', getSingleAnswer);
answersRouter.put('/:answer_id', updateAnswer);
answersRouter.delete('/:answer_id', deleteAnswer);

module.exports = answersRouter;
