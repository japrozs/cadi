import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
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
