let startTime, endTime;
function start(){
	startTime = new Date();
}
function end(){
	endTime = new Date();
	let timeDiff = endTime - startTime; // ms
	timeDiff/=1000;
	return timeDiff;
}

module.exports ={
	data:{
		name:'ping',
		description:'Test bot response time',
		aliases:['p']
	},
	async run(client, e){
		start();
		client.privmsg(e.channelName, `Pong!`);
	}
}