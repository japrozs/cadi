"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickRandom = void 0;
exports.pickRandom = () => {
    const arr = [
        "¯\\_(ツ)_/¯",
        "Hey there! I am using cadi",
        "Busy, Cant talk",
        "How are you?",
        "What up?",
    ];
    return arr[Math.floor(Math.random() * arr.length)];
};
//# sourceMappingURL=pickRandom.js.map