module.exports = {
	data:{
		name:'help',
		description:'Link to commands page.',
		aliases:['h','commands','cmd']
	},async run(client, e){
		client.me(e.channelName,'You can find a list of commands at https://bot.neomoth.dev');
	}
}