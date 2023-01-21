const Yup = require('yup');

exports.registerSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

exports.loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
