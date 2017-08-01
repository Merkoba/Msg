call uglifyjs .\docs\msg.js --compress --mangle --comments all --output .\dist\msg-min.js
call xcopy .\docs\msg.js .\dist\ /Y
