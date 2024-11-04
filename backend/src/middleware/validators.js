const { body, validationResult } = require("express-validator");

// Validation rules for creating and updating
exports.validateTask = [
  body("title").isString().trim().notEmpty().withMessage("Title is required"),
  body("description").isString().trim().notEmpty().withMessage("Description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
