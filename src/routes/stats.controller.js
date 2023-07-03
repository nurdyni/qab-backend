function getStats(req, res) {
  res.status(200).json({ messages: 'Got stats' });
}

module.exports = { getStats };
