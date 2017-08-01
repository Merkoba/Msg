call uglifyjs .\dist\msg.js --compress --mangle --output .\dist\msg-min.js
call xcopy .\dist\msg-min.js .\docs\ /Y
