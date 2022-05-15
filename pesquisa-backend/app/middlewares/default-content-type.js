function defaultContentTypeMiddleware(req, res, next) {
  req.headers["content-type"] = req.headers["content-type"] || "application/x-www-form-urlencoded";
  next();
}

module.exports = defaultContentTypeMiddleware