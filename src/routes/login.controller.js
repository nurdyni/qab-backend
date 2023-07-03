const bcryptjs = require('bcryptjs');

async function login(req, res) {
  const { username, password } = req.body;
  return res.redirect('/admin/dashboard');
}
module.exports = { login };
