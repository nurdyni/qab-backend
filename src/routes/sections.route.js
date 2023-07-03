const sectionRoute = require('express').Router();

const {
  createSection,
  getSections,
  editSection,
  deleteSection,
  getSingleSection,
} = require('./sections.controller');

sectionRoute.post('/', createSection);
sectionRoute.get('/', getSections);
sectionRoute.get('/:section_id', getSingleSection);
sectionRoute.put('/:section_id', editSection);
sectionRoute.delete('/:section_id', deleteSection);

module.exports = sectionRoute;
