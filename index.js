const {ChatClient} = require('@kararty/dank-twitch-irc')
const fs = require('node:fs');
const path = require('node:path');

const client = new ChatClient({
	username:'bittymoth',
	password:'7c5ajupq1vzzwh756cqgqvvwt553af',
	// password:'a7riysc4qfugf7zmc66gmizkvz6oov',
	rateLimits:'default'
})
client.cmd = new Map();

client.on('ready', ()=>{
	genCommands();
	console.log(`Bittymoth is online!~ :3c`);
});

client.on('PRIVMSG', async (msg)=>{
	if(msg.senderUsername==='bittymoth')return;
	if(!msg.messageText.startsWith(']'))return;
	console.log(msg);
	const args = msg.messageText.slice(1).split(' ');
	const command = args[0];
	let cmd = client.cmd.get(command);
	if(!cmd) {
		let realCmd;
		// console.log(client.cmd.values())
		client.cmd.forEach(c=>{
			for(const alias of c.data.aliases){
				console.log(alias);
				console.log(c.data.aliases);
				if(command===alias) {
					realCmd = c;
					break;
				}
			}
		})
		if(!realCmd) return;
		realCmd.run(client,msg);
		return;
	}
	cmd.run(client, msg);
});

function genCommands(){
	const cmdsPath = path.join(__dirname,'commands');
	const cmds = fs.readdirSync(cmdsPath);
	for(const file of cmds){
		const cmdPath = path.join(cmdsPath,file);
		const cmd = require(cmdPath);
		if('data' in cmd && 'run' in cmd) {
			client.cmd.set(cmd.data.name, cmd);
			console.log(`[INFO]: Command ${cmd.data.name} was loaded.`);
		}
		else console.warn(`[WARNING]: Command ${cmd} lacks a 'data' or 'run' parameter, and was not added to the command map.`);
    }
}

client.connect();
client.join('neomothdev');
client.join('bittymoth');