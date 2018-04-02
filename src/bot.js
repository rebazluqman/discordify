const { token } = require('../config.json');
const { prefix } = require('../settings.json');
const { ping } = require('./util.js');
const embeds = require('./embeds.js');
const Message = require('./message.js');
const Player = require('./playback.js');
const Queue = require('./queue.js');
const Fetcher = require('./fetch.js');
const Discord = require('discord.js');

const client = new Discord.Client();
const q = new Queue();
const f = new Fetcher(q);
const pb = new Player(client, q);

client.on('ready', () => 
    console.log("I am ready!")
    // Refer to help command when available...
)

client.on('message', async message => {

    if (message.author.id === client.user.id) return;

    const args = message.content.trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    const p = command[0];
    command = command.slice(prefix.length);

    // Figure out a way to catch flags...
    message = new Message(message);
    
    if (p !== prefix) return;

    console.log(args);
    console.log(command);

    switch(command) {

        case 'help':
        case 'h':
            // ...
            break;

        case 'ping':
        case 'latency':
        case 'measure':
            message.embed(embeds.ping(client, 
                await ping(message)));
            break;

        case 'play':
        case 'song':
        case 's':
            const result = await f.get(args[0], message);
            if (!result) return;
            q.enqueue(result, args);
            if (!pb.playing) {
                const song = await q.dequeue();
                pb.playing = song;
                return message.embed(embeds.playing(song, q.peek()));
            }
            // return queued embed...
            break;

        case 'pause':
        case 'p':
            // ...
            break;

        case 'unpause':
        case 'resume':
            // ...
            break;
        
        case 'remaining':
        case 'next':
        case 'queue':
            // ...
            break;

        case 'skip':
            // ...
            break;

        case 'previous':
        case 'replay':
            // ...
            break;

        case 'recent':
        case 'history':
            // ...
            break;

        case 'volume':
        case 'v':
            // ...
            break;
            
        case 'end':
        case 'stop':
            // ...
            break;
        
        case 'reload':
            q = new Queue();
            f = new Fetcher();
            pb = new Playback();
            // ...
            break;
            
    }
});

client.login(token);