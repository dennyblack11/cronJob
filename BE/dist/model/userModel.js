"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
    },
    plan: {
        type: String,
        default: "free",
    },
    planBegins: {
        type: String,
        default: "0/0/0",
    },
    planEnds: {
        type: String,
        default: "0/0/0",
    },
    expired: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
