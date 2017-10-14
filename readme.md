Run script using

Run tests using npm test

Problem description
---
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

```
$ tail -f mylogfile | myscript --verbose


