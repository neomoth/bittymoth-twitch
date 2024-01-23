module.exports = {
	data:{
		name:'reloadtoken',
		description:'Force a refresh of the bot token',
		aliases:['rt']
	},async run(client,e){
		if(e.senderUsername!=='neomothdev') return;
		client.refresh();
	}
}