function validateRequestSchema(schema) {
  return (req, res, next) => {
    const joiOptions = { stripUnknown: true };

    if (schema.params) {
      const { value, error } = schema.params.validate(req.params, joiOptions);
      if (error) return res.validationError(error);
      req.params = value;
    }
    if (schema.query) {
      const { value, error } = schema.query.validate(req.query, joiOptions);
      if (error) return res.validationError(error);
      req.query = value;
    }
    if (schema.body) {
      const { value, error } = schema.body.validate(req.body, joiOptions);
      if (error) return res.validationError(error);
      req.body = value;
    }
    next();
  };
}

module.exports = { validateRequestSchema };
