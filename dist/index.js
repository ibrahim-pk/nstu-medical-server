"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./shared/logger");
const dotenv_1 = __importDefault(require("dotenv"));
process.on('uncaughtException', error => {
    logger_1.errorlogger.error(error);
    process.exit(1);
});
dotenv_1.default.config();
let server;
async function run() {
    try {
        await mongoose_1.default.connect(process.env.mongo_url);
        // logger.info(`🛢   Database is connected successfully`);
        console.log(`🛢   Database is connected successfully`);
        server = app_1.default.listen(process.env.PORT, () => {
            // logger.info(`Application  listening on port ${config.port}`);
            console.log(`Application  listening on port ${process.env.PORT}`);
        });
    }
    catch (err) {
        logger_1.errorlogger.error('Failed to connect database', err);
    }
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                logger_1.errorlogger.error(error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
}
run();
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM is received');
    if (server) {
        server.close();
    }
});
