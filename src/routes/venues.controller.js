const knex = require('../utils/knex');

async function createVenue(req, res) {
  const { name, capacity, location, college_id } = req.body;
  try {
    const venue = await knex('venues')
      .returning(['id', 'capacity', 'name', 'location', 'college_id'])
      .insert({
        name,
        capacity,
        location,
        college_id,
      });

    return res.status(201).json({ message: 'Create venue succeeded', venue });
  } catch (error) {
    return res.status(404).json({ message: 'Create venue failed', error });
  }
}
async function getVenues(req, res) {
  try {
    const venues = await knex('venues')
      .returning(['id', 'capacity', 'name', 'location', 'college_id'])
      .select();

    return res.status(200).json({ message: 'Get venues succeeded', venues });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Get venues failed', error });
  }
}
async function getVenue(req, res) {
  const { venue_id } = req.params;
  try {
    const venue = await knex('venues')
      .returning(['id', 'capacity', 'name', 'location', 'college_id'])
      .select()
      .where('id', '=', venue_id);

    return res.status(200).json({ message: 'Get venue succeeded', venue });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Get venue failed', error });
  }
}
async function updateVenue(req, res) {
  const { venue_id } = req.params;
  const { name, capacity, location, college_id } = req.body;
  try {
    const venue = await knex('venues')
      .returning(['id', 'capacity', 'name', 'location', 'college_id'])
      .update({
        name,
        capacity,
        location,
        college_id,
      })
      .where('id', '=', venue_id);

    return res.status(200).json({ message: 'Update venue succeeded', venue });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Update venue failed', error });
  }
}
async function deleteVenue(req, res) {
  const { venue_id } = req.params;
  try {
    const venue = await knex('venues')
      .returning(['id', 'capacity', 'name', 'location', 'college_id'])
      .delete()
      .where('id', '=', venue_id);

    return res.status(200).json({ message: 'Delete venue succeeded', venue });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Delete venue failed', error });
  }
}

module.exports = {
  createVenue,
  getVenue,
  getVenues,
  updateVenue,
  deleteVenue,
};
