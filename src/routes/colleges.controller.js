const knex = require('../utils/knex');

function createCollege(req, res) {
  const { name, principle } = req.body;
  knex('colleges')
    .insert({
      name: name,
      principle: principle || null,
    })
    .returning(['id', 'name', 'principle'])
    .then((college) => {
      console.log(college);
      return res
        .status(201)
        .json({ message: 'college creation succeeded', college });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: 'college creation failed', err });
    });
}
function getColleges(req, res) {
  knex('colleges')
    .returning(['name'])
    .select()
    .then((colleges) => {
      return res
        .status(200)
        .json({ message: 'Get colleges succeded', colleges });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Get colleges failed', err });
    });
}
function getSingleCollege(req, res) {
  const { college_id } = req.params;
  knex('colleges')
    .where('id', '=', college_id)
    .select()
    .returning(['id', 'name', 'principle'])
    .then((college) => {
      return res
        .status(200)
        .json({ message: 'Get single college succeeded', college });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: 'Get single college failed', err });
    });
}
function updateCollege(req, res) {
  const { college_id } = req.params;
  const { college_name, principle } = req.body;

  // *check if record is changed
  /*   knex('colleges')
  .where('id', '=', college_id)
  .select()
  .then(college => {
  }) */

  knex('colleges')
    .where('id', '=', college_id)
    .returning(['id', 'name', 'principle'])
    .update({
      name: college_name,
      principle: principle,
    })
    .then((college) => {
      return res
        .status(200)
        .json({ message: 'college update succeeded', college });
    })
    .catch((err) => {
      return res.status(404).json({ message: 'college update failed', err });
    });
}
function deleteCollege(req, res) {
  const { college_id } = req.params;
  knex('colleges')
    .returning(['id', 'name', 'principle'])
    .where('id', '=', college_id)
    .del()
    .then((college) => {
      return res
        .status(200)
        .json({ message: 'college deletion succeeded', college: college });
    })
    .catch((err) => {
      return res.status(404).json({ message: 'college deletion failed', err });
    });
}

module.exports = {
  createCollege,
  getColleges,
  getSingleCollege,
  updateCollege,
  deleteCollege,
};
