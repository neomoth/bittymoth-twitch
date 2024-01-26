const global = require('../globalvars');
module.exports = {
	data:{
		name:'lockdown',
		description:'Toggle lockdown: Prevent anybody from using the bot besides developer.',
		aliases:['ld']
	},async run(client, e, args){
		if(e.senderUsername!=='neomothdev')return;
		if(args[1]===null||args[1]===' '||(args[1]!=='false'&&args[1]!=='true')){
			global.lockdown=!global.lockdown;
			client.privmsg(e.channelName, `/me Bot lockdown status toggled to ${global.lockdown}`);
			return;
		}
		if(args[1]==='false'){
			global.lockdown=false;
			client.privmsg(e.channelName, `/me Bot is no longer on lockdown`);
			return;
		}
		if(args[1]==='true'){
			global.lockdown=true;
			client.privmsg(e.channelName,`/me Bot is now on lockdown!`);
		}
	}
}