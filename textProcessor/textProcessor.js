const SUPPORTED_ACTIONS = ['log', 'verbose', 'help', 'logv']

module.exports.run = function (loggingOption){
	
	if(loggingOption[0]==="help"){
		showHelpInfo();
	} else {
		processStdin(loggingOption);
	}
	
}

module.exports.isSupported = function (loggingOption){
	const lop = loggingOption[0];
	return (SUPPORTED_ACTIONS.includes(lop)) || lop == null; 
}

function showHelpInfo(){
	console.log("node runTextProcessor.js [LOGGING MODE] [LOG DESTINATION]\n\n"
			+"Possible logging modes:\n"
			+"log -> log to file (default directory or LOG DESTINATION)\n"
			+"verbose -> log to console\n"
			+"logv -> log to console and to file (LOG DESTINATION or default if not specified)\n"
			+"help -> shows this message\n"
			+"Log file default path log/texProcessor.log"
	);
}

function processStdin(loggingOption){
	const TextReader = require('./textReader');
	const TextStatistics = require('./textStatistics');
	
	const textReader = new TextReader(loggingOption);
	const textStatistics = new TextStatistics(loggingOption);
	
	process.stdin.pipe(textReader).pipe(textStatistics).pipe(process.stdout);
}
