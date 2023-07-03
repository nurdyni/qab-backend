const knex = require('../utils/knex');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  knex('users')
    .insert({
      id: uuidv4(),
      username: username,
      password: hashedPassword,
      role: role,
    })
    .returning(['username'])
    .then((user) => {
      // return res.redirect('http://localhost:3000/login');
      return res.status(201).json({ message: 'User crated', user });
    })
    .catch((err) => {
      return res.status(404).json({ message: 'create user failed', err });
    });
}

function getUsers(req, res) {
  knex('users')
    .returning(['username', 'role', 'password'])
    .select()
    .then((users) => {
      return res.status(200).json({ message: 'Get users succeeded', users });
    })
    .catch((err) => {
      return res.status(404).json({ message: 'Get users failed', err });
    });
}
function getUser(req, res) {
  const { user_id } = req.params;
  knex('users')
    .returning(['username', 'role', 'password'])
    .select()
    .where('users.id', '=', user_id)
    .then((user) => {
      return res.status(200).json({ message: 'Get user succeeded', user });
    })
    .catch((err) => {
      return res.status(404).json({ message: 'Get user failed', err });
    });
}
function updateUser(req, res) {}
function deleteUser(req, res) {
  const { user_id } = req.params;
  knex('users')
    .returning(['username', 'role', 'password'])
    .where('users.id', '=', user_id)
    .del()
    .then((user) => {
      return res.status(200).json({ message: 'Get user succeeded', user });
    })
    .catch((err) => {
      return res.status(404).json({ message: 'Get user failed', err });
    });
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
