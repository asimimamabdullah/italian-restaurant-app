const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

export const googleTranslate = require("google-translate")(apiKey);

export const googleMap = process.env.REACT_APP_MAP_KEY;
