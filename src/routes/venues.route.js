const {
  createVenue,
  getVenues,
  getVenue,
  updateVenue,
  deleteVenue,
} = require('./venues.controller');

const venuesRouter = require('express').Router();

venuesRouter.post('/', createVenue);
venuesRouter.get('/', getVenues);
venuesRouter.get('/:venue_id', getVenue);
venuesRouter.put('/:venue_id', updateVenue);
venuesRouter.delete('/:venue_id', deleteVenue);

module.exports = venuesRouter;
