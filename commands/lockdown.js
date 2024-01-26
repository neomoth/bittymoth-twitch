const global = require('../globalvars');
module.exports = {
	data:{
		name:'lockdown',
		description:'Toggle lockdown: Prevent anybody from using the bot besides developer.',
		aliases:['ld']
	},async run(client, e, args){
		if(e.senderUsername!=='neomothdev')return;
		global.lockdown=true;
	}
}