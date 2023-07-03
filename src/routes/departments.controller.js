const knex = require('../utils/knex');

function createDepartment(req, res) {
  const { name, head_of_department, college_id } = req.body;
  knex('departments')
    .insert({
      name: name,
      head_of_department: head_of_department || null,
      college_id: +college_id,
    })
    .returning(['id', 'name', 'head_of_department'])
    .then((department) => {
      return res
        .status(201)
        .json({ message: 'department creation succeeded', department });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ message: 'department creation failed', err });
    });
}
function getDepartments(req, res) {
  knex('departments')
    .select(
      'departments.id',
      'departments.name',
      'departments.head_of_department',
      {
        college_name: 'colleges.name',
        college_principle: 'colleges.principle',
      }
    )
    .join('colleges', 'departments.college_id', 'colleges.id')
    .then((departments) => {
      return res
        .status(200)
        .json({ message: 'Get departments succeded', departments });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Get departments failed', err });
    });
}
function getSingleDepartment(req, res) {
  const { dep_id } = req.params;
  knex('departments')
    .where('departments.id', '=', dep_id)
    .select(
      'departments.id',
      'departments.name',
      'departments.head_of_department',
      {
        college_name: 'colleges.name',
        college_principle: 'colleges.principle',
      }
    )
    .join('colleges', 'departments.college_id', 'colleges.id')
    .then((department) => {
      return res
        .status(200)
        .json({ message: 'Get single department succeeded', department });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: 'Get single department failed', err });
    });
}
function updateDepartment(req, res) {
  const { dep_id } = req.params;
  const { name, head_of_department } = req.body;

  knex('departments')
    .where('id', '=', dep_id)
    .returning(['id', 'name', 'head_of_department'])
    .update({
      name: name,
      head_of_department: head_of_department,
    })
    .then((department) => {
      if (question.length === 1) {
        return res
          .status(200)
          .json({ message: 'department update succeeded', department });
      } else if (question.length === 0) {
        return res.json({ message: 'no such department to update' });
      } else {
        throw Error();
      }
    })
    .catch((err) => {
      return res.status(404).json({ message: 'department not found', err });
    });
}
function deleteDepartment(req, res) {
  const { dep_id } = req.params;
  console.log(dep_id);
  knex('departments')
    .returning(['id', 'name', 'head_of_department'])
    .where('id', '=', department_id)
    .del()
    .then((department) => {
      if (question.length === 1) {
        return res
          .status(200)
          .json({ message: 'department deletion succeeded', department });
      } else if (question.length === 0) {
        return res.json({ message: 'no department to delete' });
      } else {
        throw Error();
      }
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: 'department deletion failed', err });
    });
}

module.exports = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
