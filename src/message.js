const { self_id } = require('../config.json');

module.exports = class Message {

    constructor(message) {
        this.obj = message;
        this.author = message.author;
    }

    async send(string) {
        if (this.obj.author.id == self_id) {
            this.obj = await this.obj
                .edit(`${this.author}, ${string}`);
        } else {
            this.obj = await this.obj.reply(string);
        }
    }

    async embed(embed) {
        if (this.obj.author.id == self_id) {
            this.obj = await this.obj
                .edit(embed);
        } else {
            this.obj = await this.obj.channel.send(embed);
        }
    }

    async sendNew(message) {
        this.obj = await this.obj.channel.send(message);
    }

}