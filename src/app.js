const express = require('express');

const questionRouter = require('./routes/questions.route');
const sectionRoute = require('./routes/sections.route');
const evalFormRouter = require('./routes/evalForm.route');
const collegesRouter = require('./routes/colleges.route');
const departmentsRouter = require('./routes/departments.route');
const answersRouter = require('./routes/answers.route');
const cors = require('cors');
const statsRouter = require('./routes/stats.route');
const loginRouter = require('./routes/login.route');
const usersRouter = require('./routes/users.router');
const instructorsRouter = require('./routes/instructors.route');
const venuesRouter = require('./routes/venues.route');
const coursesRouter = require('./routes/courses.route');
const lessonsRouter = require('./routes/lessons.route');
const timetablesRouter = require('./routes/timetables.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionRouter);
app.use('/sections', sectionRoute);
app.use('/colleges', collegesRouter);
app.use('/departments', departmentsRouter);
app.use('/form', evalFormRouter);
app.use('/answers', answersRouter);
app.use('/stats', statsRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/instructors', instructorsRouter);
app.use('/venues', venuesRouter);
app.use('/courses', coursesRouter);
app.use('/lessons', lessonsRouter);
app.use('/timetables', timetablesRouter);

module.exports = app;
