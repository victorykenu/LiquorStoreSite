let joi = require("joi");

function validation(input) {
  let schema = joi.object({
    username: joi.string().min(5).required(),
    pass: joi.string().alphanum().min(5).required(),
    email: joi.string().email()
  });
  let result = schema.validate(input);
  return result;
}

module.exports = validation;
