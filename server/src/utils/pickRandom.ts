export const pickRandom = () => {
    const arr: string[] = [
        "¯\\_(ツ)_/¯",
        "Hey there! I am using cadi",
        "Busy, Cant talk",
        "How are you?",
        "What up?",
    ];

    return arr[Math.floor(Math.random() * arr.length)];
};
