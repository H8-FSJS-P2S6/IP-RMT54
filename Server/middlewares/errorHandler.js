function errorHandler(err, req, res, next) {
  console.log("🚀 ~ errorHandler ~ err:", err)
  switch (err.name) {
    case "JsonWebTokenError":
      res.status(401).json({ message: `Invalid Token` });
      break;
    case "Forbidden":
      res.status(403).json({ message: err.message });
      break;
    case "NotFound":
      res.status(404).json({ message: err.message });
      break;
    case "NotAuthorized":
      res.status(401).json({ message: err.message });
      break;
    case "SequelizeValidationError":
      return res
        .status(400)
        .json({ message: err.errors.map((e) => e.message) })
      break;
    case "Conflict":
      res.status(409).json({ message: err.message });
      break;
    case "BadReq":
      res.status(409).json({ message: err.message });
      break;
    case "SequelizeUniqueConstraintError":
      res
        .status(409)
        .json({ message:err.message });
      break;

    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
}
module.exports = errorHandler;
