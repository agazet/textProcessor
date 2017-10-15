#!/bin/bash

ping www.google.com >> /tmp/pingGoogle.log | tail -f /tmp/pingGoogle.log | node textProcessor/runTextProcessor.js log log/textProcessor.log
