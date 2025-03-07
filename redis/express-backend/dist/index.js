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
const redis_1 = require("redis");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = (0, redis_1.createClient)();
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //a user would ideally send
    //problemId
    //userId
    //code
    //language in which the code was written
    const { problemId, userId, code, language } = req.body;
    //push this to a database, in ideal cases ---> Not doing this here though
    try {
        //Push the payload into a Redis queue called submissions
        //from the left (lPush)
        yield client.lPush("submission", JSON.stringify({
            problemId,
            userId,
            code,
            language,
        }));
        res.json({
            message: "Submission received.",
        });
    }
    catch (error) {
        console.error("Submission not received: ", error);
    }
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis");
            app.listen(3000, () => {
                console.log("Server running @PORT:3000");
            });
        }
        catch (error) {
            console.error("Error occurred while connecting: ", error);
        }
    });
}
startServer();
