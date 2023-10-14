module.exports = class UserDto{
    email
    id

    constructor({email, _id}) {
        this.email = email;
        this.id = _id;
    }
}