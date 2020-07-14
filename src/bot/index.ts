require('dotenv').config({
	path: __dirname + '/../../.env'
});
const config = require('../../config.json');
import { Bot } from '../lib';

const type: 'dev' | 'prod' = process.env.TYPE as 'dev' | 'prod';
const bot = new Bot(config[type].token, type);

bot.botStart();
