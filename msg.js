/*msgjs Version 1.0.0*/

var msgjs = function()
{
	var instance = {};

	instance.close = function()
	{
		var overlay = document.getElementById('msgjs-overlay');
		var msg = document.getElementById('msgjs-container');
		msg.style.display = 'none';
		overlay.style.display = 'none';
	}	

	instance.show = function(html)
	{
		var msg = document.getElementById('msgjs-container');

		if(msg === null)
		{
			instance.create();
			msg = document.getElementById('msgjs-container');
		}

		var overlay = document.getElementById('msgjs-overlay');

		msg.innerHTML = html;
		msg.style.display = 'block';
		overlay.style.display = 'block';
		msg.focus();
	}

	instance.create = function()
	{
		var style1 = "";

		style1 += "color: black;";
		style1 += "font-size: 23.8px;";
		style1 += "font-family: sans-serif;";
		style1 += "text-align: center;";
		style1 += "position: fixed;";
		style1 += "left: 50%;";
		style1 += "top: 50%;";
		style1 += "transform: translate(-50%, -50%);";
		style1 += "background: white;";
		style1 += "padding: 1.6em;";
		style1 += "overflow: auto;";
		style1 += "max-height: 80vh;";
		style1 += "overflow-x: hidden;";
		style1 += "overflow-y: auto;";
		style1 += "display: none;";
		style1 += "z-index: 499399259;";
		style1 += "outline: 0";

		var style2 = "";

		style2 += "height: 100%;";
		style2 += "width: 100%;";
		style2 += "top: 0;";
		style2 += "left: 0;";
		style2 += "position: fixed;";
		style2 += "z-index: 49939959;";
		style2 += "background-color: rgba(0, 0, 0, 0.7);";
		style2 += "display: none";

		var overlay_html = "<div style='" + style2 + "' id='msgjs-overlay'></div>";
		var msg_html = "<div style='" + style1 + "' id='msgjs-container'></div>";

		document.body.insertAdjacentHTML('beforeend', overlay_html);
		document.body.insertAdjacentHTML('beforeend', msg_html);

		var overlay = document.getElementById('msgjs-overlay');

		overlay.addEventListener("click", function()
		{
			instance.close();
		});		
	}

	instance.is_open = function()
	{
		var msg = document.getElementById('msgjs-container');

		if(msg === null || msg.style.display === 'none')
		{
			return false;
		}

		else
		{
			return true;
		}
	}

	return instance;	
}