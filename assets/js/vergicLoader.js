let chatType = config['site.config.contact_methods.reactive.chat.type'];

if(chatType && chatType[0] === "VERGIC") {
	let s = document.createElement('script');
	s.src = config['site.config.contact_methods.reactive.chat.vergic.js.server.uri'][0] + config['site.config.contact_methods.reactive.chat.vergic.js.customer.key'][0] + '/engage.js';
	document.getElementsByTagName('body')[0].appendChild(s);
}
