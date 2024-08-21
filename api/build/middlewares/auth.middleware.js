"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var adminAuth = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, 'jwtkey');
        if (decoded.isAdmin) {
            req.admin = decoded; // Optionally attach the decoded payload to the request object
            next();
        }
        else {
            res.status(403).json({ message: 'Forbidden: Requires admin access' });
        }
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.adminAuth = adminAuth;
