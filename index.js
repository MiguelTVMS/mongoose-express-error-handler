module.exports = (err, req, res, next) => {

    if (err === 'undefined') {
        next(err);
        return;
    }

    if (err.status && isFinite(err.status)) {
        handleHttpStatusCode(err, res, next);
    }

    switch (err.name) {
    case 'ValidationError':
        handleValidationError(err, res);
        break;
    case 'CastError':
        handleCastError(err, res)
        break;
    case 'MongoError':
        handleMongoError(err, res, next)
        break;
    default:
        next(err);
        break;
    }
}

function handleMongoError(err, res, next) {

    switch (err.code) {
    case 11000:
        handleDuplicateValidationError(err, res);
        break;
    default:
        next(err);
        break;
    }

}

function handleHttpStatusCode(err, res, next) {

    if (err.status > 500) next(err);

    res.sendStatus(err.status);

}

function handleCastError(err, res) {
    res.status(400).json(createErrorMessage(err));
}

function handleDuplicateValidationError(err, res) {
    res.sendStatus(409);
}

function handleValidationError(err, res) {

    res.status(400).json(createErrorMessage(err));

}

function createErrorMessage(err) {
    var errorMessage = {
        message: err.message,
        errors: []
    };

    for (var prop in err.errors) {

        errorMessage.errors.push({
            propertyName: prop,
            propertyPath: err.errors[prop].path,
            validation: err.errors[prop].kind,
            message: err.errors[prop].message || err.errors[prop].kind
        });
    }

    if (errorMessage.errors.length <= 0) delete errorMessage.errors;

    return errorMessage;
}
