'use strict';

const TextReader = require('./textReader');
const TextStatistics = require('./textStatistics');

const textReader = new TextReader();
const textStatistics = new TextStatistics();

process.stdin.pipe(textReader).pipe(textStatistics).pipe(process.stdout);