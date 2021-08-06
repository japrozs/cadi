"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
exports.validateRegister = (options) => {
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "Length must be greater than 2",
            },
        ];
    }
    if (!options.email.includes("@") || !options.email.includes(".")) {
        return [
            {
                field: "email",
                message: "Invalid Email",
            },
        ];
    }
    if (options.username.includes(" ")) {
        return [
            {
                field: "username",
                message: "Username cannot include spaces or @, !, #",
            },
        ];
    }
    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "Length must be greater than 2",
            },
        ];
    }
    return null;
};
//# sourceMappingURL=validateRegister.js.map