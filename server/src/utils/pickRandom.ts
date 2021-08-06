export const pickRandom = () => {
    const arr: string[] = [
        "¯\\_(ツ)_/¯",
        "Hey there! I'm using whatsapp",
        "Busy, Can't talk",
        "How are you?",
        "What up?",
    ];

    return arr[Math.floor(Math.random() * arr.length)];
};
