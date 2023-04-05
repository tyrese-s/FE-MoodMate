"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJournalEntries = exports.saveJournalEntry = exports.deleteQuote = exports.getAllQuotes = exports.saveQuote = exports.resetPassword = exports.requestResetCode = exports.updateUser = exports.loginUser = exports.signupUser = exports.getGoogleVisionURL = exports.getSingleEmotion = exports.getEmotions = exports.getRandomZenQuote = void 0;
var axios_1 = require("axios");
// BASE URLS
var moodmateApi = axios_1.default.create({
    baseURL: "https://moodmate-api.onrender.com/api/v1",
});
var zenQuotesAPI = axios_1.default.create({
    // baseURL: "https://zenquotes.io/api/random/"
    baseURL: "https://zenquotes.io/api/today",
    // baseURL: "https://zenquotes.io/api/quotes"
});
var emotionsApi = axios_1.default.create({
    baseURL: "https://emotions-api-w230.onrender.com/api",
});
// ZEN QUOTES
var getRandomZenQuote = function (input) {
    return zenQuotesAPI.get(input).then(function (response) {
        var responseBody = response.data[0];
        return { quote: responseBody.q, author: responseBody.a };
    });
};
exports.getRandomZenQuote = getRandomZenQuote;
// EMOTIONS API
var getEmotions = function () {
    return emotionsApi.get("/v1/emotions").then(function (_a) {
        var data = _a.data;
        return data.emotions;
    });
};
exports.getEmotions = getEmotions;
var getSingleEmotion = function (emotion) {
    return emotionsApi.get("/v1/emotions/".concat(emotion)).then(function (_a) {
        var data = _a.data;
        return data.emotion;
    });
};
exports.getSingleEmotion = getSingleEmotion;
// GOOGLE VISION API
var getGoogleVisionURL = function () {
    return moodmateApi.get("/api-url").then(function (response) {
        var url = response.data.data.apiURL.substring(response.data.data.apiURL.indexOf("=") + 1);
        return url;
    });
};
exports.getGoogleVisionURL = getGoogleVisionURL;
// BACKEND API
// AUTH
var signupUser = function (data) {
    return moodmateApi.post("/users/signup", data).then(function (response) {
        return response.data;
    });
};
exports.signupUser = signupUser;
var loginUser = function (data) {
    return moodmateApi
        .post("/users/login", data)
        .then(function (response) {
        return response.data;
    })
        .catch(function (error) { return console.error(error); });
};
exports.loginUser = loginUser;
var updateUser = function (data, userToken) {
    return moodmateApi
        .patch("/users/updateMe", data, {
        headers: {
            Authorization: "Bearer ".concat(userToken),
        },
    })
        .then(function (response) {
        console.log(response);
        // return response.data;
    })
        .catch(function (error) { return console.error(error); });
};
exports.updateUser = updateUser;
var requestResetCode = function (data) {
    return moodmateApi
        .post("/users/forgotPassword", data)
        .then(function (response) {
        console.log(response.data);
        // return response.data.data.user;
    })
        .catch(function (error) { return console.error(error); });
};
exports.requestResetCode = requestResetCode;
var resetPassword = function (data) {
    return moodmateApi
        .patch("/users/resetPassword", data)
        .then(function (response) {
        return response.data.data.user;
    })
        .catch(function (error) { return console.error(error); });
};
exports.resetPassword = resetPassword;
// QUOTES
var saveQuote = function (quoteData, userToken) {
    return moodmateApi
        .post("/quotes/addQuote", quoteData, {
        headers: {
            Authorization: "Bearer ".concat(userToken),
        },
    })
        .then(function (response) {
        return response.data;
    })
        .catch(function (error) { return console.error(error); });
};
exports.saveQuote = saveQuote;
var getAllQuotes = function (userToken) {
    return moodmateApi
        .get("/quotes", {
        headers: {
            Authorization: "Bearer ".concat(userToken),
        },
    })
        .then(function (response) {
        return response.data;
    })
        .catch(function (error) { return console.error(error); });
};
exports.getAllQuotes = getAllQuotes;
var deleteQuote = function (quoteId, userToken) {
    return moodmateApi
        .delete("/quotes/".concat(quoteId), {
        headers: {
            Authorization: "Bearer ".concat(userToken),
        },
    })
        .then(function (response) {
        return response.data;
    })
        .catch(function (error) { return console.error(error); });
};
exports.deleteQuote = deleteQuote;
// JOURNAL
var saveJournalEntry = function (journalEntry, userToken) {
    return moodmateApi
        .post("/journal/entries", journalEntry, {
        headers: {
            Authorization: "Bearer ".concat(userToken),
        },
    })
        .then(function (response) {
        return response.data;
    })
        .catch(function (error) { return console.error(error); });
};
exports.saveJournalEntry = saveJournalEntry;
var getJournalEntries = function (date, userToken) {
    return moodmateApi
        .get("/journal/entries/".concat(date), {
        headers: {
            Authorization: "Bearer ".concat(userToken),
        },
    })
        .then(function (response) {
        return response.data.data.entries;
    })
        .catch(function (error) { return console.error(error); });
};
exports.getJournalEntries = getJournalEntries;
