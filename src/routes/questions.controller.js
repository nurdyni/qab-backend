const { v4: uuidv4 } = require('uuid');
const knex = require('../utils/knex');

// * get all questions
function getQuestions(req, res) {
  knex('questions')
    .join('sections', 'questions.section_id', 'sections.id')
    .select(
      'questions.id',
      'questions.question_text',
      'questions.type_of_question',
      'sections.section_title'
    )
    .then((questions) => {
      if (questions.length === 0) {
        return res.json({ message: 'no questions', questions });
      } else {
        return res.json({ message: 'Get questions succeeded', questions });
      }
    })
    .catch((err) => {
      return res.json({ message: `Get questions failed`, err });
    });
}
function getSingleQuestion(req, res) {
  const { question_id } = req.params;
  knex('questions')
    .where('questions.id', '=', question_id)
    .select(
      'questions.id',
      'questions.question_text',
      'questions.type_of_question',
      { section_id: 'sections.id' },
      'sections.section_title'
    )
    .join('sections', 'questions.section_id', 'sections.id')
    .then((question) => {
      return res
        .status(200)
        .json({ message: 'Get single question succeeded', question });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: 'Get single question failed', err });
    });
}

function createQuestion(req, res) {
  // ! FIXME: Join with section table to display section title
  const { question_text, type_of_question, section_id } = req.body;
  console.log(req.body);
  knex('questions')
    .returning(['id', 'question_text', 'type_of_question', 'section_id'])
    .insert({
      id: uuidv4(),
      question_text: question_text,
      type_of_question: type_of_question,
      section_id: section_id,
    })
    .then((question) => {
      return res.json({ message: 'question created successfully', question });
    })
    .catch((err) => {
      return res.json({ message: 'question creation failed', err });
    });
}

function editQuestion(req, res) {
  // ! FIXME: Join with section table to display section title
  const { question_id } = req.params;
  const { question_text, type_of_question, section_id } = req.body;
  knex('questions')
    .where('id', '=', question_id)
    .returning(['id', 'question_text', 'type_of_question', 'section_id'])
    .update({
      question_text: question_text,
      type_of_question: type_of_question,
      section_id: section_id,
    })
    .then((question) => {
      if (question.length === 1) {
        return res
          .status(200)
          .json({ message: 'question update succeeded', question });
      } else if (question.length === 0) {
        return res.json({ message: 'no such question to update', err });
      } else {
        throw Error();
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: 'question update failed' });
    });
}

function deleteQuestion(req, res) {
  const { question_id } = req.params;
  knex('questions')
    .returning(['id', 'question_text', 'type_of_question', 'section_id'])
    .where('id', '=', question_id)
    .del()
    .then((question) => {
      if (question.length === 1) {
        return res.json({
          message: 'question deleted successfully',
          question: question,
        });
      } else if (question.length === 0) {
        return res.json({ message: 'no question to delete' });
      } else {
        throw Error();
      }
    })
    .catch((err) => {
      return res.json({ message: 'question deletion failed' });
    });
}

module.exports = {
  getQuestions,
  createQuestion,
  editQuestion,
  getSingleQuestion,
  deleteQuestion,
};
