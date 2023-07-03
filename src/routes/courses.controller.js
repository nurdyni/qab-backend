const knex = require('../utils/knex');

function createCourse(req, res) {
  const {
    code,
    name,
    credits,
    lecture_hours,
    practical_hours,
    tutorial_hours,
    department_id,
  } = req.body;
  knex('courses')
    .returning('code', 'name', 'department_id')
    .insert({
      code: code.toUpperCase(),
      name: name,
      credits: credits,
      lecture_hours: lecture_hours,
      practical_hours: practical_hours,
      tutorial_hours: tutorial_hours,
      department_id: department_id,
    })
    .then((course) => {
      return res
        .status(200)
        .json({ message: 'Course creation failed', course });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Course creation failed' });
    });
}

function getCourses(req, res) {
  knex('courses')
    .select(
      'courses.code',
      'courses.name',
      'courses.credits',
      'courses.lecture_hours',
      'courses.practical_hours',
      'courses.tutorial_hours',
      { department: 'departments.name' },
      'departments.head_of_department'
    )
    .join('departments', 'courses.department_id', 'departments.id')
    .then((courses) => {
      return res.status(200).json({ message: '', courses });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'failed to get courses' });
    });
}
function getSingleCourse(req, res) {
  // FIXME: Chain Joins to get the college
  const { course_code } = req.params;
  knex('courses')
    .where('courses.code', '=', course_code.toUpperCase())
    .select(
      'courses.code',
      'courses.name',
      'courses.credits',
      'courses.lecture_hours',
      'courses.practical_hours',
      'courses.tutorial_hours',
      { department: 'departments.name' },
      'departments.head_of_department'
    )
    .join('departments', 'courses.department_id', 'departments.id')
    .then((course) => {
      return res.status(200).json({ message: 'Get course succeeded', course });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: 'Get course failed' });
    });
}

function updateCourse(req, res) {
  const { course_code } = req.params;
  const {
    code,
    name,
    credits,
    lecture_hours,
    practical_hours,
    tutorial_hours,
    department_id,
  } = req.body;
  knex('courses')
    .where('code', '=', course_code.toUpperCase())
    .returning([
      'code',
      'name',
      'credits',
      'lecture_hours',
      'practical_hours',
      'tutorial_hours',
      'department_id',
    ])
    .update({
      code: code,
      name: name,
      credits: credits,
      lecture_hours: lecture_hours,
      practical_hours: practical_hours,
      tutorial_hours: tutorial_hours,
      department_id: department_id,
    })
    .then((course) => {
      return res
        .status(200)
        .json({ message: 'course update succeeded', course });
    })
    .catch((err) => {
      return res.status(404).json({ message: 'course update failed' });
    });
}
function deleteCourse(req, res) {
  const { code } = req.body;
  knex('courses')
    .where('course.code', '=', code)
    .del()
    .then((course) => {
      return res
        .status(200)
        .json({ message: 'course deletion succeeded', course });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'course deletion failed' });
    });
}

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getSingleCourse,
};
