const { body, validationResult } = require('express-validator');

const validatePatient = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').isLength({ min: 10 }).withMessage('Address must be at least 10 characters long'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('phone').isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long'),
  body('password')
    .isLength({ min: 8, max: 15 })
    .withMessage('Password must be between 8 and 15 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
  body('photo').notEmpty().withMessage('Photo is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validatePatient };
