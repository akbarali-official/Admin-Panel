// Jab koi route match na kare to ye chalega
export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

// Har error yahan aa kar clean JSON response ban jata hai
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Galat MongoDB id (e.g. /api/orders/abc)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Galat id: ${err.value}`;
  }

  // Schema validation fail (required field missing wagera)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Duplicate key (e.g. same email dobara)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Ye record pehle se maujood hai (duplicate)';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
