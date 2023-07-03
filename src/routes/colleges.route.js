const {
  createCollege,
  getColleges,
  updateCollege,
  deleteCollege,
  getSingleCollege,
} = require('./colleges.controller');

const collegesRouter = require('express').Router();

collegesRouter.post('/', createCollege);
collegesRouter.get('/', getColleges);
collegesRouter.get('/:college_id', getSingleCollege);
collegesRouter.put('/:college_id', updateCollege);
collegesRouter.delete('/:college_id', deleteCollege);

module.exports = collegesRouter;
