const usersCtrl = {};

usersCtrl.getUsers = (req, res) => res.send('Users');
usersCtrl.createUser = (req, res) => res.send('Users');
usersCtrl.deleteUser = (req, res) => res.send('Users');

module.exports = usersCtrl;