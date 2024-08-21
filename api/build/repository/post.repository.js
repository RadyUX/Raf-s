"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var db_1 = __importDefault(require("../db"));
//fonction pour un format de date accepter par mySQL
function formatDateToMySQL(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
var PostRepository = /** @class */ (function () {
    function PostRepository() {
    }
    PostRepository.prototype.toggleLike = function (postId, userId, like) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(postId, userId, like);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // Vérifier si l'utilisateur a déjà aimé le post
                        var checkLikeSql = "SELECT * FROM post_likes WHERE post_id = ? AND user_id = ?";
                        db_1.default.query(checkLikeSql, [postId, userId], function (err, data) {
                            if (err) {
                                return reject(err);
                            }
                            if (data && data.length !== undefined && data.length === 0 && like) {
                                // Liker le post s'il n'est pas déjà liké
                                var incrementLikeSql = "UPDATE posts SET like_count = like_count + 1 WHERE id = ?";
                                db_1.default.query(incrementLikeSql, [postId]);
                                var insertLikeSql = "INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)";
                                db_1.default.query(insertLikeSql, [postId, userId], function (err) {
                                    if (err) {
                                        return reject(err);
                                    }
                                    resolve(true); // Succès : post liké
                                });
                            }
                            else if (data && data.length !== undefined && data.length > 0 && !like) {
                                // Unliker le post s'il est déjà liké
                                var decrementLikeSql = "UPDATE posts SET like_count = like_count - 1 WHERE id = ?";
                                db_1.default.query(decrementLikeSql, [postId]);
                                var deleteLikeSql = "DELETE FROM post_likes WHERE post_id = ? AND user_id = ?";
                                db_1.default.query(deleteLikeSql, [postId, userId], function (err) {
                                    if (err) {
                                        return reject(err);
                                    }
                                    resolve(true); // Succès : post unliké
                                });
                            }
                            else {
                                resolve(false); // Aucune opération nécessaire
                            }
                        });
                    })];
            });
        });
    };
    PostRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var sql = "SELECT * FROM posts WHERE id = ?";
                        db_1.default.query(sql, [id], function (err, data) {
                            if (err) {
                                console.error("Database error:", err);
                                return reject(err);
                            }
                            if (data.length > 0) {
                                var post = {
                                    id: data[0].id,
                                    title: data[0].title,
                                    content: data[0].content,
                                    category: data[0].category,
                                    image: data[0].image,
                                    created_at: data[0].created_at,
                                    updated_at: data[0].updated_at,
                                    admin_id: data[0].admin_id,
                                    like_count: data[0].like_count
                                };
                                resolve(post);
                            }
                            else {
                                console.log("Post not found:", data);
                                resolve(null);
                            }
                        });
                    })];
            });
        });
    };
    PostRepository.prototype.findAll = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var sql = category ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts";
                        var queryValues = category ? [category] : [];
                        db_1.default.query(sql, queryValues, function (err, data) {
                            if (err) {
                                return reject(err);
                            }
                            // Map the result set to Post array
                            var posts = data.map(function (row) { return ({
                                id: row.id,
                                title: row.title,
                                content: row.content,
                                category: row.category,
                                image: row.image,
                                created_at: row.created_at,
                                updated_at: row.updated_at,
                                admin_id: row.admin_id,
                                like_count: row.like_count
                            }); });
                            resolve(posts);
                        });
                    })];
            });
        });
    };
    PostRepository.prototype.create = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var sql = "INSERT INTO posts (`title`, `content`, `category`,`image`, `created_at`, `updated_at`, `admin_id`,`like_count` ) VALUES (?,?,?, ?, ?, ?, ?,?)";
                        var values = [post.title, post.content, post.category, post.image, formatDateToMySQL(new Date(post.created_at)), formatDateToMySQL(new Date(post.updated_at)), post.admin_id, post.like_count];
                        db_1.default.query(sql, values, function (err, result) {
                            if (err) {
                                return reject(err);
                            }
                            var newPost = __assign(__assign({}, post), { id: result.insertId });
                            resolve(newPost);
                        });
                    })];
            });
        });
    };
    PostRepository.prototype.update = function (id, post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var sql = "UPDATE posts SET `title`=?, `content`=?, `category`=?, `image`=?, `updated_at`=?, `admin_id`=? WHERE `id`=?";
                        var values = [post.title, post.content, post.category, post.image, formatDateToMySQL(new Date(post.updated_at)), post.admin_id, id];
                        db_1.default.query(sql, values, function (err, result) {
                            if (err) {
                                return reject(err);
                            }
                            resolve(__assign(__assign({}, post), { created_at: post.created_at, id: Number(id) }));
                        });
                    })];
            });
        });
    };
    PostRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var deleteLikesSQL = "DELETE FROM post_likes WHERE post_id = ?";
                        var deletePostSQL = "DELETE FROM posts WHERE id = ?";
                        db_1.default.query(deleteLikesSQL, [id], function (err, result) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            db_1.default.query(deletePostSQL, [id], function (err, result) {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                if (result.affectedRows === 0) {
                                    resolve(false);
                                }
                                else {
                                    resolve(true);
                                }
                            });
                        });
                    })];
            });
        });
    };
    return PostRepository;
}());
exports.default = PostRepository;
