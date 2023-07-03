const { v4: uuidv4 } = require('uuid');
const knex = require('../utils/knex');
// FIXME: Consider output when no item is return by postgres

function createAnswer(req, res) {
  const { answer_text, question_id } = req.body;
  knex('answers')
    .returning(['answer_text', 'question_id'])
    .insert({
      id: uuidv4(),
      answer_text: answer_text,
      question_id: question_id,
    })
    .then((answer) => {
      res.status(200).json({ message: 'Answer creation succeeded', answer });
    })
    .catch((err) => {
      res.status(404).json({ message: 'Answer creation failed' });
    });
}
function getAnswers(req, res) {
  knex('answers')
    .select(
      'answers.id',
      'answers.answer_text',
      'questions.question_text',
      'questions.type_of_question'
    )
    .join('questions', 'answers.question_id', 'questions.id')
    .then((answers) => {
      res.status(200).json({ message: 'Get answers succeeded', answers });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Get answers failed', err });
    });
}
function getSingleAnswer(req, res) {
  const { answer_id } = req.params;
  knex('answers')
    .select(
      'answers.id',
      'answers.answer_text',
      'questions.question_text',
      'questions.type_of_question'
    )
    .where('answers.id', '=', answer_id)
    .join('questions', 'answers.question_id', 'questions.id')
    .then((answer) => {
      res.status(200).json({ message: 'Get answer succeeded', answer });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Get answer failed', err });
    });
}
function updateAnswer(req, res) {
  const { answer_id } = req.params;
  const { answer_text, question_id } = req.body;
  knex('answers')
    .returning(['id', 'answer_text', 'question_id'])
    .where('answers.id', '=', answer_id)
    .update({
      answer_text: answer_text,
      question_id: question_id,
    })
    .then((answer) => {
      res.status(200).json({ message: 'Answer update succeeded', answer });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Answer update failed', err });
    });
}
function deleteAnswer(req, res) {
  const { answer_id } = req.params;
  knex('answers')
    .returning(['id', 'answer_text', 'question_id'])
    .where('answers.id', '=', answer_id)
    .del()
    .then((answer) => {
      res.status(200).json({ message: 'Answer deletion succeeded', answer });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Answer deletion failed', err });
    });
}

module.exports = {
  createAnswer,
  getAnswers,
  getSingleAnswer,
  updateAnswer,
  deleteAnswer,
};
