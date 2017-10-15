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
	console.log("Script can be used with or without logging option\nPossible logging options:\n"
			+"log -> log to file (default directory)\n"
			+"log -> /log/file/path log to /log/file/path\n"
			+"verbose -> log to console\n"
			+"logv -> log to console and default directory\n"
			+"logv /log/file/path -> log to console and log to /log/file/path\n"
	);
}

function processStdin(loggingOption){
	const TextReader = require('./textReader');
	const TextStatistics = require('./textStatistics');
	
	const textReader = new TextReader(loggingOption);
	const textStatistics = new TextStatistics(loggingOption);
	
	process.stdin.pipe(textReader).pipe(textStatistics).pipe(process.stdout);
}
