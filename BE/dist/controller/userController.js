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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAll = exports.subForThreeMonth = exports.createUser = void 0;
const cron_1 = require("cron");
const moment_1 = __importDefault(require("moment"));
const userModel_1 = __importDefault(require("../model/userModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield userModel_1.default.create({
            email,
            plan: "free",
        });
        return res.status(201).json({
            message: "User Created",
            data: user,
        });
    }
    catch (error) {
        return error;
    }
});
exports.createUser = createUser;
const subForThreeMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const aheadTime = new Date().setMonth(new Date().getMonth() + 3);
        console.log(aheadTime);
        const momented = (0, moment_1.default)(aheadTime).format("L");
        const split = momented.split("/");
        const read = yield userModel_1.default.findOneAndUpdate({ email }, {
            planBegins: (0, moment_1.default)(new Date().getTime()).format("L"),
            planEnds: momented,
            plan: "bronze",
            expired: false,
        });
        const job = new cron_1.CronJob(`0 0 ${split[1]} ${split[0].replace(/0+$/, "")} *`, function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield userModel_1.default.findByIdAndUpdate(read === null || read === void 0 ? void 0 : read._id, { expired: true }, { new: true });
            });
        }, null, true, "America/Los_Angeles");
        return res.status(201).json({
            message: "Sub Plan for three months Created",
            data: read,
        });
    }
    catch (error) {
        return error;
    }
});
exports.subForThreeMonth = subForThreeMonth;
const searchAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(201).json({
            message: "Successfully search for all plans",
            data: user,
        });
    }
    catch (error) {
        return error;
    }
});
exports.searchAll = searchAll;
