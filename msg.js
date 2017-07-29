/*Msg v2.6.8*/

var Msg = function(id='default')
{
	var instance = {};

	instance.id = id;

	instance.created = function()
	{
		if(instance.container === undefined)
		{
			return false;
		}

		return true;
	}

	instance.close = function()
	{
		if(!instance.created())
		{
			return;
		}

		instance.container.style.display = 'none';
		instance.overlay.style.display = 'none';
	}

	instance.set = function(html)
	{
		instance.create();
		instance.content.innerHTML = html;
	}	

	instance.show = function(html)
	{
		instance.create();

		if(html !== undefined)
		{
			instance.content.innerHTML = html;
		}

		instance.container.style.display = 'block';
		instance.overlay.style.display = 'block';
		instance.container.scrollTop = 0;
		instance.content.focus();
	}

	instance.create = function()
	{
		if(instance.created())
		{
			return;
		}

		var style1 = "";

		style1 += "position: fixed;";
		style1 += "height: 100%;";
		style1 += "width: 100%;";
		style1 += "top: 0;";
		style1 += "left: 0;";
		style1 += "z-index: 49939959;";
		style1 += "background-color: rgba(0, 0, 0, 0.7);";
		style1 += "display: none;";

		var style2 = "";

		style2 += "position: fixed;";
		style2 += "left: 50%;";
		style2 += "top: 50%;";
		style2 += "transform: translate(-50%, -50%);";
		style2 += "overflow: auto;";
		style2 += "max-height: 80vh;";
		style2 += "overflow-x: hidden;";
		style2 += "overflow-y: auto;";
		style2 += "display: none;";
		style2 += "z-index: 499399259;";
		style2 += "outline: 0;"

		var style3 = "";
		
		style3 += "color: black;";
		style3 += "background-color: white;";
		style3 += "font-size: 23.8px;";
		style3 += "font-family: sans-serif;";
		style3 += "text-align: center;";
		style3 += "padding: 1.6em;";

		var overlay_html = "<div class='Msg-overlay' style='" + style1 + "' id='Msg-overlay-" + instance.id + "'></div>";
		var container_html = "<div class='Msg-container' style='" + style2 + "' id='Msg-container-" + instance.id + "'></div>";
		var content_html = "<div class='Msg-content' style='" + style3 + "' id='Msg-content-" + instance.id + "'></div>";

		document.body.insertAdjacentHTML('beforeend', overlay_html);
		document.body.insertAdjacentHTML('beforeend', container_html);

		instance.overlay = document.getElementById('Msg-overlay-' + instance.id);
		instance.container = document.getElementById('Msg-container-' + instance.id);

		instance.container.insertAdjacentHTML('beforeend', content_html);

		instance.content = document.getElementById('Msg-content-' + instance.id);

		instance.overlay.addEventListener("click", function()
		{
			instance.close();
		});	

		instance.overlay.addEventListener("wheel", instance.on_overlay_wheel);

		instance.container.addEventListener("wheel", instance.on_container_wheel);
	}

	instance.on_overlay_wheel = function(e)
	{
		if(e.ctrlKey)
		{
			return;
		}

		e.preventDefault();
		e.stopPropagation();
	}		

	instance.on_container_wheel = function(e)
	{
		if(e.ctrlKey)
		{
			return;
		}

		var target = e.target;

		if(e.target !== instance.content)
		{
			if(e.target.scrollHeight <= e.target.clientHeight)
			{
				if(e.target.parentElement === instance.content)
				{
					target = e.target.parentElement;
				}
			}

			else
			{
				if(e.deltaY > 0)
				{
					if((e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) > 1)
					{
						return;
					}

					else
					{
						e.preventDefault();
						e.stopPropagation();
					}
				}

				else
				{
					if(e.target.scrollTop > 0)
					{
						return;
					}

					else
					{
						e.preventDefault();
						e.stopPropagation();
					}
				}	
			}
		}

		if(e.deltaY > 0)
		{
			if((target.parentElement.scrollHeight - target.parentElement.scrollTop - target.parentElement.clientHeight) <= 1)
			{
				e.preventDefault();
				e.stopPropagation();					
			}
		}

		else
		{
			if(target.parentElement.scrollTop <= 0)
			{
				e.preventDefault();
				e.stopPropagation();
			}
		}
	}

	instance.is_open = function()
	{
		if(!instance.created() || instance.container.style.display === 'none')
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