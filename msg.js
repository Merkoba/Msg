/*Msg v2.2.1*/

var Msg = function(id)
{
	var instance = {};

	instance.html = '';

	check_params();

	function check_params()
	{
		if(id === undefined)
		{
			instance.id = 'default';
		}

		else
		{
			instance.id = id;
		}
	}

	instance.close = function()
	{
		var overlay = document.getElementById('Msg-overlay-' + instance.id);
		var msg = document.getElementById('Msg-container-' + instance.id);
		msg.style.display = 'none';
		overlay.style.display = 'none';
	}

	instance.set = function(html)
	{
		instance.html = html;
	}	

	instance.show = function(html)
	{
		var msg = document.getElementById('Msg-container-' + instance.id);

		if(msg === null)
		{
			instance.create();
			msg = document.getElementById('Msg-container-' + instance.id);
		}

		var overlay = document.getElementById('Msg-overlay-' + instance.id);

		if(html !== undefined)
		{
			instance.html = html;
		}

		msg.innerHTML = instance.html;

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
		style1 += "background-color: white;";
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

		var overlay_html = "<div class='Msg-overlay' style='" + style2 + "' id='Msg-overlay-" + instance.id + "'></div>";
		var msg_html = "<div class='Msg-container' style='" + style1 + "' id='Msg-container-" + instance.id + "'></div>";

		document.body.insertAdjacentHTML('beforeend', overlay_html);
		document.body.insertAdjacentHTML('beforeend', msg_html);

		var overlay = document.getElementById('Msg-overlay-' + instance.id);

		overlay.addEventListener("click", function()
		{
			instance.close();
		});		
	}

	instance.is_open = function()
	{
		var msg = document.getElementById('Msg-container-' + instance.id);

		if(msg === null || msg.style.display === 'none')
		{
			return false;
		}

		else
		{
			return true;
		}
	}

	instance.any_open = function()
	{
		var containers = Array.from(document.querySelectorAll('.Msg-container'));

		for(var i=0; i<containers.length; i++)
		{
			if(containers[i].style.display !== 'none')
			{
				return true;
			}
		}

		return false;
	}

	return instance;	
}