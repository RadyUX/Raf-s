"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var user_repository_1 = __importDefault(require("./repository/user.repository"));
var user_controller_1 = __importDefault(require("./controllers/user.controller"));
var auth_route_1 = __importDefault(require("./routes/auth.route"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var post_route_1 = __importDefault(require("./routes/post.route"));
var cors_1 = __importDefault(require("cors"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var app = (0, express_1.default)();
var PORT = 8000;
app.use(express_1.default.json());
app.listen(PORT, function () {
    console.log("Connected at http://localhost:".concat(PORT));
    db_1.default;
});
var userController = new user_controller_1.default();
var userRepo = new user_repository_1.default();
app.use((0, cors_1.default)());
// Define the storage configuration
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var uploadPath = path_1.default.join(__dirname, '../../client/public/upload');
        // Ensure the upload directory exists (creates if doesn't)
        fs_1.default.mkdir(uploadPath, { recursive: true }, function (err) {
            if (err) {
                return null;
            }
            else {
                cb(null, uploadPath);
            }
        });
    },
    filename: function (req, file, cb) {
        // You could also customize the file naming convention here
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
// Initialize multer with the storage configuration
var upload = (0, multer_1.default)({ storage: storage });
app.post('/api/upload', upload.single('file'), function (req, res) {
    var file = req.file;
    res.status(200).json(file === null || file === void 0 ? void 0 : file.filename);
});
app.use('/', auth_route_1.default);
app.use('/', user_route_1.default);
app.use('/', post_route_1.default);
/*async function exampleUsage() {
  try {
      const newUser = {
          
          name: 'michel Doe',
          email: 'michszzzssel@example.com',
          password: 'securepassword',
          avatar: 'path/to/avatar.jpg'
      };
      const user = await userRepo.create(newUser);
      console.log("Created User:", user);
  } catch (error) {
      console.error("Error creating user:", error);
  }
}

exampleUsage();
  */ 
