module.exports = function (req, res, next) {
  Object.assign(res, {
    success(payload) {
      return this.status(200).json({
        success: true,
        payload,
      });
    },

    badRequest(error = "bad-request", message = null) {
      return this.status(400).json({
        success: false,
        error,
        message,
      });
    },

    unauthorized(
      error = "unauthorized",
      message = "You must be logged in to access this resource."
    ) {
      return this.status(401).json({
        success: false,
        error,
        message,
      });
    },

    notFound(
      error = "not-found",
      message = "The requested resource does not exist."
    ) {
      return this.status(404).json({
        success: false,
        error,
        message,
      });
    },

    validationError(joiError) {
      return this.status(422).json({
        success: false,
        error: "invalid-payload",
        message: joiError.details.map((detail) => detail.message),
      });
    },

    serverError() {
      return this.status(500).json({
        success: false,
        error: "server-error",
        message: "Oh no! Something has gone horribly wrong",
      });
    },
  });

  next();
};
