const {check} = require('express-validator');

exports.signupValidation = [
    check('f_name', 'First name is required').not().isEmpty(),
    check('l_name', 'Last name is required').not().isEmpty(),
    check('phone', 'Phone is required').isNumeric().isLength({min: 10}),
    check('password','Password is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty()
];


exports.loginValidation = [
    check('phone').isNumeric().isLength({min: 10, max: 10})
];