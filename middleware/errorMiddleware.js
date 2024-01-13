// const errorMiddleware = (err, req, res, next) => {
//     try {
//       console.log(err);
//       const defaultErrors = {
//         statusCode: 500,
//         message: err,
//       };
  
//       // missing filed error
//       if (err.name === "ValidationError") {
//         defaultErrors.statusCode = 400;
//         defaultErrors.message = Object.values(err.errors)
//           .map((item) => item.message)
//           .join(",");
//       }
  
//       // duplicate error
//       if (err.code && err.code === 11000) {
//         defaultErrors.statusCode = 400;
//         defaultErrors.message = `${Object.keys(
//           err.keyValue
//         )} field has to be unique`;
//       }
  
//       res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
//     } catch (error) {
//       // Handle unexpected errors here
//       console.error("Error in error middleware:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
  
//   export default errorMiddleware;
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
