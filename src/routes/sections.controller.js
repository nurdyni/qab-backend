const { v4: uuidv4 } = require('uuid');
const knex = require('../utils/knex');

// * Implementation of create a section
function createSection(req, res) {
  const { section_title } = req.body;
  console.log(req.body);
  knex('sections')
    .returning(['id', 'section_title'])
    .insert({ section_title: section_title, id: uuidv4() })
    .then((data) => {
      // return res.json({ message: 'section creation succeded' });
      return res.json({ message: 'section creation succeded', section: data });
    })
    .catch((err) => {
      return res.json({ message: 'section creation failed', err });
    });
}

// *Implementation of get all sections
function getSections(req, res) {
  knex('sections')
    .select()
    .then((sections) => {
      if (sections.length === 0) {
        return res.json({ message: 'no section', sections });
      }
      return res.json({ message: 'Get section succeeded', sections });
    })
    .catch((err) => {
      return res.status(404).json({ message: 'error getting section', err });
    });
}
function getSingleSection(req, res) {
  const { section_id } = req.params;
  knex('sections')
    .where('id', '=', section_id)
    .select()
    .returning(['id', 'section_title'])
    .then((section) => {
      return res
        .status(200)
        .json({ message: 'Get single section succeeded', section });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: 'Get single section failed', err });
    });
}

// * Implementation of edit section
function editSection(req, res) {
  const { section_id } = req.params;
  const { section_title } = req.body;
  knex('sections')
    .where('id', '=', section_id)
    .update({ section_title: section_title })
    .returning(['id', 'section_title'])
    .then((section) => {
      return res.json({ message: 'section update succeeded', section });
    })
    .catch((err) => {
      res.status(404).json({ message: 'section update failed', err });
    });
}

//* Implementation of section deletion
function deleteSection(req, res) {
  const { section_id } = req.params;
  knex('sections')
    .returning(['id', 'section_title'])
    .where('id', '=', section_id)
    .del()
    .then((section) => {
      if (section.length === 1) {
        return res.json({ message: 'section deletion succeeded', section });
      } else if (section.length === 0) {
        return res.json({ message: 'no section to delete' });
      } else {
        throw Error('Error occured');
      }
    })
    .catch((err) => {
      return res.json({ message: 'section deletion failed', err });
    });
}

module.exports = {
  createSection,
  getSections,
  getSingleSection,
  editSection,
  deleteSection,
};
