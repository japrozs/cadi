import Routes from "./src/Routes";

import { Platform } from "react-native";

const noGlow = `
textarea, select, input, button {
	-webkit-appearance: none;
	outline: none!important;
}
textarea:focus, select:focus, input:focus, button:focus {
	-webkit-appearance: none;
	outline: none!important;
}
`;

export const injectWebCss = () => {
    // Only on web
    if (!(Platform.OS == "web")) return;

    // Inject style
    const style = document.createElement("style");
    style.textContent = `textarea, select, input { outline: none!important; }`;
    return document.head.append(style);
};

// 👉 And this in the App.js file
injectWebCss();

export default Routes;
