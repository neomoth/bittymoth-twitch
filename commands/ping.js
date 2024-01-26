module.exports ={
	data:{
		name:'ping',
		description:'Test bot response time',
		aliases:['p']
	},
	async run(client, e, args){
		client.privmsg(e.channelName, `Pong!`);
	}
}