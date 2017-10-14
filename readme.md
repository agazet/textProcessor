**Usage example**  
(based on Linux OS, tested on Elementary OS): 

- run the script from project directory    
``` $ ./runTextProcessor.sh ```   
Note: if you have no rigts to execute the file run   
``` $ chmod u+x runTextProcessor.sh``` 

- or simply from command line:  
``` $ ping www.google.com >> /tmp/pingGoogle.log | tail -f /tmp/pingGoogle.log | node textProcessor/runTextProcessor.js ```

- from runTextProcessor.js directory  
``` $ ping www.google.com >> pingGoogle.log | tail -f pingGoogle.log | node runTextProcessor.js ```

**Running tests**

``` $ npm test ```

*Note*:
Tests can by also run using node & /test/testRunner.js but then the modules paths have to be adjusted as below:

- in textReaderTest.js:   
```javascript
const TextReader = require(path.resolve('../textReader/textReader')); //to run from test directory using <<node testRunner.js>> path has to be changed  
```
- in textStatisticsTest.js
```javascript
const TextStatistics = require(path.resolve('../textReader/textStatistics')); //to run from test directory using <<node testRunner.js>> path has to be changed
```

---
**Problem description**

- Try to avoid using third-party modules
- Stick to node.js core APIs
- Write a test to confirm your module works correctly

Create a duplex stream that consume line-separated text and
outputs objects with keys for the elapsed time, total length
in bytes, and total lines.

Create a stream that takes these objects and outputs
one-line summary reports (human readable). The report should
include the throughput rate of the input stream in bytes/sec.

Use your new streams in a script that reads stdin (such as tailing
a log file) and report on the number of lines and growth rate of
the file. Bonus points if your script is configurable in some way
via `argv` (use your imagination).

Imagine a usage like this:  
``` $ tail -f mylogfile | myscript --verbose ```