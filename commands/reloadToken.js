module.exports = {
	data:{
		name:'reloadtoken',
		description:'Force a refresh of the bot token',
		aliases:['rt']
	},async run(client,e, args){
		if(e.senderUsername!=='neomothdev') return;
		client.refresh();
		console.log(`[INFO]: regenerated token at ${new Date().toLocaleString()}`);
		client.me(e.channelName, `Successfully regenerated client token.`);
	}
}