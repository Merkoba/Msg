call uglifyjs .\msg.js --compress --mangle --output .\msg-min.js
call xcopy .\msg.js .\docs\ /Y
