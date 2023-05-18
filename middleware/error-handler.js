const { CustomApiError } = require('../error/custom-error');

const apiErrorHandlerMiddleware = (err, req, res, next) => {
    // return res.status(500).json({ msg:err });
    console.log(err);
    if(err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ msg: err.message});
    }
    return res.status(500).json({ msg: `Something went wrong, please try again` });
}

module.exports = apiErrorHandlerMiddleware;