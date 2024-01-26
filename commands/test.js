module.exports = {
	data:{
		name:'test',
		description:'various test commands',
		aliases:['t']
	},async run(client,e,args){
		if(args[1]){
			switch(args[1]){
				case 'namereplace':
					let string = 'testing parsing name block from text: `name`'
					string = string.replace('`name`',e.senderUsername);
					client.privmsg(e.channelName,string);
					return;
				default:
					client.privmsg(e.channelName,`${e.senderUsername} invalid test argument.`);
					return;
			}
		}
		client.privmsg(e.channelName, `${e.senderUsername} you need to provide a test argument.`);
	}
}