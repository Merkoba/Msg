/* Msg v6.2.1 https://github.com/madprops/Msg */

var Msg = (function()
{
	var instances = [];

	var css = `<style>

	.Msg-overflow-hidden{overflow:hidden}
	
	.Msg-overlay{background-color:rgba(0, 0, 0, 0.7)}
	.Msg-window{background-color:white;color:black}
	.Msg-titlebar{background-color:#c8c8c8;color:black}
	.Msg-progressbar{background-color:#c8c8c8}
	.Msg-inner-x{background-color:white;color:#363636}
	.Msg-inner-x:hover{background-color:#cacaca}
	.Msg-outer-x{color:white}
	.Msg-outer-x:hover{background-color:#686868}		

	.Msg-overlay-blue{background-color:rgba(101, 107, 124, 0.7)}
	.Msg-window-blue{background-color:#4f84b8;color:white}
	.Msg-titlebar-blue{background-color:#43729f;color:white}
	.Msg-progressbar-blue{background-color:#43729f}
	.Msg-inner-x-blue{background-color:#4f84b8;color:white}
	.Msg-inner-x-blue:hover{background-color:#476b8f}
	.Msg-outer-x-blue{color:white}
	.Msg-outer-x-blue:hover{background-color:#747484}	
	
	.Msg-overlay-red{background-color:rgba(104, 64, 64, 0.7)}
	.Msg-window-red{background-color:#ca4e4e;color:white}
	.Msg-titlebar-red{background-color:#af3f3f;color:white}
	.Msg-progressbar-red{background-color:#af3f3f}
	.Msg-inner-x-red{background-color:#ca4e4e;color:white}
	.Msg-inner-x-red:hover{background-color:#9d4d4d}
	.Msg-outer-x-red{color:white}
	.Msg-outer-x-red:hover{background-color:#805e5e}	
	
	.Msg-overlay-green{background-color:rgba(121, 159, 133, 0.7)}
	.Msg-window-green{background-color:#58a564;color:white}
	.Msg-titlebar-green{background-color:#52935c;color:white}
	.Msg-progressbar-green{background-color:#52935c}
	.Msg-inner-x-green{background-color:#58a564;color:white}
	.Msg-inner-x-green:hover{background-color:#4e8456}
	.Msg-outer-x-green{color:white}
	.Msg-outer-x-green:hover{background-color:#7c957c}	
	
	.Msg-overlay-black{background-color:rgba(0, 0, 0, 0.7)}
	.Msg-window-black{background-color:#2a2a2a;color:white}
	.Msg-titlebar-black{background-color:#3c3c3c;color:white}
	.Msg-progressbar-black{background-color:black}
	.Msg-inner-x-black{background-color:#2a2a2a;color:white}
	.Msg-inner-x-black:hover{background-color:#424242}
	.Msg-outer-x-black{color:white}
	.Msg-outer-x-black:hover{background-color:#686868}

	.Msg-content-snackbar{padding:1.2em !important}

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
			if(instance.options.preset !== undefined)
			{
				if(instance.options.preset === "popup")
				{
					if(instance.options.class === undefined) instance.options.class = "green";
					if(instance.options.enable_overlay === undefined) instance.options.enable_overlay = false;
					if(instance.options.position === undefined) instance.options.position = "bottomright";
					if(instance.options.fade_in === undefined) instance.options.fade_in = true;
					if(instance.options.fade_out === undefined) instance.options.fade_out = true;
					if(instance.options.persistent === undefined) instance.options.persistent = false;
					if(instance.options.zStack_level === undefined) instance.options.zStack_level = 1;
					if(instance.options.lock === undefined) instance.options.lock = false;
				}

				if(instance.options.preset === "popup_autoclose")
				{
					if(instance.options.class === undefined) instance.options.class = "green";
					if(instance.options.enable_overlay === undefined) instance.options.enable_overlay = false;
					if(instance.options.position === undefined) instance.options.position = "bottomright";
					if(instance.options.autoclose === undefined) instance.options.autoclose = true;
					if(instance.options.enable_progressbar === undefined) instance.options.enable_progressbar = true;
					if(instance.options.fade_in === undefined) instance.options.fade_in = true;
					if(instance.options.fade_out === undefined) instance.options.fade_out = true;
					if(instance.options.persistent === undefined) instance.options.persistent = false;
					if(instance.options.zStack_level === undefined) instance.options.zStack_level = 1;
					if(instance.options.lock === undefined) instance.options.lock = false;
				}

				if(instance.options.preset === "snackbar")
				{
					if(instance.options.class === undefined) instance.options.class = "black";
					if(instance.options.content_class === undefined) instance.options.content_class = "snackbar";
					if(instance.options.position === undefined) instance.options.position = "bottom";
					if(instance.options.edge_padding === undefined) instance.options.edge_padding = 0;
					if(instance.options.window_min_width === undefined) instance.options.window_min_width = "25em";
					if(instance.options.enable_inner_x === undefined) instance.options.enable_inner_x = false;
					if(instance.options.enable_overlay === undefined) instance.options.enable_overlay = false;
					if(instance.options.fade_out === undefined) instance.options.fade_out = false;
					if(instance.options.subsequent_fade_ins === undefined) instance.options.subsequent_fade_ins = true;
					if(instance.options.autoclose === undefined) instance.options.autoclose = true;
					if(instance.options.autoclose_delay === undefined) instance.options.autoclose_delay = 10000;
					if(instance.options.vStack === undefined) instance.options.vStack = false;
					if(instance.options.zStack_level === undefined) instance.options.zStack_level = 1;
					if(instance.options.lock === undefined) instance.options.lock = false;
				}
			}	

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

			if(instance.options.closeable === undefined)
			{
				instance.options.closeable = true;
			}

			if(instance.options.enable_overlay === undefined)
			{
				instance.options.enable_overlay = true;
			}

			if(instance.options.close_on_overlay_click === undefined)
			{
				instance.options.close_on_overlay_click = true;
			}

			if(instance.options.enable_titlebar === undefined)
			{
				instance.options.enable_titlebar = false;
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

			if(instance.options.before_set_title === undefined)
			{
				instance.options.before_set_title = function(){};
			}

			if(instance.options.after_set_title === undefined)
			{
				instance.options.after_set_title = function(){};
			}

			if(instance.options.before_set_progress === undefined)
			{
				instance.options.before_set_progress = function(){};
			}			

			if(instance.options.after_set_progress === undefined)
			{
				instance.options.after_set_progress = function(){};
			}

			if(instance.options.before_close === undefined)
			{
				instance.options.before_close = function(){};
			}

			if(instance.options.after_close === undefined)
			{
				instance.options.after_close = function(){};
			}

			if(instance.options.after_last_closed === undefined)
			{
				instance.options.after_last_closed = function(){};
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

			if(instance.options.while_open === undefined)
			{
				instance.options.while_open = function(){};
			}

			if(instance.options.on_click === undefined)
			{
				instance.options.on_click = function(){};
			}			

			if(instance.options.while_open_interval === undefined)
			{
				instance.options.while_open_interval = 1000;
			}

			else
			{
				instance.options.while_open_interval = parseInt(instance.options.while_open_interval);
			}

			if(instance.options.temp_disable_close === undefined)
			{
				instance.options.temp_disable_close = false;
			}

			if(instance.options.temp_disable_close_delay === undefined)
			{
				instance.options.temp_disable_close_delay = 1000;
			}

			else
			{
				instance.options.temp_disable_close_delay = parseInt(instance.options.temp_disable_close_delay);
			}

			if(instance.options.autoclose === undefined)
			{
				instance.options.autoclose = false;
			}

			if(instance.options.autoclose_delay === undefined)
			{
				instance.options.autoclose_delay = 5000;
			}

			else
			{
				instance.options.autoclose_delay = parseInt(instance.options.autoclose_delay);
			}

			if(instance.options.temp_disable_click === undefined)
			{
				instance.options.temp_disable_click = false;
			}

			if(instance.options.temp_disable_click_delay === undefined)
			{
				instance.options.temp_disable_click_delay = 1000;
			}

			else
			{
				instance.options.temp_disable_click_delay = parseInt(instance.options.temp_disable_click_delay);
			}

			if(instance.options.temp_disable_keys === undefined)
			{
				instance.options.temp_disable_keys = false;
			}

			if(instance.options.temp_disable_keys_delay === undefined)
			{
				instance.options.temp_disable_keys_delay = 1000;
			}

			else
			{
				instance.options.temp_disable_keys_delay = parseInt(instance.options.temp_disable_keys_delay);
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

			else
			{
				instance.options.fade_in_duration = parseInt(instance.options.fade_in_duration);
			}

			if(instance.options.fade_out === undefined)
			{
				instance.options.fade_out = true;
			}

			if(instance.options.fade_out_duration === undefined)
			{
				instance.options.fade_out_duration = 350;
			}

			else
			{
				instance.options.fade_out_duration = parseInt(instance.options.fade_out_duration);
			}

			if(instance.options.position === undefined)
			{
				instance.options.position = "center";
			}

			if(instance.options.enable_progressbar === undefined)
			{
				instance.options.enable_progressbar = false;
			}

			if(instance.options.bind_progressbar_to_autoclose === undefined)
			{
				instance.options.bind_progressbar_to_autoclose = true;
			}

			if(instance.options.edge_padding === undefined)
			{
				instance.options.edge_padding = 20;
			}

			else
			{
				instance.options.edge_padding = parseInt(instance.options.edge_padding);
			}

			if(instance.options.vStack_padding === undefined)
			{
				instance.options.vStack_padding = 20;
			}

			else
			{
				instance.options.vStack_padding = parseInt(instance.options.vStack_padding);
			}

			if(instance.options.vStack === undefined)
			{
				instance.options.vStack = true;
			}

			if(instance.options.collapse === undefined)
			{
				instance.options.collapse = true;
			}

			if(instance.options.zStack_level === undefined)
			{
				instance.options.zStack_level = 2;
			}

			else
			{
				instance.options.zStack_level = parseInt(instance.options.zStack_level);
			}

			if(instance.options.show_delay === undefined)
			{
				instance.options.show_delay = 0;
			}

			else
			{
				instance.options.show_delay = parseInt(instance.options.show_delay);
			}

			if(instance.options.close_delay === undefined)
			{
				instance.options.close_delay = 0;
			}

			else
			{
				instance.options.close_delay = parseInt(instance.options.close_delay);
			}

			if(instance.options.window_width === undefined)
			{
				instance.options.window_width = "auto";
			}

			if(instance.options.window_height === undefined)
			{
				instance.options.window_height = "auto";
			}

			if(instance.options.window_min_width === undefined)
			{
				instance.options.window_min_width = "auto";
			}

			if(instance.options.window_min_height === undefined)
			{
				instance.options.window_min_height = "auto";
			}

			if(instance.options.window_max_width === undefined)
			{
				instance.options.window_max_width = "80vw";
			}

			if(instance.options.window_max_height === undefined)
			{
				instance.options.window_max_height = "80vh";
			}

			if(instance.options.window_cursor === undefined)
			{
				instance.options.window_cursor = "default";
			}

			if(instance.options.subsequent_fade_ins === undefined)
			{
				instance.options.subsequent_fade_ins = false;
			}

			if(instance.options.replace_linebreaks === undefined)
			{
				instance.options.replace_linebreaks = true;
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
			clearTimeout(instance.close_delay_timeout);

			if(instance.options.close_delay > 0)
			{
				instance.close_delay_timeout = setTimeout(function()
				{
					instance.do_close(callback);
				}, instance.options.close_delay);

				return;
			}

			instance.do_close(callback);
		}

		instance.do_close = function(callback=false)
		{
			if(!instance.is_open())
			{
				return;
			}

			if(!instance.close_enabled)
			{
				return;
			}

			if(!instance.options.closeable)
			{
				return;
			}

			if(instance.options.before_close(instance) === false)
			{
				return;
			}

			instance.clear_fade_intervals();
			instance.clear_while_open_interval();

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
			instance.container.style.display = "none";
			
			if(instance.overlay !== undefined)
			{
				instance.overlay.style.zIndex = -1000;
			}

			instance.collapse_vStack();

			instance.window.style.zIndex = -1000;

			instance.container.style.opacity = 0;

			instance.check_remove_overflow_hidden();

			if(!instance.options.persistent)
			{
				instance.destroy();
			}

			instance.options.after_close(instance);

			if(instance.num_open() === 0)
			{
				instance.options.after_last_closed(instance);
			}

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
				html = html.toString();

				if(instance.options.replace_linebreaks)
				{
					html = html.replace(/(\n)/g, "<br>");
				}

				instance.content.innerHTML = html;
			}
			
			instance.options.after_set(instance);			
		}

		instance.set_title = function(html)
		{
			if(html === undefined)
			{
				return;
			}

			instance.create();

			if(instance.titlebar === undefined)
			{
				return;
			}

			if(instance.options.before_set_title(instance) === false)
			{
				return;
			}

			if(typeof html === "object")
			{
				if(html instanceof Element)
				{
					instance.titlebar.innerHTML = html.outerHTML;	
				}
			}

			else
			{
				html = html.toString();

				if(instance.options.replace_linebreaks)
				{
					html = html.replace(/(\n)/g, "<br>");
				}

				instance.titlebar.innerHTML = html;
			}

			instance.options.after_set_title(instance);
		}		

		instance.set_or_show = function(html)
		{
			instance.is_highest() ? instance.set(html) : instance.show(html);
		}

		instance.show = function(content, callback=false)
		{
			clearTimeout(instance.show_delay_timeout);

			if(instance.options.show_delay > 0)
			{
				instance.show_delay_timeout = setTimeout(function()
				{
					instance.do_show(content, callback);
				}, instance.options.show_delay);

				return;
			}

			instance.do_show(content, callback);
		}

		instance.do_show = function(content, callback=false)
		{
			var title;
			var html;

			if(typeof content === "function")
			{
				callback = content;
			}

			if(typeof content === "object")
			{
				title = content[0];
				html = content[1];
			}

			else
			{
				html = content;
			}

			instance.create();

			if(instance.options.before_show(instance) === false)
			{
				return;
			}

			instance.clear_fade_intervals();

			if(html !== undefined)
			{
				instance.set(html);
			}

			if(title !== undefined)
			{
				instance.set_title(title);
			}			

			if(!instance.is_open())
			{	
				instance.container.style.display = "block";
				instance.check_add_overflow_hidden();
				instance.check_vStack();

				if(instance.options.while_open !== undefined)
				{
					instance.start_while_open_interval();
				}

				if(instance.options.fade_in)
				{
					instance.fade_in(callback);					
				}

				else
				{
					instance.container.style.opacity = 1;
				}
			}

			else
			{
				if(instance.options.fade_in && instance.options.subsequent_fade_ins)
				{
					instance.container.style.opacity = 0;
					instance.fade_in(callback);
				}
			}

			instance.to_top();

			instance.window.scrollTop = 0;
			instance.content.focus();

			if(instance.options.temp_disable_close)
			{
				instance.close_enabled = false;
				instance.temp_disable_close_timer();
			}

			if(instance.options.temp_disable_click)
			{
				instance.click_enabled = false;
				instance.temp_disable_click_timer();
			}

			if(instance.options.temp_disable_keys)
			{
				instance.keys_enabled = false;
				instance.temp_disable_keys_timer();
			}

			if(instance.options.autoclose)
			{
				instance.autoclose_timer();

				if(instance.options.enable_progressbar && instance.options.bind_progressbar_to_autoclose)
				{
					instance.animate_autoclose_progressbar();
				}
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

			styles.container = `
			display:none;
			opacity:0;
			`;

			styles.overlay = `
			position:fixed;
			top:0;
			left:0;
			height:100%;
			width:100%;
			z-index:-1000;
			`;

			styles.outer_x = `
			cursor:pointer;
			float:${instance.options.outer_x_position};
			font-size:28px;
			font-family:sans-serif;
			-webkit-touch-callout:none;
			-webkit-user-select:none;
			-khtml-user-select:none;
			-moz-user-select:none;
			-ms-user-select:none;
			user-select:none;	
			padding-left:0.6em;
			padding-right:0.6em;
			padding-top:0.035em;
			padding-bottom:0.2em;
			`;

			if(instance.options.position === "top")
			{
				var win_x = "left:50%;";
				var win_y = `top:${instance.options.edge_padding}px;`;
				var win_trans = "transform:translateX(-50%);";

				instance.stackable = true;
			}


			else if(instance.options.position === "bottom")
			{
				var win_x = "left:50%;";
				var win_y = `bottom:${instance.options.edge_padding}px;`;
				var win_trans = "transform:translateX(-50%);";

				instance.stackable = true;
			}

			else if(instance.options.position === "left")
			{
				var win_x = `left:${instance.options.edge_padding}px;`;
				var win_y = "top:50%;";
				var win_trans = "transform:translateY(-50%);";

				instance.stackable = false;
			}

			else if(instance.options.position === "right")
			{
				var win_x = `right:${instance.options.edge_padding}px;`;
				var win_y = "top:50%;";
				var win_trans = "transform:translateY(-50%);";

				instance.stackable = false;
			}

			else if(instance.options.position === "topleft")
			{
				var win_x = `left:${instance.options.edge_padding}px;`;
				var win_y = `top:${instance.options.edge_padding}px;`;
				var win_trans = "";

				instance.stackable = true;
			}

			else if(instance.options.position === "topright")
			{
				var win_x = `right:${instance.options.edge_padding}px;`;
				var win_y = `top:${instance.options.edge_padding}px;`;
				var win_trans = "";

				instance.stackable = true;
			}

			else if(instance.options.position === "bottomleft")
			{
				var win_x = `left:${instance.options.edge_padding}px;`;
				var win_y = `bottom:${instance.options.edge_padding}px;`;
				var win_trans = "";

				instance.stackable = true;
			}

			else if(instance.options.position === "bottomright")
			{
				var win_x = `right:${instance.options.edge_padding}px;`;
				var win_y = `bottom:${instance.options.edge_padding}px;`;
				var win_trans = "";

				instance.stackable = true;
			}

			else
			{
				var win_x = "left:50%;";
				var win_y = "top:50%;";
				var win_trans = "transform:translate(-50%, -50%);";

				instance.stackable = false;
			}

			styles.window = `
			display:flex;
			flex-direction:column;
			${win_x}
			${win_y}
			position:fixed;
			width:${instance.options.window_width};
			height:${instance.options.window_height};
			min-width:${instance.options.window_min_width};
			min-height:${instance.options.window_min_height};
			max-width:${instance.options.window_max_width};
			max-height:${instance.options.window_max_height};
			${win_trans}
			overflow:hidden;
			outline:0;
			cursor:${instance.options.window_cursor};
			z-index:-1000;
			`;

			styles.topbar = `
      		overflow:hidden;
      		flex-shrink:0;
      		display:flex;
      		flex-direction:row;
      		`;

			styles.titlebar = `
      		overflow:hidden;
      		order:2;
      		flex-grow:1;
			padding-top:0.38em;
			padding-left:0.4em;
			padding-right:0.4em;
			min-height:27px;
			font-size: 18px;
			font-family:sans-serif;    		
      		`;

      		if(instance.options.inner_x_position === "left")
      		{
      			var ix_order = "1";
      			var ix_margin = "";
      		}

      		else
      		{
      			var ix_order = "3";
      			var ix_margin = "auto";
      		}

			styles.inner_x = `
			cursor:pointer;
			margin-left:${ix_margin};
			font-size:24px;
			font-family:sans-serif;
			-webkit-touch-callout:none;
			-webkit-user-select:none;
			-khtml-user-select:none;
			-moz-user-select:none;
			-ms-user-select:none;
			user-select:none;
			overflow:hidden;
			order:${ix_order};
			padding-left:0.6em;
			padding-right:0.6em;
			padding-top:0.035em;
			padding-bottom:0.2em;
			`;

			styles.content_container = `
			overflow-y:auto;
			overflow-x:hidden;
			border:none;
			outline:0;
			margin:0;
			`;

			if(instance.options.enable_titlebar || instance.options.enable_inner_x)
			{
				if(instance.options.enable_titlebar)
				{
					var cpt = "1.2em";
				}

				else
				{
					var cpt = "0.2em";
				}
			}

			else
			{
				var cpt = "1.6em";
			}

			if(instance.options.enable_progressbar)
			{
				var cpb = "1.3em";
			}

			else
			{
				var cpb = "1.6em";
			}

			styles.content = `
			font-size:24px;
			font-family:sans-serif;
			text-align:center;
			overflow:hidden;
			overflow-wrap: break-word;
			padding-top:${cpt};
			padding-bottom:${cpb};
			padding-left:1.6em;
			padding-right:1.6em;
			`;

			styles.progressbar = `
			height:10px;
			width:0px;
			`;	

			var container_class = (instance.options.container_class !== undefined) ? instance.options.container_class : instance.options.class;
			var overlay_class = (instance.options.overlay_class !== undefined) ? instance.options.overlay_class : instance.options.class;
			var outer_x_class = (instance.options.outer_x_class !== undefined) ? instance.options.outer_x_class : instance.options.class;
			var window_class = (instance.options.window_class !== undefined) ? instance.options.window_class : instance.options.class;
			var topbar_class = (instance.options.topbar_class !== undefined) ? instance.options.topbar_class : instance.options.class;
			var titlebar_class = (instance.options.titlebar_class !== undefined) ? instance.options.titlebar_class : instance.options.class;
			var inner_x_class = (instance.options.inner_x_class !== undefined) ? instance.options.inner_x_class : instance.options.class;
			var content_container_class = (instance.options.content_container_class !== undefined) ? instance.options.content_container_class : instance.options.class;
			var content_class = (instance.options.content_class !== undefined) ? instance.options.content_class : instance.options.class;
			var progressbar_class = (instance.options.progressbar_class !== undefined) ? instance.options.progressbar_class : instance.options.class;
			
			container_class = container_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-container-${w}`).join(" ");
			overlay_class = overlay_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-overlay-${w}`).join(" ");
			outer_x_class = outer_x_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-outer-x-${w}`).join(" ");
			window_class = window_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-window-${w}`).join(" ");
			topbar_class = topbar_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-topbar-${w}`).join(" ");
			titlebar_class = titlebar_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-titlebar-${w}`).join(" ");
			inner_x_class = inner_x_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-inner-x-${w}`).join(" ");
			content_container_class = content_container_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-content-container-${w}`).join(" ");
			content_class = content_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-content-${w}`).join(" ");
			progressbar_class = progressbar_class.split(/\s+/).map(w => (w.startsWith("!")) ? w.substring(1) : `Msg-progressbar-${w}`).join(" ");

			var container_html =  `<div class="Msg-container ${container_class}" style="${styles.container}" id="Msg-container-${instance.options.id}"></div>`;
			var overlay_html = `<div class="Msg-overlay ${overlay_class}" style="${styles.overlay}" id="Msg-overlay-${instance.options.id}"></div>`;
			var outer_x_html = `<div class="Msg-outer-x ${outer_x_class}" style="${styles.outer_x}" id="Msg-outer-x-${instance.options.id }">x</div>`;
			var window_html = `<div class="Msg-window ${window_class}" style="${styles.window}" id="Msg-window-${instance.options.id}"></div>`;
			var topbar_html = `<div class="Msg-topbar ${topbar_class}" style="${styles.topbar}" id="Msg-topbar-${instance.options.id}"></div>`;
			var titlebar_html = `<div class="Msg-titlebar ${titlebar_class}" style="${styles.titlebar}" id="Msg-titlebar-${instance.options.id}"></div>`;
			var inner_x_html = `<div class="Msg-inner-x ${inner_x_class}" style="${styles.inner_x}" id="Msg-inner-x-${instance.options.id }">x</div>`;
			var content_container_html = `<div class="Msg-content-container ${content_container_class}" style="${styles.content_container}" id="Msg-content-container-${instance.options.id }"></div>`;
			var content_html = `<div class="Msg-content ${content_class}" style="${styles.content}" id="Msg-content-${instance.options.id }"></div>`;
			var progressbar_html = `<div class="Msg-progressbar ${progressbar_class}" style="${styles.progressbar}" id="Msg-progressbar-${instance.options.id }"></div>`;

			document.body.insertAdjacentHTML("beforeend", container_html);

			instance.container = document.getElementById(`Msg-container-${instance.options.id}`);

			if(instance.options.enable_overlay)
			{
				instance.container.insertAdjacentHTML("beforeend", overlay_html);
				instance.overlay = document.getElementById(`Msg-overlay-${instance.options.id}`);
				
				if(instance.options.enable_outer_x)
				{
					instance.overlay.insertAdjacentHTML("beforeend", outer_x_html);
					instance.outer_x = document.getElementById(`Msg-outer-x-${instance.options.id}`);
				}
			}

			instance.container.insertAdjacentHTML("beforeend", window_html);
			instance.window = document.getElementById(`Msg-window-${instance.options.id}`);

			if(instance.options.enable_titlebar || instance.options.enable_inner_x)
			{
				instance.window.insertAdjacentHTML("beforeend", topbar_html);
				instance.topbar = document.getElementById(`Msg-topbar-${instance.options.id}`);

				if(instance.options.enable_titlebar)
				{
					instance.topbar.insertAdjacentHTML("beforeend", titlebar_html);
					instance.titlebar = document.getElementById(`Msg-titlebar-${instance.options.id}`);
				}
				
				if(instance.options.enable_inner_x)
				{
					instance.topbar.insertAdjacentHTML("beforeend", inner_x_html);
					instance.inner_x = document.getElementById(`Msg-inner-x-${instance.options.id}`);
				}
			}

			instance.window.insertAdjacentHTML("beforeend", content_container_html);
			instance.content_container = document.getElementById(`Msg-content-container-${instance.options.id}`);
			
			instance.content_container.insertAdjacentHTML("beforeend", content_html);
			instance.content = document.getElementById(`Msg-content-${instance.options.id}`);	

			if(instance.options.enable_progressbar)
			{
				instance.window.insertAdjacentHTML("beforeend", progressbar_html);
				instance.progressbar = document.getElementById(`Msg-progressbar-${instance.options.id}`);
			}

			if(instance.overlay !== undefined)
			{
				instance.overlay.addEventListener("click", function()
				{
					if(instance.options.close_on_overlay_click)
					{
						instance.close();
					}
				});	
			}

			instance.window.addEventListener("click", function(e)
			{
				if(e.target === instance.content || e.target === instance.topbar || e.target === instance.titlebar || e.target === instance.progressbar)
				{
					instance.options.on_click(instance);
				}
			});

			instance.content.addEventListener("mousedown", function(e)
			{
				if(!instance.click_enabled)
				{
					var captureClick = function(e) 
					{
						e.stopPropagation();
						this.removeEventListener("click", captureClick, true);
					}

					instance.window.addEventListener("click", captureClick, true);
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
				instance.outer_x = undefined;
				instance.window = undefined;
				instance.topbar = undefined;
				instance.titlebar = undefined;
				instance.inner_x = undefined;
				instance.content_container = undefined;
				instance.content = undefined;

				instance.options.after_destroy(instance);		
			}
		}

		instance.is_open = function()
		{
			if(!instance.created() || instance.container.style.display === "none")
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
			var containers = Array.from(document.querySelectorAll(".Msg-container"));

			for(var i=0; i<containers.length; i++)
			{
				if(containers[i].style.display !== "none")
				{
					return true;
				}
			}

			return false;
		}

		instance.num_open = function()
		{
			var num_open = 0;

			var containers = Array.from(document.querySelectorAll(".Msg-container"));

			for(var i=0; i<containers.length; i++)
			{
				if(containers[i].style.display !== "none")
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

		instance.common_zIndex = function(zIndex)
		{
			zIndex = parseInt(zIndex);

			if(zIndex > 0)
			{
				var common = parseInt(zIndex.toString().substring(1));
			}

			else
			{
				var common = -2000;
			}

			return common;
		}		

		instance.highest_zIndex = function()
		{
			var highest = -2000;

			var windows = Array.from(document.querySelectorAll(".Msg-window"));

			for(var i=0; i<windows.length; i++)
			{
				var zIndex = parseInt(windows[i].style.zIndex);

				if(zIndex > highest)
				{
					highest = zIndex;
				}
			}

			return parseInt(highest);
		}

		instance.highest_common_zIndex = function()
		{
			var highest = -2000;

			var windows = Array.from(document.querySelectorAll(".Msg-window"));

			for(var i=0; i<windows.length; i++)
			{
				var zIndex = instance.common_zIndex(windows[i].style.zIndex);

				if(zIndex > highest)
				{
					highest = zIndex;
				}
			}

			return highest;
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

		instance.title_html = function()
		{
			if(instance.titlebar !== undefined)
			{
				return instance.titlebar.innerHTML;
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
			for(var i of instances)
			{
				if(i.is_open())
				{
					if(i.options.lock)
					{
						return;
					}
				}
			}

			document.body.classList.remove("Msg-overflow-hidden");
		}

		instance.to_top = function()
		{
			if(instance.is_open())
			{
				var zIndex = parseInt(instance.window.style.zIndex);

				var highest_common = instance.highest_common_zIndex();

				if(instance.options.zStack_level === 1)
				{
					var highest = Math.max(5000000, 5000000 + highest_common);
				}

				else
				{
					var highest = Math.max(50000000, 50000000 + highest_common);
				}

				if(highest > zIndex)
				{
					if(instance.overlay !== undefined)
					{
						instance.overlay.style.zIndex = highest + 1;
					}

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
				}, instance.options.temp_disable_close_delay);
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
				}, instance.options.temp_disable_click_delay);
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
				}, instance.options.temp_disable_keys_delay);
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
				}, instance.options.autoclose_delay);
			};
		})();

		instance.animate_autoclose_progressbar = function()
		{
			clearInterval(instance.progressbar_animation);

			var percentage = 100;

			instance.progressbar.style.width = "100%";

			instance.progressbar_animation = setInterval(function()
			{
				percentage -= 1;

				if(percentage < 0)
				{
					percentage = 0;
				}

				instance.progressbar.style.width = `${percentage}%`;

				if(percentage <= 0)
				{
					clearInterval(instance.progressbar_animation);
				}

			}, instance.options.autoclose_delay / 100)
		}

		instance.set_progress = function(percentage)
		{
			if(percentage === undefined)
			{
				return;
			}

			instance.create();

			if(instance.progressbar === undefined)
			{
				return;
			}

			if(instance.options.before_set_progress(instance) === false)
			{
				return;
			}			

			if(percentage > 100)
			{
				percentage = 100;
			}

			if(percentage < 0)
			{
				percentage = 0;
			}

			instance.progressbar.style.width = `${percentage}%`;

			instance.options.after_set_progress(instance);
		}

		instance.get_progress = function()
		{
			if(instance.progressbar === undefined)
			{
				return;
			}

			return Math.round((instance.progressbar.offsetWidth / instance.window.offsetWidth) * 100);
		}

		instance.clear_fade_intervals = function()
		{
			clearInterval(instance.fade_in_interval);
			clearInterval(instance.fade_out_interval);
		}

		instance.fade_in = function(callback) 
		{
			var speed = instance.options.fade_in_duration / 50;

			instance.fade_in_interval = setInterval(function() 
			{
				instance.container.style.opacity = Number(instance.container.style.opacity) + 0.02;
				
				if(instance.container.style.opacity >= 1) 
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

		instance.start_while_open_interval = function()
		{
			instance.clear_while_open_interval();

			instance.while_open_interval = setInterval(function()
			{
				instance.options.while_open(instance);
			}, instance.options.while_open_interval);
		}

		instance.clear_while_open_interval = function()
		{
			clearInterval(instance.while_open_interval);
		}

		instance.common_zIndex_sort = function(a, b)
		{
			return instance.common_zIndex(a.window.style.zIndex) - instance.common_zIndex(b.window.style.zIndex);
		}

		instance.common_zIndex_sort2 = function(a, b)
		{
			return instance.common_zIndex(b.window.style.zIndex) - instance.common_zIndex(a.window.style.zIndex);
		}


		instance.top_sort = function(a, b)
		{
			return parseInt(a.window.style.top) - parseInt(b.window.style.top);
		}


		instance.top_sort2 = function(a, b)
		{
			return parseInt(b.window.style.top) - parseInt(a.window.style.top);
		}

		instance.bottom_sort = function(a, b)
		{
			return parseInt(a.window.style.bottom) - parseInt(b.window.style.bottom);
		}


		instance.bottom_sort2 = function(a, b)
		{
			return parseInt(b.window.style.bottom) - parseInt(a.window.style.bottom);
		}

		instance.highest_in_position = function()
		{
			var highest = -2000;
			var highest_ins;

			var p = instance.options.position;

			for(var i of instances)
			{
				if(i.is_open())
				{
					if(i.options.position === p)
					{
						if(p.indexOf("top") !== -1)
						{
							var pos = parseInt(i.window.style.top);
						}

						else if(p.indexOf("bottom") !== -1)
						{
							var pos = parseInt(i.window.style.bottom);
						}

						if(pos > highest)
						{
							highest = pos;
							highest_ins = i;
						}
					}
				}
			}

			return highest_ins;
		}					

		instance.above_in_position = function()
		{
			var ins_above = [];

			var p = instance.options.position;

			for(var i of instances)
			{
				if(i.is_open() && i.options.vStack)
				{
					if(i.options.position === p)
					{
						if(p.indexOf("top") !== -1)
						{
							if(parseInt(i.window.style.top) > parseInt(instance.window.style.top))
							{
								ins_above.push(i);
							}
						}

						else if(p.indexOf("bottom") !== -1)
						{
							if(parseInt(i.window.style.bottom) > parseInt(instance.window.style.bottom))
							{
								ins_above.push(i);
							}
						}
					}
				}
			}

			if(p.indexOf("top") !== -1)
			{
				ins_above.sort(instance.top_sort);
			}

			else if(p.indexOf("bottom") !== -1)
			{
				ins_above.sort(instance.bottom_sort);
			}			

			return ins_above;
		}

		instance.nextbelow_in_position = function(ins)
		{
			var ins_below = [];

			var p = ins.options.position;

			for(var i of instances)
			{
				if(i.is_open())
				{
					if(i.options.position === p)
					{
						if(p.indexOf("top") !== -1)
						{
							if(parseInt(i.window.style.top) < parseInt(ins.window.style.top))
							{
								ins_below.push(i);
							}
						}

						else if(p.indexOf("bottom") !== -1)
						{
							if(parseInt(i.window.style.bottom) < parseInt(ins.window.style.bottom))
							{
								ins_below.push(i);
							}
						}
					}
				}
			}

			if(p.indexOf("top") !== -1)
			{
				ins_below.sort(instance.top_sort2);
			}

			else if(p.indexOf("bottom") !== -1)
			{
				
				ins_below.sort(instance.bottom_sort2);
			}				

			return ins_below[0];
		}

		instance.check_vStack = function()
		{
			if(instance.stackable && instance.options.vStack)
			{
				var p = instance.options.position;

				var highest = instance.highest_in_position();

				if(highest !== undefined && highest !== instance)
				{
					if(p.indexOf("top") !== -1)
					{
						var top = parseInt(highest.window.style.top);
						var new_top = top + highest.window.offsetHeight + instance.options.vStack_padding + "px";
						
						instance.window.style.top = new_top;
					}

					else if(p.indexOf("bottom") !== -1)
					{
						var bottom = parseInt(highest.window.style.bottom);
						var new_bottom = bottom + highest.window.offsetHeight + instance.options.vStack_padding + "px";

						instance.window.style.bottom = new_bottom;
					}
				}

				else
				{
					if(p.indexOf("top") !== -1)
					{
						instance.window.style.top = instance.options.edge_padding + "px";
					}

					else if(p.indexOf("bottom") !== -1)
					{
						instance.window.style.bottom = instance.options.edge_padding + "px";
					}
				}
			}
		}

		instance.collapse_vStack = function()
		{
			if(!instance.stackable)
			{
				return;
			}

			var p = instance.options.position;

			var ins_above = instance.above_in_position();

			for(var i of ins_above)
			{
				if(!i.options.collapse)
				{
					return;
				}

				var below = instance.nextbelow_in_position(i);

				if(below !== undefined)
				{
					if(p.indexOf("top") !== -1)
					{
						var top = parseInt(below.window.style.top);
						var new_top = top + below.window.offsetHeight + i.options.vStack_padding + "px";
						
						i.window.style.top = new_top;
					}

					else if(p.indexOf("bottom") !== -1)
					{
						var bottom = parseInt(below.window.style.bottom);
						var new_bottom = bottom + below.window.offsetHeight + i.options.vStack_padding + "px";

						i.window.style.bottom = new_bottom;
					}		
				}

				else
				{
					if(p.indexOf("top") !== -1)
					{
						i.window.style.top = i.options.edge_padding + "px";
					}

					else if(p.indexOf("bottom") !== -1)
					{
						i.window.style.bottom = i.options.edge_padding + "px";
					}
				}				
			}
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
						this.removeEventListener("keyup", captureKey, true);
					}

					document.addEventListener("keyup", captureKey, true);
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

									if(!document.execCommand("insertText", false, ""))
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