"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = () => {
    discord_js_1.Structures.extend('Message', (Message) => class extends Message {
        em(content) {
            return this.channel.send(new discord_js_1.MessageEmbed().setDescription(content));
        }
    });
};
