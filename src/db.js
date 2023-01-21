const users = [];
let id = 1;

exports.create = (email, password) => {
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return null;
  }

  const newUser = {
    id,
    email,
    password,
  };
  users.push(newUser);
  id++;

  return newUser;
};

exports.findById = (id) => {
  return users.find((user) => user.id === id) || null;
};

exports.findByEmail = (email) => {
  return users.find((user) => user.email === email) || null;
};
