"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickRandom = void 0;
exports.pickRandom = () => {
    const arr = [
        "¯\\_(ツ)_/¯",
        "Hey there! I'm using whatsapp",
        "Busy, Can't talk",
        "How are you?",
        "What up?",
    ];
    return arr[Math.floor(Math.random() * arr.length)];
};
//# sourceMappingURL=pickRandom.js.map