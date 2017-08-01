call uglifyjs .\dist\msg.js --compress --mangle --comments all --output .\dist\msg-min.js
call xcopy .\dist\msg-min.js .\docs\ /Y
