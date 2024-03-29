"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const userRouter_1 = __importDefault(require("./router/userRouter"));
const mainApp = (app) => {
    try {
        app.use("/", userRouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Congratulations",
                    status: 200,
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error",
                    status: 404,
                });
            }
        });
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
