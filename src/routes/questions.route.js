const questionRouter = require('express').Router();

const {
  getQuestions,
  getSingleQuestion,
  createQuestion,
  editQuestion,
  deleteQuestion,
} = require('./questions.controller');

questionRouter.get('/', getQuestions);
questionRouter.get('/:question_id', getSingleQuestion);
questionRouter.post('/', createQuestion);
questionRouter.put('/:question_id', editQuestion);
questionRouter.delete('/:question_id', deleteQuestion);

module.exports = questionRouter;
