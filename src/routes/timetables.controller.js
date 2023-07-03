const uuidv4 = require('uuid').v4;
const uuidValidate = require('uuid').validate;
const knex = require('../utils/knex');

async function createInstructor(req, res) {
  const { name, department_id } = req.body;
  try {
    const instructor = await knex('instructors')
      .returning(['id', 'name', 'department_id'])
      .insert({
        id: uuidv4(),
        name,
        department_id,
      });

    return res
      .status(201)
      .json({ message: 'Create instructor succeeded', instructor });
  } catch (error) {
    return res.status(404).json({ message: 'Create instructor failed', error });
  }
}
async function getInstructors(req, res) {
  try {
    const instructors = await knex('instructors')
      .returning(['id', 'name', 'department_id'])
      .select();

    return res
      .status(200)
      .json({ message: 'Get instructors succeeded', instructors });
  } catch (error) {
    return res.status(404).json({ message: 'Get instructors failed', error });
  }
}
async function getInstructor(req, res) {
  // FIXME: error uuid
  const { instructor_id } = req.params;
  const isUuid = uuidValidate(instructor_id);
  try {
    if (isUuid) {
      const instructor = await knex('instructors')
        .returning(['name', 'department_id'])
        .select()
        .where('id', '=', instructor_id);

      return res
        .status(200)
        .json({ message: 'Get instructor succeeded', instructor });
    }
  } catch (error) {
    return res.status(404).json({ message: 'Get instructor failed', error });
  }
}
async function updateInstructor(req, res) {
  const { instructor_id } = req.params;
  const { name, department_id } = req.body;
  try {
    const instructor = await knex('instructors')
      .returning(['name', 'department_id'])
      .update({
        name,
        department_id,
      })
      .where('id', '=', instructor_id);

    return res
      .status(200)
      .json({ message: 'Update instructor succeeded', instructor });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Update instructor failed', error });
  }
}
async function deleteInstructor(req, res) {
  const { instructor_id } = req.params;
  try {
    const instructor = await knex('instructors')
      .returning(['name', 'department_id'])
      .delete()
      .where('id', '=', instructor_id);

    return res
      .status(200)
      .json({ message: 'Delete instructor succeeded', instructor });
  } catch (error) {
    return res.status(404).json({ message: 'Delete instructor failed', error });
  }
}

module.exports = {
  createInstructor,
  getInstructor,
  getInstructors,
  updateInstructor,
  deleteInstructor,
};
