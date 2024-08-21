"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("../controllers/auth"));
var authrouter = (0, express_1.Router)();
var authController = new auth_1.default();
authrouter.post('/login', authController.login);
authrouter.post('/logout', authController.logout);
exports.default = authrouter;
