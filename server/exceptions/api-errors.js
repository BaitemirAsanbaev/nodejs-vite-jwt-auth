module.exports = class ApiErrors extends Error{
    status
    error
    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.error = errors
    }
    static UnauthorizedError(){
        return new ApiErrors(401, "User is unauthorized", )
    }
    static BadRequest( message, errors = []){
        return new ApiErrors(400, message, errors)
    }
}