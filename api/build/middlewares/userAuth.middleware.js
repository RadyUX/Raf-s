"use strict";
// userauth.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, 'jwtkey');
        req.user = decoded; // Attachez les informations utilisateur à req.user
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.auth = auth;
