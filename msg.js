/* Msg v3.3.1 https://github.com/madprops/Msg */

var Msg = (function()
{
	var num_instances = 0;

	var css = "";

	css += "<style>";
	css += ".Msg-overflow-hidden{overflow:hidden}";
	css += "<style>";

	document.querySelector('head').innerHTML += css;

	var factory = function(params={})
	{
		var instance = {};

		instance.params = params;

		instance.check_params = function()
		{
			if(instance.params.id === undefined)
			{
				instance.params.id = num_instances + 1;
			}

			if(instance.params.lock === undefined)
			{
				instance.params.lock = true;
			}
		}

		instance.check_params();

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

			instance.overlay.style.display = 'none';
			instance.container.style.display = 'none';
			
			instance.overlay.style.zIndex = -1000;
			instance.container.style.zIndex = -1000;

			if(instance.num_open() === 0)
			{
				document.body.classList.remove('Msg-overflow-hidden');
			}
		}

		instance.set = function(html)
		{
			if(html !== undefined)
			{
				instance.create();

				if(typeof html === "object")
				{
					if(html instanceof Element)
					{
						instance.content.innerHTML = html.outerHTML;	
					}
				}

				else
				{
					instance.content.innerHTML = html;
				}
			}
		}	

		instance.show = function(html)
		{
			instance.create();

			if(html !== undefined)
			{
				instance.set(html);
			}			

			if(instance.is_open())
			{
				var zIndex = Math.max(50000000, instance.highest_zIndex());

				if(zIndex > instance.container.style.zIndex)
				{
					instance.overlay.style.zIndex = zIndex + 1;
					instance.container.style.zIndex = zIndex + 2;
				}
			}

			else
			{
				var zIndex = Math.max(50000000, instance.highest_zIndex());

				instance.overlay.style.zIndex = zIndex + 1;
				instance.container.style.zIndex = zIndex + 2;
				
				instance.overlay.style.display = 'block';
				instance.container.style.display = 'block';				

				if(instance.params.lock)
				{
					document.body.classList.add('Msg-overflow-hidden');
				}
			}

			instance.container.scrollTop = 0;
			instance.content.focus();
		}

		instance.create = function()
		{
			if(instance.created())
			{
				return;
			}

			if(document.getElementById('Msg-container-' + instance.params.id) !== null)
			{
				instance.overlay = document.getElementById('Msg-overlay-' + instance.params.id);
				instance.container = document.getElementById('Msg-container-' + instance.params.id);
				instance.content = document.getElementById('Msg-content-' + instance.params.id);

				return;				
			}

			var style1 = "";

			style1 += "position:fixed; ";
			style1 += "top:0; ";
			style1 += "left:0; ";
			style1 += "height:100%; ";
			style1 += "width:100%; ";
			style1 += "background-color:rgba(0, 0, 0, 0.7); ";
			style1 += "z-index:-1000; ";
			style1 += "display:none;";

			var style2 = "";

			style2 += "position:fixed; ";
			style2 += "left:50%; ";
			style2 += "top:50%; ";
			style2 += "max-height:80vh; ";
			style2 += "transform:translate(-50%, -50%); ";
			style2 += "overflow:auto; ";
			style2 += "overflow-x:hidden; ";
			style2 += "overflow-y:auto; ";
			style2 += "outline:0; ";
			style2 += "z-index:-1000; ";
			style2 += "display:none;";

			var style3 = "";
			
			style3 += "color:black; ";
			style3 += "background-color:white; ";
			style3 += "font-size:23.8px; ";
			style3 += "font-family:sans-serif; ";
			style3 += "text-align:center; ";
			style3 += "padding:1.6em;";

			var overlay_html = "<div class='Msg-overlay' style='" + style1 + "' id='Msg-overlay-" + instance.params.id + "'></div>";
			var container_html = "<div class='Msg-container' style='" + style2 + "' id='Msg-container-" + instance.params.id + "'></div>";
			var content_html = "<div class='Msg-content' style='" + style3 + "' id='Msg-content-" + instance.params.id + "'></div>";

			document.body.insertAdjacentHTML('beforeend', overlay_html);
			document.body.insertAdjacentHTML('beforeend', container_html);

			instance.overlay = document.getElementById('Msg-overlay-' + instance.params.id);
			instance.container = document.getElementById('Msg-container-' + instance.params.id);

			instance.container.insertAdjacentHTML('beforeend', content_html);

			instance.content = document.getElementById('Msg-content-' + instance.params.id);

			instance.overlay.addEventListener("click", function()
			{
				instance.close();
			});	
		}

		instance.recreate = function()
		{
			instance.destroy();
			instance.create();
		}

		instance.destroy = function()
		{
			if(instance.created())
			{
				instance.close();

				document.body.removeChild(instance.overlay);
				document.body.removeChild(instance.container);

				instance.overlay = undefined;
				instance.container = undefined;
				instance.content = undefined;			
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

		instance.num_open = function()
		{
			var num_open = 0;

			var containers = Array.from(document.querySelectorAll('.Msg-container'));

			for(var i=0; i<containers.length; i++)
			{
				if(containers[i].style.display !== 'none')
				{
					num_open += 1;
				}
			}

			return num_open;
		}

		instance.highest_zIndex = function()
		{
			var highest = -2000;

			var containers = Array.from(document.querySelectorAll('.Msg-container'));

			for(var i=0; i<containers.length; i++)
			{
				var zIndex = containers[i].style.zIndex;

				if(zIndex > highest)
				{
					highest = zIndex;
				}
			}

			return parseInt(highest);
		}

		instance.num_instances = function()
		{
			return num_instances;
		}

		num_instances += 1;

		return instance;	
	}

	return factory;
}());