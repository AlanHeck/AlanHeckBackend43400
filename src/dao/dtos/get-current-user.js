export default class GetCurrentUserDto {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
    }
}