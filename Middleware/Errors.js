// Middleware para manejar rutas no encontradas
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);

  next(error);
};

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  // Determinados el código de estado HTTP en función de si la respuesta ya tenía un código de estado
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const response = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, //pila de errores
  };

  res.json(statusCode).json(response);
};

export { notFound, errorHandler };
