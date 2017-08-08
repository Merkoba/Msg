/* Msg v4.8.0 https://github.com/madprops/Msg */

var Msg = (function()
{
	var instances = [];

	var css = `<style>
	.Msg-overflow-hidden{overflow:hidden}
	
	.Msg-inner-x-default:hover{background-color:#cacaca}
	.Msg-outer-x-default:hover{background-color:#424242}
	
	.Msg-overlay-blue{background-color:rgba(101, 107, 124, 0.7) !important}
	.Msg-content-blue{background-color:#4f84b8 !important;color:white !important}
	.Msg-inner-x-blue{background-color:#4f84b8 !important;color:white !important}
	.Msg-inner-x-blue:hover{background-color:#476b8f !important}
	
	.Msg-overlay-red{background-color:rgba(104, 64, 64, 0.7) !important}
	.Msg-content-red{background-color:#ca4e4e !important;color:white !important}
	.Msg-inner-x-red{background-color:#ca4e4e !important;color:white !important}
	.Msg-inner-x-red:hover{background-color:#9d4d4d !important}
	
	.Msg-overlay-green{background-color:rgba(136, 173, 148, 0.7) !important}
	.Msg-content-green{background-color:#58a564 !important;color:white !important}
	.Msg-inner-x-green{background-color:#58a564 !important;color:white !important}
	.Msg-inner-x-green:hover{background-color:#4e8456 !important}
	
	.Msg-overlay-black{background-color:rgba(0, 0, 0, 0.7) !important}
	.Msg-content-black{background-color:#2a2a2a !important;color:white !important}
	.Msg-inner-x-black{background-color:#2a2a2a !important;color:white !important}
	.Msg-inner-x-black:hover{background-color:#424242 !important}
	</style>`;

	document.querySelector("head").innerHTML += css;

	var factory = function(options={})
	{
		var instance = {};

		instance.close_enabled = true;
		instance.click_enabled = true;
		instance.keys_enabled = true;

		instance.options = options;

		instance.check_options = function()
		{
			if(instance.options.id === undefined)
			{
				instance.options.id = instances.length + 1;
			}

			if(instance.options.class === undefined)
			{
				instance.options.class = "default";
			}

			if(instance.options.lock === undefined)
			{
				instance.options.lock = true;
			}

			if(instance.options.close_on_overlay_click === undefined)
			{
				instance.options.close_on_overlay_click = true;
			}

			if(instance.options.enable_inner_x === undefined)
			{
				instance.options.enable_inner_x = true;
			}

			if(instance.options.inner_x_position === undefined)
			{
				instance.options.inner_x_position = "right";
			}

			if(instance.options.enable_outer_x === undefined)
			{
				instance.options.enable_outer_x = false;
			}

			if(instance.options.outer_x_position === undefined)
			{
				instance.options.outer_x_position = "right";
			}

			if(instance.options.close_on_escape === undefined)
			{
				instance.options.close_on_escape = true;
			}

			if(instance.options.clear_editables === undefined)
			{
				instance.options.clear_editables = false;
			}

			if(instance.options.before_show === undefined)
			{
				instance.options.before_show = function(){};
			}

			if(instance.options.after_show === undefined)
			{
				instance.options.after_show = function(){};
			}

			if(instance.options.before_set === undefined)
			{
				instance.options.before_set = function(){};
			}

			if(instance.options.after_set === undefined)
			{
				instance.options.after_set = function(){};
			}

			if(instance.options.before_close === undefined)
			{
				instance.options.before_close = function(){};
			}

			if(instance.options.after_close === undefined)
			{
				instance.options.after_close = function(){};
			}

			if(instance.options.before_toggle === undefined)
			{
				instance.options.before_toggle = function(){};
			}

			if(instance.options.after_toggle === undefined)
			{
				instance.options.after_toggle = function(){};
			}

			if(instance.options.before_create === undefined)
			{
				instance.options.before_create = function(){};
			}

			if(instance.options.after_create === undefined)
			{
				instance.options.after_create = function(){};
			}

			if(instance.options.before_destroy === undefined)
			{
				instance.options.before_destroy = function(){};
			}

			if(instance.options.after_destroy === undefined)
			{
				instance.options.after_destroy = function(){};
			}

			if(instance.options.temp_disable_close === undefined)
			{
				instance.options.temp_disable_close = false;
			}

			if(instance.options.temp_disable_close_delay === undefined)
			{
				instance.options.temp_disable_close_delay = 1000;
			}

			if(instance.options.autoclose === undefined)
			{
				instance.options.autoclose = false;
			}

			if(instance.options.autoclose_delay === undefined)
			{
				instance.options.autoclose_delay = 3000;
			}

			if(instance.options.temp_disable_click === undefined)
			{
				instance.options.temp_disable_click = false;
			}

			if(instance.options.temp_disable_click_delay === undefined)
			{
				instance.options.temp_disable_click_delay = 1000;
			}

			if(instance.options.temp_disable_keys === undefined)
			{
				instance.options.temp_disable_keys = false;
			}

			if(instance.options.temp_disable_keys_delay === undefined)
			{
				instance.options.temp_disable_keys_delay = 1000;
			}

			if(instance.options.persistent === undefined)
			{
				instance.options.persistent = true;
			}

			if(instance.options.fade_in === undefined)
			{
				instance.options.fade_in = true;
			}

			if(instance.options.fade_in_duration === undefined)
			{
				instance.options.fade_in_duration = 350;
			}

			if(instance.options.fade_out === undefined)
			{
				instance.options.fade_out = true;
			}

			if(instance.options.fade_out_duration === undefined)
			{
				instance.options.fade_out_duration = 350;
			}			
		}

		instance.check_options();

		instance.created = function()
		{
			if(instance.container === undefined)
			{
				return false;
			}

			return true;
		}

		instance.close = function(callback=false)
		{
			if(!instance.is_open())
			{
				return;
			}

			if(!instance.close_enabled)
			{
				return;
			}

			if(instance.options.before_close(instance) === false)
			{
				return;
			}

			if(instance.options.fade_out)
			{
				instance.fade_out(callback);
			}

			else
			{
				instance.close_window(callback);
			}
		}

		instance.close_window = function(callback)
		{
			instance.overlay.style.display = "none";
			instance.window.style.display = "none";
			
			instance.overlay.style.zIndex = -1000;
			instance.window.style.zIndex = -1000;
			
			instance.container.style.opacity = 0;

			instance.check_remove_overflow_hidden();

			if(!instance.options.persistent)
			{
				instance.destroy();
			}

			instance.options.after_close(instance);

			if(callback)
			{
				return callback(instance);
			}			
		}

		instance.set = function(html)
		{
			if(html === undefined)
			{
				return;
			}

			instance.create();

			if(instance.options.before_set(instance) === false)
			{
				return;
			}

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
			
			instance.options.after_set(instance);			
		}

		instance.show = function(html, callback=false)
		{
			if(typeof html === "function")
			{
				callback = html;
				html = undefined;
			}

			instance.create();

			if(instance.options.before_show(instance) === false)
			{
				return;
			}

			if(html !== undefined)
			{
				instance.set(html);
			}			

			if(!instance.is_open())
			{	
				instance.overlay.style.display = "block";
				instance.window.style.display = "block";

				instance.check_add_overflow_hidden();
			}

			instance.to_top();

			if(instance.options.fade_in)
			{
				instance.fade_in(callback);					
			}

			else
			{
				instance.container.style.opacity = 1;
			}

			instance.window.scrollTop = 0;
			instance.content.focus();

			if(options.temp_disable_close)
			{
				instance.close_enabled = false;
				instance.temp_disable_close_timer();
			}

			if(options.temp_disable_click)
			{
				instance.click_enabled = false;
				instance.temp_disable_click_timer();
			}

			if(options.temp_disable_keys)
			{
				instance.keys_enabled = false;
				instance.temp_disable_keys_timer();
			}

			if(options.autoclose)
			{
				instance.autoclose_timer();
			}

			instance.options.after_show(instance);

			if(!instance.options.fade_in)
			{
				if(callback)
				{
					return callback(instance);
				}
			}
		}

		instance.toggle = function()
		{
			instance.create();

			if(instance.options.before_toggle(instance) === false)
			{
				return;
			}

			instance.is_open() ? instance.close() : instance.show();

			instance.options.after_toggle(instance);
		}

		instance.create = function()
		{
			if(instance.created())
			{
				return;
			}

			if(document.getElementById(`Msg-container-${instance.options.id}`) !== null)
			{
				throw "Msg Error: The html elements for this id have already been created. Use a different id.";
			}

			if(instance.options.before_create(instance) === false)
			{
				return;
			}			

			var styles = {};

			styles.container = `opacity:0;`;

			styles.overlay = `position:fixed;
			top:0;
			left:0;
			height:100%;
			width:100%;
			background-color:rgba(0, 0, 0, 0.7);
			z-index:-1000;
			display:none;`;

			styles.window = `position:fixed;
			left:50%;
			top:50%;
			max-height:80vh;
			max-width:80vw;
			transform:translate(-50%, -50%);
			overflow:auto;
			overflow-x:hidden;
			overflow-y:auto;
			outline:0;
			z-index:-1000;
			display:none`;

			styles.content = `color:black;
			background-color:white;
			font-size:23.8px;
			font-family:sans-serif;
			text-align:center;
			overflow-wrap: break-word;
			padding:1.6em`;

			styles.inner_x = `color:#363636;
			float:${options.inner_x_position};
			cursor:pointer;
			font-size:23.8px;
			font-family:sans-serif;
			position:sticky;
			top:0px;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;	
			padding-left:0.6em;
			padding-right:0.6em;
			padding-top:0.035em;
			padding-bottom:0.2em;`;

			styles.outer_x = `color:white;
			float:${options.outer_x_position};
			cursor:pointer;
			font-size:28px;
			font-family:sans-serif;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;	
			padding-left:0.6em;
			padding-right:0.6em;
			padding-top:0.035em;
			padding-bottom:0.2em;`;			

			var container_class = (instance.options.container_class !== undefined) ? instance.options.container_class : instance.options.class;
			var overlay_class = (instance.options.overlay_class !== undefined) ? instance.options.overlay_class : instance.options.class;
			var window_class = (instance.options.window_class !== undefined) ? instance.options.window_class : instance.options.class;
			var content_class = (instance.options.content_class !== undefined) ? instance.options.content_class : instance.options.class;
			var inner_x_class = (instance.options.inner_x_class !== undefined) ? instance.options.inner_x_class : instance.options.class;
			var outer_x_class = (instance.options.outer_x_class !== undefined) ? instance.options.outer_x_class : instance.options.class;

			var container_html =  `<div class="Msg-container Msg-container-${container_class}" style="${styles.container}" id="Msg-container-${instance.options.id}"></div>`;
			var overlay_html = `<div class="Msg-overlay Msg-overlay-${overlay_class}"" style="${styles.overlay}" id="Msg-overlay-${instance.options.id}"></div>`;
			var window_html = `<div class="Msg-window Msg-window-${window_class}" style="${styles.window}" id="Msg-window-${instance.options.id}"></div>`;
			var content_html = `<div class="Msg-content Msg-content-${content_class}" style="${styles.content}" id="Msg-content-${instance.options.id }"></div>`;
			var inner_x_html = `<div class="Msg-inner-x Msg-inner-x-${inner_x_class}" style="${styles.inner_x}" id="Msg-inner-x-${instance.options.id }">x</div>`;
			var outer_x_html = `<div class="Msg-outer-x Msg-outer-x-${outer_x_class}" style="${styles.outer_x}" id="Msg-outer-x-${instance.options.id }">x</div>`;

			document.body.insertAdjacentHTML("beforeend", container_html);

			instance.container = document.getElementById(`Msg-container-${instance.options.id}`);

			instance.container.insertAdjacentHTML("beforeend", overlay_html);
			instance.container.insertAdjacentHTML("beforeend", window_html);

			instance.overlay = document.getElementById(`Msg-overlay-${instance.options.id}`);
			
			if(options.enable_outer_x)
			{
				instance.overlay.insertAdjacentHTML("beforeend", outer_x_html);
				instance.outer_x = document.getElementById(`Msg-outer-x-${instance.options.id}`);
			}

			instance.window = document.getElementById(`Msg-window-${instance.options.id}`);

			if(options.enable_inner_x)
			{
				instance.window.insertAdjacentHTML("beforeend", inner_x_html);
				instance.inner_x = document.getElementById(`Msg-inner-x-${instance.options.id}`);
			}

			instance.window.insertAdjacentHTML("beforeend", content_html);

			instance.content = document.getElementById(`Msg-content-${instance.options.id}`);

			instance.overlay.addEventListener("click", function()
			{
				if(instance.options.close_on_overlay_click)
				{
					instance.close();
				}
			});	

			instance.content.addEventListener("mousedown", function(e)
			{
				if(!instance.click_enabled)
				{
					var captureClick = function(e) 
					{
						e.stopPropagation();
						this.removeEventListener('click', captureClick, true);
					}

					instance.window.addEventListener('click', captureClick, true);
				}
			});	

			if(instance.inner_x !== undefined)
			{
				instance.inner_x.addEventListener("click", function(e)
				{
					instance.close();
					e.stopPropagation();
				});	
			}

			if(instance.outer_x !== undefined)
			{
				instance.outer_x.addEventListener("click", function(e)
				{
					instance.close();
					e.stopPropagation();
				});	
			}

			instance.options.after_create(instance);
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
				if(instance.options.before_destroy(instance) === false)
				{
					return;
				}

				instance.check_remove_overflow_hidden();

				document.body.removeChild(instance.container);

				instance.container = undefined;
				instance.overlay = undefined;
				instance.window = undefined;
				instance.content = undefined;
				instance.inner_x = undefined;
				instance.outer_x = undefined;

				instance.options.after_destroy(instance);		
			}
		}

		instance.is_open = function()
		{
			if(!instance.created() || instance.window.style.display === "none")
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
			var windows = Array.from(document.querySelectorAll(".Msg-window"));

			for(var i=0; i<windows.length; i++)
			{
				if(windows[i].style.display !== "none")
				{
					return true;
				}
			}

			return false;
		}

		instance.num_open = function()
		{
			var num_open = 0;

			var windows = Array.from(document.querySelectorAll(".Msg-window"));

			for(var i=0; i<windows.length; i++)
			{
				if(windows[i].style.display !== "none")
				{
					num_open += 1;
				}
			}

			return num_open;
		}

		instance.show_all = function()
		{
			for(let i=0; i<instances.length; i++)
			{
				instances[i].show();
			}
		}

		instance.close_all = function()
		{
			for(let i=0; i<instances.length; i++)
			{
				instances[i].close();
			}
		}

		instance.create_all = function()
		{
			for(let i=0; i<instances.length; i++)
			{
				instances[i].create();
			}			
		}

		instance.recreate_all = function()
		{
			for(let i=0; i<instances.length; i++)
			{
				instances[i].recreate();
			}
		}

		instance.destroy_all = function()
		{
			for(let i=0; i<instances.length; i++)
			{
				instances[i].destroy();
			}
		}

		instance.highest_zIndex = function()
		{
			var highest = -2000;

			var windows = Array.from(document.querySelectorAll(".Msg-window"));

			for(var i=0; i<windows.length; i++)
			{
				var zIndex = windows[i].style.zIndex;

				if(zIndex > highest)
				{
					highest = zIndex;
				}
			}

			return parseInt(highest);
		}

		instance.is_highest = function()
		{
			if(instance.is_open())
			{
				var zIndex = instance.highest_zIndex();

				if(parseInt(instance.window.style.zIndex) === zIndex)
				{
					return true;
				}
			}

			return false;
		}

		instance.html = function()
		{
			if(instance.created())
			{
				return instance.content.innerHTML;
			}

			return "";
		}

		instance.check_add_overflow_hidden = function()
		{
			if(instance.options.lock)
			{
				document.body.classList.add("Msg-overflow-hidden");
			}			
		}

		instance.check_remove_overflow_hidden = function()
		{
			if(instance.num_open() === 0)
			{
				document.body.classList.remove("Msg-overflow-hidden");
			}			
		}

		instance.to_top = function()
		{
			if(instance.is_open())
			{
				var zIndex = parseInt(instance.window.style.zIndex);
				var highest = Math.max(50000000, instance.highest_zIndex());

				if(highest > zIndex)
				{
					instance.overlay.style.zIndex = highest + 1;
					instance.window.style.zIndex = highest + 2;
				}			
			}
		}

		instance.instances = function()
		{
			return instances;
		}

		instance.temp_disable_close_timer = (function()
		{
			var timer;
			return function()
			{
				clearTimeout(timer);
				timer = setTimeout(function()
				{
					instance.close_enabled = true;
				}, options.temp_disable_close_delay);
			};
		})();

		instance.temp_disable_click_timer = (function()
		{
			var timer;
			return function()
			{
				clearTimeout(timer);
				timer = setTimeout(function()
				{
					instance.click_enabled = true;
				}, options.temp_disable_click_delay);
			};
		})();

		instance.temp_disable_keys_timer = (function()
		{
			var timer;
			return function()
			{
				clearTimeout(timer);
				timer = setTimeout(function()
				{
					instance.keys_enabled = true;
				}, options.temp_disable_keys_delay);
			};
		})();

		instance.autoclose_timer = (function()
		{
			var timer;
			return function() 
			{
				clearTimeout(timer);
				timer = setTimeout(function()
				{
					instance.close();
				}, options.autoclose_delay);
			};
		})();

		instance.fade_in = function(callback) 
		{
			clearInterval(instance.fade_in_interval);
			clearInterval(instance.fade_out_interval);

			instance.container.style.opacity = 0;

			var speed = instance.options.fade_in_duration / 50;

			instance.fade_in_interval = setInterval(function() 
			{
				instance.container.style.opacity = Number(instance.container.style.opacity) + 0.02;
				
				if (instance.container.style.opacity >= 1) 
				{
					clearInterval(instance.fade_in_interval);

					if(callback)
					{
						return callback(instance);
					}
				}
			}, speed);	
		}

		instance.fade_out = function(callback) 
		{
			clearInterval(instance.fade_in_interval);
			clearInterval(instance.fade_out_interval);

			instance.container.style.opacity = 1;

			var speed = instance.options.fade_out_duration / 50;

			instance.fade_out_interval = setInterval(function() 
			{
				instance.container.style.opacity = Number(instance.container.style.opacity) - 0.02;
				
				if(instance.container.style.opacity <= 0) 
				{
					clearInterval(instance.fade_out_interval);
					instance.close_window(callback);
				}
			}, speed);	
		}	

		document.addEventListener("keydown", function(e)
		{
			if(!instance.keys_enabled)
			{
				if(instance.is_highest())
				{
					var captureKey = function(e) 
					{
						e.stopPropagation();
						this.removeEventListener('keyup', captureKey, true);
					}

					document.addEventListener('keyup', captureKey, true);
				}
			}
		});		

		document.addEventListener("keyup", function(e)
		{
			if(e.keyCode === 27)
			{
				if(instance.is_highest())
				{
					if(instance.options.clear_editables)
					{
						var el = document.activeElement;

						if((el.nodeName === "INPUT" && el.type === "text") || el.nodeName === "TEXTAREA")
						{
							if(!el.readOnly && !el.disabled)
							{
								if(el.value !== "")
								{
									el.select();

									if(!document.execCommand('insertText', false, ""))
									{
										el.value = "";
									}

									return;
								}
							}
						}
					}

					if(instance.options.close_on_escape)
					{
						instance.close();
					}
				}
			}
		});

		instances.push(instance);

		return instance;	
	}

	return factory;
}());