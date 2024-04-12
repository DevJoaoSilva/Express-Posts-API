const createPostValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: 'The Post title cannot be empty',
        },
    },
    body: {
        notEmpty: {
            errorMessage: 'The Post body cannot be empty',
        },
    },
};

export default createPostValidationSchema;