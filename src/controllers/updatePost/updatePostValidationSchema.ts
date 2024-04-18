import { body, param } from 'express-validator';

const updatePostValidationSchema = [
    param('id').trim().notEmpty().withMessage('Id cant be empty').escape(),
    body('title')
        .optional()
        .isString()
        .withMessage('Title should be string')
        .escape(),
    body('body')
        .optional()
        .isString()
        .withMessage('Body should be string')
        .escape(),
];
export default updatePostValidationSchema;
