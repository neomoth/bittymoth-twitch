module.exports = {
	data:{
		name:'reloadtoken',
		description:'Force a refresh of the bot token',
		aliases:['rt']
	},async run(client,e){
		client.refresh();
	}
}