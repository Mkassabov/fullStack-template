/**
 * Wraps an express middleware to forward async errors to express error handler
 */
function handleAsyncErrors(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { handleAsyncErrors };
