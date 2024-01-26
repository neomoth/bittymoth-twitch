require('dotenv').config();
const global = require('./globalvars');
const axios = require('axios');
const {ChatClient} = require('@kararty/dank-twitch-irc')
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const client = new ChatClient({
	username:'bittymoth',
	password:process.env.OAUTH,
	rateLimits:'default'
})
client.cmd = new Map();

client.on('ready', ()=>{
	genCommands();
	console.log(`Bittymoth is online!~ :3c`);
});

client.on('PRIVMSG', async (msg)=>{
	if(global.lockdown&&msg.senderUsername!=='neomothdev')return; // return immediately if not dev
	if(msg.senderUsername==='bittymoth')return;
	if(!msg.messageText.startsWith(']'))return;
	const args = msg.messageText.slice(1).split(' ');
	const command = args[0];
	let cmd = client.cmd.get(command);
	if(!cmd) {
		let realCmd;
		// console.log(client.cmd.values())
		client.cmd.forEach(c=>{
			for(const alias of c.data.aliases){
				if(command===alias) {
					realCmd = c;
					break;
				}
			}
		})
		if(!realCmd) return;
		realCmd.run(client,msg, args);
		return;
	}
	cmd.run(client, msg, args);
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

client.refresh = refreshToken;

client.refreshInterval = setInterval(refreshToken,10*60*5000);

async function refreshToken() {
	await axios.post('https://id.twitch.tv/oauth2/token', `grant_type=refresh_token&refresh_token=${encodeURI(process.env.REFRESH)}&client_id=22j725gh2t8posp2elujajz0qjiueg&client_secret=${process.env.CLIENT_SECRET}`, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then((resp) => {
		console.log(`[INFO]: Got new token: ${resp.data.access_token}. Got new refresh token: ${resp.data.refresh_token}`);
		setEnvValue('OAUTH', resp.data.access_token);
		setEnvValue('REFRESH', resp.data.refresh_token);
	}).catch((err) => {
		console.error(`[ERROR]: An error occurred during the token refresh: ${err.toString()}`);
	});
}

function setEnvValue(key, value) {
	const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);
	const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
		return line.match(new RegExp(key));
	}));
	ENV_VARS.splice(target, 1, `${key}=${value}`);
	fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
}

client.connect();
client.join('neomothdev');
client.join('bittymoth');
client.join('weest');