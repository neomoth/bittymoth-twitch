module.exports ={
	data:{
		name:'ping',
		description:'Test bot response time',
		aliases:['p']
	},
	async run(client, e){
		client.privmsg(e.channelName, `Pong!`);
	}
}