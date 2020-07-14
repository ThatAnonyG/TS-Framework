"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({
    path: __dirname + '/../../.env'
});
const config = require('../../config.json');
const lib_1 = require("../lib");
const type = process.env.TYPE;
const bot = new lib_1.Bot(config[type].token, type);
bot.botStart();
