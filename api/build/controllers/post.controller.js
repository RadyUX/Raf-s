"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_repository_1 = __importDefault(require("../repository/post.repository"));
var PostController = /** @class */ (function () {
    function PostController() {
        var _this = this;
        this.findById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var postId, post, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        postId = req.params.id;
                        return [4 /*yield*/, this.PostRepository.findById(postId)];
                    case 1:
                        post = _a.sent();
                        res.status(200).json(post);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(404).json({ message: error_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.findAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var category, posts, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        category = req.query.category;
                        return [4 /*yield*/, this.PostRepository.findAll(category)];
                    case 1:
                        posts = _a.sent();
                        res.status(200).json(posts);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).json({ message: err_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var post, newPost, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        post = {
                            title: req.body.title,
                            content: req.body.content,
                            category: req.body.category,
                            image: req.body.image,
                            created_at: new Date().toISOString(), // Assurez-vous que la date est bien formatée
                            updated_at: new Date().toISOString(), // Ajoutez updated_at si nécessaire
                            admin_id: req.body.admin_id, // Assurez-vous que admin_id est fourni
                            like_count: 0 // Initialiser like_count à 0 ou à une valeur par défaut
                        };
                        return [4 /*yield*/, this.PostRepository.create(post)];
                    case 1:
                        newPost = _a.sent();
                        res.status(201).json(newPost);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json({ message: error_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, post, updatedPost, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        post = {
                            title: req.body.title,
                            content: req.body.content,
                            category: req.body.category,
                            image: req.body.image,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(), // Ajoutez updated_at si nécessaire
                            admin_id: req.body.admin_id, // Assurez-vous que admin_id est fourni
                        };
                        return [4 /*yield*/, this.PostRepository.update(id, post)];
                    case 1:
                        updatedPost = _a.sent();
                        if (updatedPost) {
                            res.status(200).json(updatedPost);
                        }
                        else {
                            res.status(404).json({ message: "Post not found" });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json({ message: error_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, success, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.PostRepository.delete(id)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            res.status(200).json({ message: 'Post deleted successfully' });
                        }
                        else {
                            res.status(404).json({ message: 'Post not found or not authorized' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(500).json({ message: error_4.message });
                        console.error("Erreur lors de la suppression du post:", error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.toggleLike = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var postId, userId, like, success, error_5;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        postId = req.params.id;
                        userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString();
                        like = req.body.like;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        if (!(typeof userId === 'string')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.PostRepository.toggleLike(postId, userId, like)];
                    case 2:
                        success = _c.sent();
                        console.log(like);
                        console.log(userId);
                        if (success) {
                            res.status(200).json({ message: 'Toggle like/unlike successful' });
                        }
                        else {
                            res.status(400).json({ message: 'Toggle like/unlike failed' });
                            console.log(like);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        // Gérer le cas où userId est undefined (par exemple, envoyer une réponse d'erreur)
                        res.status(400).json({ message: 'User ID not found or invalid' });
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _c.sent();
                        res.status(500).json({ message: error_5.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.PostRepository = new post_repository_1.default();
        this.findById = this.findById.bind(this);
        this.findAll = this.findAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
    }
    return PostController;
}());
exports.default = PostController;
