export class DatabaseAccessError extends Error {
    constructor(collection, operation, cause = undefined) {
        super(`Cannot execute ${operation} operation on ${collection} collection.`);
        this.name = "DatabaseAccessError";
        this.cause = cause;
        this.collection = collection;
        this.operation = operation;
    }
}

export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}
