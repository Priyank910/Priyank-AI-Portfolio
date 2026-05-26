export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: "Route not found.",
  });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }

  let status = err.status || err.statusCode || 500;

  if (err.message?.includes("GEMINI") || err.message?.includes("API key")) {
    status = 503;
  }

  const message =
    status >= 500
      ? "Something went wrong on the server. Please try again shortly."
      : err.message || "Request could not be completed.";

  if (status >= 500) {
    console.error(`[${req.method} ${req.path}]`, err);
  }

  res.status(status).json({
    success: false,
    error: message,
  });
}
