const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('./users.controller');

const usersRouter = require('express').Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:user_id', getUser);
usersRouter.put('/:user_id', updateUser);
usersRouter.delete('/:user_id', deleteUser);

module.exports = usersRouter;
