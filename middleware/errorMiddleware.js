
const errorMiddleware = (err, req, res, next) => {
  console.log('Error middleware');

  if (typeof err === 'string') {
      // Custom message
      const statusCode = 400;
      const message = { error: err };
      res.status(statusCode).json(message);
  } else {
      let statusCode = err.statusCode || 500;
      let message = err.message || "Internal Server Error";

      // Log to console for dev
      console.error(err);

      res.status(statusCode).json({ error: message });
  }
};

export default errorMiddleware;
