"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var post_controller_1 = __importDefault(require("../controllers/post.controller"));
var auth_middleware_1 = require("../middlewares/auth.middleware");
var userAuth_middleware_1 = require("../middlewares/userAuth.middleware");
var postrouter = (0, express_1.Router)();
var postController = new post_controller_1.default();
postrouter.get('/post/:id', postController.findById);
postrouter.get('/posts', postController.findAll);
postrouter.post('/posts/create', auth_middleware_1.adminAuth, postController.create);
postrouter.put('/posts/update/:id', auth_middleware_1.adminAuth, postController.update);
postrouter.delete('/posts/delete/:id', auth_middleware_1.adminAuth, postController.delete);
postrouter.post('/like/:id', userAuth_middleware_1.auth, postController.toggleLike);
exports.default = postrouter;
