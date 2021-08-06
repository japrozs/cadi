export const isEmpty = (...args: any[]): boolean => {
    args.forEach((arg) => {
        if (arg.trim().length == 0) {
            return true;
        }
    });

    return false;
};
