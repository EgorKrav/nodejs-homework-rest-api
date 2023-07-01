const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (req.method === "PUT") {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "missing fields" });
      } else {
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.message });
        }
        next();
      }
    } else if (req.method === "POST") {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      next();
    } else {
      next();
    }
  };

  return func;
};

module.exports = validateBody;
