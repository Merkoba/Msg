/* Msg v14.3.0 https://github.com/Merkoba/Msg */

const Msg = {}
Msg.num_created = 0

Msg.el = (query, root = document) => {
  return root.querySelector(query)
}

Msg.els = (query, root = document) => {
  return Array.from(root.querySelectorAll(query))
}

Msg.ev = (element, action, callback, extra) => {
  element.addEventListener(action, callback, extra)
}

Msg.insert = (element_1, element_2, position = `beforeend`) => {
  element_1.insertAdjacentHTML(position, element_2)
}

Msg.factory = (options = {}) => {
  const instance = {}

  instance.stack_pos_top = undefined
  instance.stack_pos_bottom = undefined
  instance.stack_pos_left = undefined
  instance.stack_pos_right = undefined
  instance.stack_width = undefined
  instance.stack_height = undefined
  instance.options = options

  instance.check_options = () => {
    if (instance.options.preset !== undefined) {
      if (instance.options.preset === `popup`) {
        if (instance.options.class === undefined) {instance.options.class = `green`}

        if (instance.options.enable_overlay === undefined) {instance.options.enable_overlay = false}

        if (instance.options.position === undefined) {instance.options.position = `bottomright`}

        if (instance.options.remove_after_close === undefined) {instance.options.remove_after_close = true}

        if (instance.options.zStack_level === undefined) {instance.options.zStack_level = 1}

        if (instance.options.window_width === undefined) {instance.options.window_width = `460px`}

        if (instance.options.lock === undefined) {instance.options.lock = false}
      }
      else if (instance.options.preset === `popup_autoclose`) {
        if (instance.options.class === undefined) {instance.options.class = `green`}

        if (instance.options.enable_overlay === undefined) {instance.options.enable_overlay = false}

        if (instance.options.position === undefined) {instance.options.position = `bottomright`}

        if (instance.options.autoclose === undefined) {instance.options.autoclose = true}

        if (instance.options.enable_progressbar === undefined) {instance.options.enable_progressbar = true}

        if (instance.options.remove_after_close === undefined) {instance.options.remove_after_close = true}

        if (instance.options.zStack_level === undefined) {instance.options.zStack_level = 1}

        if (instance.options.window_width === undefined) {instance.options.window_width = `460px`}

        if (instance.options.lock === undefined) {instance.options.lock = false}
      }
      else if (instance.options.preset === `window`) {
        if (instance.options.window_height === undefined) {instance.options.window_height = `100vh`}

        if (instance.options.window_min_height === undefined) {instance.options.window_min_height = `100vh`}

        if (instance.options.window_max_height === undefined) {instance.options.window_max_height = `100vh`}

        if (instance.options.window_width === undefined) {instance.options.window_width = `100vw`}

        if (instance.options.window_min_width === undefined) {instance.options.window_min_width = `100vw`}

        if (instance.options.window_max_width === undefined) {instance.options.window_max_width = `100vw`}

        if (instance.options.disable_transformations === undefined) {instance.options.disable_transformations = true}

        if (instance.options.disable_content_padding === undefined) {instance.options.disable_content_padding = true}

        if (instance.options.full_content === undefined) {instance.options.full_content = true}

        if (instance.options.window_x === undefined) {instance.options.window_x = `none`}
      }
    }

    if (instance.options.id === undefined) {
      instance.options.id = Msg.num_created + 1
    }

    if (instance.options.class === undefined) {
      instance.options.class = `default`
    }

    if (instance.options.lock === undefined) {
      instance.options.lock = true
    }

    if (instance.options.closeable === undefined) {
      instance.options.closeable = true
    }

    if (instance.options.enable_overlay === undefined) {
      instance.options.enable_overlay = true
    }

    if (instance.options.close_on_overlay_click === undefined) {
      instance.options.close_on_overlay_click = true
    }

    if (instance.options.enable_titlebar === undefined) {
      instance.options.enable_titlebar = false
    }

    if (instance.options.center_titlebar === undefined) {
      instance.options.center_titlebar = false
    }

    if (instance.options.window_x === undefined) {
      if (instance.options.enable_titlebar) {
        instance.options.window_x = `inner_right`
      }
      else {
        instance.options.window_x = `floating_right`
      }
    }

    if (instance.options.overlay_x === undefined) {
      instance.options.overlay_x = `none`
    }

    if (instance.options.close_on_escape === undefined) {
      instance.options.close_on_escape = true
    }

    if (instance.options.clear_editables === undefined) {
      instance.options.clear_editables = false
    }

    if (instance.options.before_show === undefined) {
      instance.options.before_show = () => {}
    }

    if (instance.options.after_show === undefined) {
      instance.options.after_show = () => {}
    }

    if (instance.options.before_set === undefined) {
      instance.options.before_set = () => {}
    }

    if (instance.options.after_set === undefined) {
      instance.options.after_set = () => {}
    }

    if (instance.options.before_set_title === undefined) {
      instance.options.before_set_title = () => {}
    }

    if (instance.options.after_set_title === undefined) {
      instance.options.after_set_title = () => {}
    }

    if (instance.options.before_set_progress === undefined) {
      instance.options.before_set_progress = () => {}
    }

    if (instance.options.after_set_progress === undefined) {
      instance.options.after_set_progress = () => {}
    }

    if (instance.options.before_close === undefined) {
      instance.options.before_close = () => {}
    }

    if (instance.options.after_close === undefined) {
      instance.options.after_close = () => {}
    }

    if (instance.options.after_last_closed === undefined) {
      instance.options.after_last_closed = () => {}
    }

    if (instance.options.before_toggle === undefined) {
      instance.options.before_toggle = () => {}
    }

    if (instance.options.after_toggle === undefined) {
      instance.options.after_toggle = () => {}
    }

    if (instance.options.before_create === undefined) {
      instance.options.before_create = () => {}
    }

    if (instance.options.after_create === undefined) {
      instance.options.after_create = () => {}
    }

    if (instance.options.before_destroy === undefined) {
      instance.options.before_destroy = () => {}
    }

    if (instance.options.after_destroy === undefined) {
      instance.options.after_destroy = () => {}
    }

    if (instance.options.on_click === undefined) {
      instance.options.on_click = () => {}
    }

    if (instance.options.on_middle_click === undefined) {
      instance.options.on_middle_click = () => {}
    }

    if (instance.options.on_wheel_down === undefined) {
      instance.options.on_wheel_down = () => {}
    }

    if (instance.options.on_wheel_up === undefined) {
      instance.options.on_wheel_up = () => {}
    }

    if (instance.options.on_overlay_click === undefined) {
      instance.options.on_overlay_click = () => {}
    }

    if (instance.options.on_titlebar_click === undefined) {
      instance.options.on_titlebar_click = () => {}
    }

    if (instance.options.on_x_button_click === undefined) {
      instance.options.on_x_button_click = () => {}
    }

    if (instance.options.autoclose === undefined) {
      instance.options.autoclose = false
    }

    if (instance.options.autoclose_delay === undefined) {
      instance.options.autoclose_delay = 5000
    }
    else {
      instance.options.autoclose_delay = parseInt(instance.options.autoclose_delay)
    }

    if (instance.options.persistent === undefined) {
      instance.options.persistent = true
    }

    if (instance.options.remove_after_close === undefined) {
      instance.options.remove_after_close = false
    }

    if (instance.options.position === undefined) {
      instance.options.position = `center`
    }

    if (instance.options.enable_progressbar === undefined) {
      instance.options.enable_progressbar = false
    }

    if (instance.options.bind_progressbar_to_autoclose === undefined) {
      instance.options.bind_progressbar_to_autoclose = true
    }

    if (instance.options.reverse_autoclose_progressbar === undefined) {
      instance.options.reverse_autoclose_progressbar = false
    }

    if (instance.options.edge_padding_x === undefined) {
      instance.options.edge_padding_x = 20
    }
    else {
      instance.options.edge_padding_x = parseInt(instance.options.edge_padding_x)
    }

    if (instance.options.edge_padding_y === undefined) {
      instance.options.edge_padding_y = 20
    }
    else {
      instance.options.edge_padding_y = parseInt(instance.options.edge_padding_y)
    }

    if (instance.options.sideStack_padding === undefined) {
      instance.options.sideStack_padding = 20
    }

    if (instance.options.sideStack_padding === undefined) {
      instance.options.sideStack_padding = 20
    }
    else {
      instance.options.sideStack_padding = parseInt(instance.options.sideStack_padding)
    }

    if (instance.options.sideStack === undefined) {
      instance.options.sideStack = `vertical`
    }

    if (instance.options.sideStack_collapse === undefined) {
      instance.options.sideStack_collapse = true
    }

    if (instance.options.zStack_level === undefined) {
      instance.options.zStack_level = 2
    }
    else {
      instance.options.zStack_level = parseInt(instance.options.zStack_level)
    }

    if (instance.options.window_width === undefined) {
      instance.options.window_width = `auto`
    }

    if (instance.options.window_height === undefined) {
      instance.options.window_height = `auto`
    }

    if (instance.options.window_min_width === undefined) {
      instance.options.window_min_width = `auto`
    }

    if (instance.options.window_min_height === undefined) {
      instance.options.window_min_height = `auto`
    }

    if (instance.options.window_max_width === undefined) {
      instance.options.window_max_width = `80vw`
    }

    if (instance.options.window_max_height === undefined) {
      instance.options.window_max_height = `80vh`
    }

    if (instance.options.window_cursor === undefined) {
      instance.options.window_cursor = `default`
    }

    if (instance.options.titlebar_cursor === undefined) {
      instance.options.titlebar_cursor = `default`
    }

    if (instance.options.window_unselectable === undefined) {
      instance.options.window_unselectable = false
    }

    if (instance.options.replace_linebreaks === undefined) {
      instance.options.replace_linebreaks = false
    }

    if (instance.options.close_others_on_show === undefined) {
      instance.options.close_others_on_show = false
    }

    if (instance.options.scroll_on_show === undefined) {
      instance.options.scroll_on_show = true
    }

    if (instance.options.locked_element === undefined) {
      instance.options.locked_element = `body`
    }

    if (instance.options.disable_transformations === undefined) {
      instance.options.disable_transformations = false
    }

    if (instance.options.disable_content_padding === undefined) {
      instance.options.disable_content_padding = false
    }

    if (instance.options.full_content === undefined) {
      instance.options.full_content = false
    }
  }

  instance.check_options()

  instance.created = () => {
    if (instance.container === undefined) {
      return false
    }

    return true
  }

  instance.close = () => {
    if (!instance.is_open()) {
      return
    }

    if (!instance.options.closeable) {
      return
    }

    if (instance.options.before_close(instance) === false) {
      return
    }

    instance.container.style.display = `none`

    if (instance.overlay !== undefined) {
      instance.overlay.style.zIndex = -1000
    }

    instance.collapse_vStack()
    instance.collapse_hStack()
    instance.window.style.zIndex = -1000
    instance.clear_autoclose_progressbar_interval()
    instance.check_remove_overflow_hidden()

    if (!instance.options.persistent) {
      instance.destroy()
    }

    instance.options.after_close(instance)

    if (instance.num_open() === 0) {
      instance.options.after_last_closed(instance)
    }

    if (instance.options.remove_after_close) {
      instance.remove()
    }
  }

  instance.set = (html) => {
    if (html === undefined) {
      return
    }

    instance.create()

    if (instance.options.before_set(instance) === false) {
      return
    }

    if (typeof html === `object`) {
      if (html instanceof Element) {
        instance.content.innerHTML = ``
        instance.content.appendChild(html)
      }
    }
    else {
      html = html.toString()

      if (instance.options.replace_linebreaks) {
        html = html.replace(/(\n)/g, `<br>`)
      }

      instance.content.innerHTML = html
    }

    instance.fix_stacks()
    instance.options.after_set(instance)
  }

  instance.set_title = (html) => {
    if (html === undefined) {
      return
    }

    instance.create()

    if (instance.titlebar === undefined) {
      return
    }

    if (instance.options.before_set_title(instance) === false) {
      return
    }

    if (typeof html === `object`) {
      if (html instanceof Element) {
        instance.titlebar.innerHTML = ``
        instance.titlebar.appendChild(html)
      }
    }
    else {
      html = html.toString()

      if (instance.options.replace_linebreaks) {
        html = html.replace(/(\n)/g, `<br>`)
      }

      instance.titlebar.innerHTML = html
    }

    instance.fix_stacks()
    instance.options.after_set_title(instance)
  }

  instance.hide_titlebar = () => {
    if (!instance.topbar) {
      return
    }

    instance.topbar.style.display = `none`
  }

  instance.show_titlebar = () => {
    if (!instance.topbar) {
      return
    }

    instance.topbar.style.display = `flex`
  }

  instance.set_or_show = (html) => {
    if (instance.is_highest()) {
      instance.set(html)
    }
    else {
      instance.show(html)
    }
  }

  instance.show = (content) => {
    if (instance.options.close_on_show && instance.is_open()) {
      instance.close()
      instance.show(content)
      return
    }

    let title
    let html

    if ((typeof content === `object`) && !(content instanceof Element)) {
      title = content[0]
      html = content[1]
    }
    else {
      html = content
    }

    instance.create()

    if (instance.options.before_show(instance) === false) {
      return
    }

    if (html !== undefined) {
      instance.set(html)
    }

    if (title !== undefined) {
      instance.set_title(title)
    }

    instance.reset_timers()

    if (!instance.is_open()) {
      if (instance.options.close_others_on_show) {
        instance.close_all()
      }

      instance.container.style.display = `block`
      instance.check_add_overflow_hidden()
      instance.set_default_positions()
      instance.reset_props()

      if (instance.options.sideStack === `vertical`) {
        instance.check_vStack()
      }
      else if (instance.options.sideStack === `horizontal`) {
        instance.check_hStack()
      }
    }

    instance.to_top()

    if (instance.options.scroll_on_show) {
      instance.content_container.scrollTop = 0
    }

    if (instance.options.autoclose) {
      instance.autoclose_timer()

      if (instance.options.enable_progressbar && instance.options.bind_progressbar_to_autoclose) {
        instance.animate_autoclose_progressbar()
      }
    }

    instance.options.after_show(instance)
  }

  instance.toggle = () => {
    instance.create()

    if (instance.options.before_toggle(instance) === false) {
      return
    }

    instance.is_open() ? instance.close() : instance.show()
    instance.options.after_toggle(instance)
  }

  instance.create = () => {
    if (instance.created()) {
      return
    }

    if (Msg.el(`#Msg-container-${instance.options.id}`) !== null) {
      throw `Msg Error: The html elements for this id have already been created. Use a different id.`
    }

    if (instance.options.before_create(instance) === false) {
      return
    }

    let styles = {}

    styles.container = `
		display: none;
		`

    styles.overlay = `
		position: fixed;
		opacity: 1;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: -1000;
    user-select: none;
		`

    styles.overlay_x = `
		cursor: pointer;
		float: ${instance.options.overlay_x};
		font-size: 28px;
		font-family: sans-serif;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		padding-left: 0.6em;
		padding-right: 0.6em;
		padding-top: 0.035em;
		padding-bottom: 0.2em;
		`

    let p = instance.options.position
    let edge_x = instance.options.edge_padding_x
    let edge_y = instance.options.edge_padding_y
    let win_x, win_y, win_trans

    if (instance.options.disable_transformations) {
      win_x = `left: 0;`
      win_y = `top: 0;`
      win_trans = `transform: initial;`

      instance.vStackable = false
      instance.hStackable = false
    }
    else if (p === `top`) {
      win_x = `left: 50%;`
      win_y = `top: ${edge_y}px;`
      win_trans = `transform: translateX(-50%);`

      instance.vStackable = true
      instance.hStackable = false
    }
    else if (p === `bottom`) {
      win_x = `left: 50%;`
      win_y = `bottom: ${edge_y}px;`
      win_trans = `transform: translateX(-50%);`

      instance.vStackable = true
      instance.hStackable = false
    }
    else if (p === `left`) {
      win_x = `left: ${edge_x}px;`
      win_y = `top: 50%;`
      win_trans = `transform: translateY(-50%);`

      instance.vStackable = false
      instance.hStackable = true
    }
    else if (p === `right`) {
      win_x = `right: ${edge_x}px;`
      win_y = `top: 50%;`
      win_trans = `transform: translateY(-50%);`

      instance.vStackable = false
      instance.hStackable = true
    }
    else if (p === `topleft`) {
      win_x = `left: ${edge_x}px;`
      win_y = `top: ${edge_y}px;`
      win_trans = ``

      instance.vStackable = true
      instance.hStackable = true
    }
    else if (p === `topright`) {
      win_x = `right: ${edge_x}px;`
      win_y = `top: ${edge_y}px;`
      win_trans = ``

      instance.vStackable = true
      instance.hStackable = true
    }
    else if (p === `bottomleft`) {
      win_x = `left: ${edge_x}px;`
      win_y = `bottom: ${edge_y}px;`
      win_trans = ``

      instance.vStackable = true
      instance.hStackable = true
    }
    else if (p === `bottomright`) {
      win_x = `right: ${edge_x}px;`
      win_y = `bottom: ${edge_y}px;`
      win_trans = ``

      instance.vStackable = true
      instance.hStackable = true
    }
    else {
      win_x = `left: 50%;`
      win_y = `top: 50%;`
      win_trans = `transform: translate(-50%, -50%);`

      instance.vStackable = false
      instance.hStackable = false
    }

    let wun

    if (instance.options.window_unselectable) {
      wun = `user-select: none;`
    }
    else {
      wun = ``
    }

    styles.window = `
		display: flex;
		flex-direction: column;
		opacity: 1;
		${win_x}
		${win_y}
		position: fixed;
		width: ${instance.options.window_width};
		height: ${instance.options.window_height};
		min-width: ${instance.options.window_min_width};
		min-height: ${instance.options.window_min_height};
		max-width: ${instance.options.window_max_width};
		max-height: ${instance.options.window_max_height};
		${win_trans}
		outline: 0;
		${wun}
		cursor: ${instance.options.window_cursor};
		z-index: -1000;
		`

    styles.topbar = `
		overflow: hidden;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		`
    let padl = `padding-left: 0.4em;`
    let padr = `padding-right: 0.4em;`
    let justcnt = ``

    if (instance.options.center_titlebar) {
      justcnt = `justify-content: center`
    }

    if (instance.options.center_titlebar && (instance.options.window_x === `inner_right`)) {
      padl = `padding-left: 50.78px;`
      padr = `padding-right: 10.78px;`
    }

    if (instance.options.center_titlebar && (instance.options.window_x === `inner_left`)) {
      padl = `padding-left: 10.78px;`
      padr = `padding-right: 50.78px;`
    }

    styles.titlebar = `
    display: flex;
    align-items: center;
    ${justcnt};
		overflow: hidden;
		order: 2;
		flex-grow: 1;
		${padl}
		${padr}
		min-height: 27px;
		font-size: 16px;
		font-family: sans-serif;
    font-weight: bold;
    white-space: nowrap;
    cursor:${instance.options.titlebar_cursor};
		`

    let ix_order, ix_margin

    if (instance.options.window_x.includes(`left`)) {
      ix_order = `1`
      ix_margin = ``
    }
    else {
      ix_order = `3`
      ix_margin = `auto`
    }

    styles.window_inner_x = `
		cursor: pointer;
		margin-left: ${ix_margin};
		font-size: 24px;
		font-family: sans-serif;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		overflow: hidden;
		order: ${ix_order};
		padding-left: 0.6em;
		padding-right: 0.6em;
		padding-top: 0.035em;
		padding-bottom: 0.2em;
		`

    let fs, fms

    if (instance.options.window_x.includes(`left`)) {
      fs = `left: 0px;`
      fms = `margin-left: -10px;`
    }
    else {
      fs = `right: 0px;`
      fms = `margin-right: -10px;`
    }

    styles.window_floating_x = `
		cursor: pointer;
		position: absolute;
		top: 0px;
		${fs}
		margin-top: -10px;
		${fms}
		font-size: 16px;
		font-family: sans-serif;
		height: 22px;
		width: 22px;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		overflow: hidden;
		z-index: 9999999999999999;
    display: block;
    box-sizing: border-box;
    border-width: 3px;
    border-style: solid;
    border-color: #2B2D30;
    border-radius: 100%;
    background: linear-gradient(-45deg, transparent 0%, transparent 46%, white 46%,  white 56%,transparent 56%, transparent 100%), linear-gradient(45deg, transparent 0%, transparent 46%, white 46%,  white 56%,transparent 56%, transparent 100%);
    background-color: #2B2D30;
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
		`

    let overflow_y = `auto`

    if (instance.options.preset === `window`) {
      overflow_y = `hidden`
    }

    styles.content_container = `
		overflow-y: ${overflow_y};
		overflow-x: hidden;
		border: none;
		outline: 0;
		margin: 0;
		flex-grow: 1;
		`

    let pad

    if (instance.options.disable_content_padding) {
      pad = `padding: 0;`
    }
    else {
      pad = `padding: 1.2rem;`
    }

    let cwid, chgt

    if (instance.options.full_content) {
      cwid = `width: 100%;`
      chgt = `height: 100%;`
    }
    else {
      cwid = ``
      chgt = ``
    }

    styles.content = `
		font-size: 16px;
		text-align: center;
		overflow-wrap: break-word;
    ${pad}
		${cwid}
		${chgt}
		`

    styles.progressbar_container = `
		height: 11px;
		width: 100%;
		`

    styles.progressbar = `
		height: 100%;
		width: 0%;
		`

    let container_class =
      instance.options.container_class !== undefined
        ? instance.options.container_class
        : instance.options.class
    let overlay_class =
      instance.options.overlay_class !== undefined
        ? instance.options.overlay_class
        : instance.options.class
    let overlay_x_class =
      instance.options.overlay_x_class !== undefined
        ? instance.options.overlay_x_class
        : instance.options.class
    let window_class =
      instance.options.window_class !== undefined
        ? instance.options.window_class
        : instance.options.class
    let topbar_class =
      instance.options.topbar_class !== undefined
        ? instance.options.topbar_class
        : instance.options.class
    let titlebar_class =
      instance.options.titlebar_class !== undefined
        ? instance.options.titlebar_class
        : instance.options.class
    let window_inner_x_class =
      instance.options.window_inner_x_class !== undefined
        ? instance.options.window_inner_x_class
        : instance.options.class
    let window_floating_x_class =
      instance.options.window_floating_x_class !== undefined
        ? instance.options.window_floating_x_class
        : instance.options.class
    let content_container_class =
      instance.options.content_container_class !== undefined
        ? instance.options.content_container_class
        : instance.options.class
    let content_class =
      instance.options.content_class !== undefined
        ? instance.options.content_class
        : instance.options.class
    let progressbar_container_class =
      instance.options.progressbar_container_class !== undefined
        ? instance.options.progressbar_container_class
        : instance.options.class
    let progressbar_class =
      instance.options.progressbar_class !== undefined
        ? instance.options.progressbar_class
        : instance.options.class

    container_class = container_class
      .split(/\s+/)
      .map((w) => (w.startsWith(`!`) ? w.substring(1) : `Msg-container-${w}`))
      .join(` `)
    overlay_class = overlay_class
      .split(/\s+/)
      .map((w) => (w.startsWith(`!`) ? w.substring(1) : `Msg-overlay-${w}`))
      .join(` `)
    overlay_x_class = overlay_x_class
      .split(/\s+/)
      .map((w) => (w.startsWith(`!`) ? w.substring(1) : `Msg-overlay-x-${w}`))
      .join(` `)
    window_class = window_class
      .split(/\s+/)
      .map((w) => (w.startsWith(`!`) ? w.substring(1) : `Msg-window-${w}`))
      .join(` `)
    topbar_class = topbar_class
      .split(/\s+/)
      .map((w) => (w.startsWith(`!`) ? w.substring(1) : `Msg-topbar-${w}`))
      .join(` `)
    titlebar_class = titlebar_class
      .split(/\s+/)
      .map((w) => (w.startsWith(`!`) ? w.substring(1) : `Msg-titlebar-${w}`))
      .join(` `)
    window_inner_x_class = window_inner_x_class
      .split(/\s+/)
      .map((w) =>
        w.startsWith(`!`) ? w.substring(1) : `Msg-window-inner-x-${w}`,
      )
      .join(` `)
    window_floating_x_class = window_floating_x_class
      .split(/\s+/)
      .map((w) =>
        w.startsWith(`!`) ? w.substring(1) : `Msg-window-floating-x-${w}`,
      )
      .join(` `)
    content_container_class = content_container_class
      .split(/\s+/)
      .map((w) =>
        w.startsWith(`!`) ? w.substring(1) : `Msg-content-container-${w}`,
      )
      .join(` `)
    content_class = content_class
      .split(/\s+/)
      .map((w) => (w.startsWith(`!`) ? w.substring(1) : `Msg-content-${w}`))
      .join(` `)
    progressbar_container_class = progressbar_container_class
      .split(/\s+/)
      .map((w) =>
        w.startsWith(`!`) ? w.substring(1) : `Msg-progressbar-container-${w}`,
      )
      .join(` `)
    progressbar_class = progressbar_class
      .split(/\s+/)
      .map((w) => (w.startsWith(`!`) ? w.substring(1) : `Msg-progressbar-${w}`))
      .join(` `)

    let container_html = `<div class="Msg-container ${container_class}" style="${styles.container}" id="Msg-container-${instance.options.id}"></div>`
    let overlay_html = `<div class="Msg-overlay ${overlay_class}" style="${styles.overlay}" id="Msg-overlay-${instance.options.id}"></div>`
    let overlay_x_html = `<div class="Msg-overlay-x ${overlay_x_class}" style="${styles.overlay_x}" id="Msg-overlay-x-${instance.options.id}">x</div>`
    let window_html = `<div class="Msg-window ${window_class}" style="${styles.window}" id="Msg-window-${instance.options.id}"></div>`
    let topbar_html = `<div class="Msg-topbar ${topbar_class}" style="${styles.topbar}" id="Msg-topbar-${instance.options.id}"></div>`
    let titlebar_html = `<div class="Msg-titlebar ${titlebar_class}" style="${styles.titlebar}" id="Msg-titlebar-${instance.options.id}"></div>`
    let window_inner_x_html = `<div class="Msg-window-inner-x ${window_inner_x_class}" style="${styles.window_inner_x}" id="Msg-window-inner-x-${instance.options.id}">x</div>`
    let window_floating_x_html = `<div class="Msg-window-floating-x ${window_floating_x_class}" style="${styles.window_floating_x}" id="Msg-window-floating-x-${instance.options.id}"></div>`
    let content_container_html = `<div class="Msg-content-container ${content_container_class}" style="${styles.content_container}" id="Msg-content-container-${instance.options.id}"></div>`
    let content_html = `<div class="Msg-content ${content_class}" style="${styles.content}" id="Msg-content-${instance.options.id}"></div>`
    let progressbar_container_html = `<div class="Msg-progressbar-container ${progressbar_container_class}" style="${styles.progressbar_container}" id="Msg-progressbar-container-${instance.options.id}"></div>`
    let progressbar_html = `<div class="Msg-progressbar ${progressbar_class}" style="${styles.progressbar}" id="Msg-progressbar-${instance.options.id}"></div>`

    Msg.insert(document.body, container_html)
    instance.container = Msg.el(`#Msg-container-${instance.options.id}`)

    if (instance.options.enable_overlay) {
      Msg.insert(instance.container, overlay_html)
      instance.overlay = Msg.el(`#Msg-overlay-${instance.options.id}`)

      if (instance.options.overlay_x !== `none`) {
        Msg.insert(instance.overlay, overlay_x_html)
        instance.overlay_x = Msg.el(`#Msg-overlay-x-${instance.options.id}`)
      }
    }

    Msg.insert(instance.container, window_html)
    instance.window = Msg.el(`#Msg-window-${instance.options.id}`)

    if (instance.options.enable_titlebar || instance.options.window_x.includes(`inner`)) {
      Msg.insert(instance.window, topbar_html)
      instance.topbar = Msg.el(`#Msg-topbar-${instance.options.id}`)

      if (instance.options.enable_titlebar) {
        Msg.insert(instance.topbar, titlebar_html)
        instance.titlebar = Msg.el(`#Msg-titlebar-${instance.options.id}`)
      }

      if (instance.options.window_x.includes(`inner`)) {
        Msg.insert(instance.topbar, window_inner_x_html)
        instance.window_inner_x = Msg.el(`#Msg-window-inner-x-${instance.options.id}`)
      }
    }

    if (instance.options.window_x.includes(`floating`)) {
      Msg.insert(instance.window, window_floating_x_html, `afterbegin`)
      instance.window_floating_x = Msg.el(`#Msg-window-floating-x-${instance.options.id}`)
    }

    Msg.insert(instance.window, content_container_html)
    instance.content_container = Msg.el(`#Msg-content-container-${instance.options.id}`)
    Msg.insert(instance.content_container, content_html)
    instance.content = Msg.el(`#Msg-content-${instance.options.id}`)

    if (instance.options.enable_progressbar) {
      Msg.insert(instance.window, progressbar_container_html)
      instance.progressbar_container = Msg.el(`#Msg-progressbar-container-${instance.options.id}`)
      Msg.insert(instance.progressbar_container, progressbar_html)
      instance.progressbar = Msg.el(`#Msg-progressbar-${instance.options.id}`)
    }

    if (instance.overlay !== undefined) {
      Msg.ev(instance.overlay, `click`, () => {
        if (instance.options.close_on_overlay_click) {
          instance.options.on_overlay_click(instance)
          instance.close()
        }
      })
    }

    if (instance.titlebar !== undefined) {
      Msg.ev(instance.titlebar, `click`, () => {
        if (instance.options.close_on_titlebar_click) {
          instance.options.on_titlebar_click(instance)
          instance.close()
        }
      })
    }

    Msg.ev(instance.window, `click`, (e) => {
      instance.options.on_click(instance)
    })

    Msg.ev(instance.window, `wheel`, (e) => {
      let direction = e.deltaY > 0 ? `down` : `up`

      if (direction === `down`) {
        instance.options.on_wheel_down(instance)
      }
      else if (direction === `up`) {
        instance.options.on_wheel_up(instance)
      }
    })

    Msg.ev(instance.window, `auxclick`, (e) => {
      if (e.which === 2) {
        instance.options.on_middle_click(instance)
      }
    })

    if (instance.window_inner_x !== undefined) {
      Msg.ev(instance.window_inner_x, `click`, (e) => {
        instance.options.on_x_button_click(instance)
        instance.close()
        e.stopPropagation()
      })
    }

    if (instance.window_floating_x !== undefined) {
      Msg.ev(instance.window_floating_x, `click`, (e) => {
        instance.options.on_x_button_click(instance)
        instance.close()
        e.stopPropagation()
      })
    }

    if (instance.overlay_x !== undefined) {
      Msg.ev(instance.overlay_x, `click`, (e) => {
        instance.options.on_x_button_click(instance)
        instance.close()
        e.stopPropagation()
      })
    }

    instance.options.after_create(instance)
  }

  instance.recreate = () => {
    instance.destroy()
    instance.create()
  }

  instance.destroy = () => {
    if (instance.created()) {
      if (instance.options.before_destroy(instance) === false) {
        return
      }

      instance.check_remove_overflow_hidden()
      instance.container.parentNode.removeChild(instance.container)

      instance.container = undefined
      instance.overlay = undefined
      instance.overlay_x = undefined
      instance.window = undefined
      instance.topbar = undefined
      instance.titlebar = undefined
      instance.window_inner_x = undefined
      instance.window_floating_x = undefined
      instance.content_container = undefined
      instance.content = undefined
      instance.progressbar_container = undefined
      instance.progressbar = undefined

      instance.options.after_destroy(instance)
    }
  }

  instance.is_open = () => {
    if (!instance.created() || (instance.container.style.display === `none`)) {
      return false
    }

    return true
  }

  instance.any_open = () => {
    for (let inst of Msg.instances) {
      if (inst.is_open()) {
        return true
      }
    }

    return false
  }

  instance.any_higher_open = () => {
    for (let inst of Msg.instances) {
      if (inst.options.zStack_level === 2) {
        if (inst.is_open()) {
          return true
        }
      }
    }

    return false
  }

  instance.any_lower_open = () => {
    for (let inst of Msg.instances) {
      if (inst.options.zStack_level === 1) {
        if (inst.is_open()) {
          return true
        }
      }
    }

    return false
  }

  instance.num_open = () => {
    let num_open = 0

    for (let inst of Msg.instances) {
      if (inst.is_open()) {
        num_open += 1
      }
    }

    return num_open
  }

  instance.num_open_higher = () => {
    let num_open = 0

    for (let inst of Msg.instances) {
      if (inst.is_open()) {
        if (inst.options.zStack_level === 2) {
          num_open += 1
        }
      }
    }

    return num_open
  }

  instance.num_open_lower = () => {
    let num_open = 0

    for (let inst of Msg.instances) {
      if (inst.is_open()) {
        if (inst.options.zStack_level === 1) {
          num_open += 1
        }
      }
    }

    return num_open
  }

  instance.show_all = () => {
    for (let i = 0; i < Msg.instances.length; i++) {
      Msg.instances[i].show()
    }
  }

  instance.close_all = () => {
    if (!instance.any_open()) {
      return false
    }

    for (let i = 0; i < Msg.instances.length; i++) {
      Msg.instances[i].close()
    }
  }

  instance.close_all_higher = () => {
    if (!instance.any_higher_open()) {
      return false
    }

    for (let higher of instance.higher_instances()) {
      higher.close()
    }
  }

  instance.close_all_lower = () => {
    if (!instance.any_lower_open()) {
      return false
    }

    for (let lower of instance.lower_instances()) {
      lower.close()
    }
  }

  instance.create_all = () => {
    for (let i = 0; i < Msg.instances.length; i++) {
      Msg.instances[i].create()
    }
  }

  instance.recreate_all = () => {
    for (let i = 0; i < Msg.instances.length; i++) {
      Msg.instances[i].recreate()
    }
  }

  instance.destroy_all = () => {
    for (let i = 0; i < Msg.instances.length; i++) {
      Msg.instances[i].destroy()
    }
  }

  instance.common_zIndex = (zIndex) => {
    zIndex = parseInt(zIndex)
    let common

    if (zIndex > 0) {
      common = parseInt(zIndex.toString().substring(1))
    }
    else {
      common = -2000
    }

    return common
  }

  instance.highest_zIndex = () => {
    let highest = -2000
    let windows = Msg.els(`.Msg-window`)

    for (let i = 0; i < windows.length; i++) {
      let zIndex = parseInt(windows[i].style.zIndex)

      if (zIndex > highest) {
        highest = zIndex
      }
    }

    return parseInt(highest)
  }

  instance.highest_instance = () => {
    let zIndex = instance.highest_zIndex()

    if (zIndex < 0) {
      return false
    }

    for (let i of Msg.instances) {
      if (i.window !== undefined) {
        if (parseInt(i.window.style.zIndex) === zIndex) {
          return i
        }
      }
    }

    return false
  }

  instance.highest_common_zIndex = () => {
    let highest = -2000
    let windows = Msg.els(`.Msg-window`)

    for (let i = 0; i < windows.length; i++) {
      let zIndex = instance.common_zIndex(windows[i].style.zIndex)

      if (zIndex > highest) {
        highest = zIndex
      }
    }

    return highest
  }

  instance.is_highest = () => {
    if (instance.is_open()) {
      let zIndex = instance.highest_zIndex()

      if (parseInt(instance.window.style.zIndex) === zIndex) {
        return true
      }
    }

    return false
  }

  instance.html = () => {
    if (instance.created()) {
      return instance.content.innerHTML
    }

    return ``
  }

  instance.title_html = () => {
    if (instance.titlebar !== undefined) {
      return instance.titlebar.innerHTML
    }

    return ``
  }

  instance.check_add_overflow_hidden = () => {
    if (instance.options.lock) {
      document
        .querySelector(instance.options.locked_element)
        .classList.add(`Msg-overflow-hidden`)
    }
  }

  instance.check_remove_overflow_hidden = () => {
    for (let i of Msg.instances) {
      if (i.is_open()) {
        if (i.options.lock) {
          return
        }
      }
    }

    document
      .querySelector(instance.options.locked_element)
      .classList.remove(`Msg-overflow-hidden`)
  }

  instance.to_top = () => {
    if (instance.is_open()) {
      let zIndex = parseInt(instance.window.style.zIndex)
      let highest_common = instance.highest_common_zIndex()
      let highest

      if (instance.options.zStack_level === 1) {
        highest = Math.max(5000000, 5000000 + highest_common)
      }
      else {
        highest = Math.max(50000000, 50000000 + highest_common)
      }

      if (highest > zIndex) {
        if (instance.overlay !== undefined) {
          instance.overlay.style.zIndex = highest + 1
        }

        instance.window.style.zIndex = highest + 2
      }
    }
  }

  instance.instances = () => {
    return Msg.instances
  }

  instance.higher_instances = () => {
    let instances = []

    for (let inst of Msg.instances) {
      if (inst.options.zStack_level === 2) {
        instances.push(inst)
      }
    }

    return instances
  }

  instance.lower_instances = () => {
    let instances = []

    for (let inst of Msg.instances) {
      if (inst.options.zStack_level === 1) {
        instances.push(inst)
      }
    }

    return instances
  }

  instance.get_instance_by_id = (id) => {
    for (let i of Msg.instances) {
      if (i.options.id.toString() === id.toString()) {
        return i
      }
    }
  }

  instance.autoclose_timer = () => {
    instance.autoclose_timeout = setTimeout(() => {
      instance.close()
    }, instance.options.autoclose_delay)
  }

  instance.reset_timers = () => {
    clearTimeout(instance.autoclose_timeout)
  }

  instance.clear_autoclose_progressbar_interval = () => {
    clearInterval(instance.progressbar_animation)
  }

  instance.animate_autoclose_progressbar = () => {
    instance.clear_autoclose_progressbar_interval()

    if (instance.options.reverse_autoclose_progressbar) {
      let percentage = 0
      instance.progressbar.style.width = `0%`

      instance.progressbar_animation = setInterval(() => {
        if (!instance.created()) {
          clearInterval(instance.progressbar_animation)
        }

        percentage += 1

        instance.set_progress(percentage)

        if (percentage >= 100) {
          clearInterval(instance.progressbar_animation)
        }
      }, instance.options.autoclose_delay / 100)
    }
    else {
      let percentage = 100
      instance.progressbar.style.width = `100%`

      instance.progressbar_animation = setInterval(() => {
        if (!instance.created()) {
          clearInterval(instance.progressbar_animation)
        }

        percentage -= 1

        instance.set_progress(percentage)

        if (percentage <= 0) {
          clearInterval(instance.progressbar_animation)
        }
      }, instance.options.autoclose_delay / 100)
    }
  }

  instance.set_progress = (percentage) => {
    if (percentage === undefined) {
      return
    }

    instance.create()

    if (instance.progressbar === undefined) {
      return
    }

    if (instance.options.before_set_progress(instance) === false) {
      return
    }

    if (percentage > 100) {
      percentage = 100
    }

    if (percentage < 0) {
      percentage = 0
    }

    instance.progressbar.style.width = `${percentage}%`
    instance.options.after_set_progress(instance)
  }

  instance.get_progress = () => {
    if (instance.progressbar === undefined) {
      return
    }

    return Math.round((instance.progressbar.offsetWidth / instance.window.offsetWidth) * 100)
  }

  instance.reset_props = () => {
    if (instance.overlay !== undefined) {
      instance.overlay.style.opacity = 1
    }

    instance.window.style.opacity = 1
    instance.window.style.zoom = 1
  }

  instance.stack_pos_top_sort = (a, b) => {
    return a.stack_pos_top - b.stack_pos_top
  }

  instance.stack_pos_top_sort2 = (a, b) => {
    return b.stack_pos_top - a.stack_pos_top
  }

  instance.stack_pos_bottom_sort = (a, b) => {
    return a.stack_pos_bottom - b.stack_pos_bottom
  }

  instance.stack_pos_bottom_sort2 = (a, b) => {
    return b.stack_pos_bottom - a.stack_pos_bottom
  }

  instance.stack_pos_left_sort = (a, b) => {
    return a.stack_pos_left - b.stack_pos_left
  }

  instance.stack_pos_left_sort2 = (a, b) => {
    return b.stack_pos_left - a.stack_pos_left
  }

  instance.stack_pos_right_sort = (a, b) => {
    return a.stack_pos_right - b.stack_pos_right
  }

  instance.stack_pos_right_sort2 = (a, b) => {
    return b.stack_pos_right - a.stack_pos_right
  }

  instance.highest_in_position = (mode) => {
    let highest = -2000
    let highest_ins
    let p = instance.options.position

    for (let i of Msg.instances) {
      if (i.is_open()) {
        if (i.options.position === p) {
          let pos

          if (mode === `vertical`) {
            if (p.includes(`top`)) {
              pos = i.stack_pos_top
            }
            else if (p.includes(`bottom`)) {
              pos = i.stack_pos_bottom
            }
          }
          else if (mode === `horizontal`) {
            if (p.includes(`left`)) {
              pos = i.stack_pos_left
            }
            else if (p.includes(`right`)) {
              pos = i.stack_pos_right
            }
          }

          if (pos !== undefined) {
            if (pos > highest) {
              highest = pos
              highest_ins = i
            }
          }
        }
      }
    }

    return highest_ins
  }

  instance.lowest_in_position = (mode) => {
    let lowest = 200000000
    let lowest_ins
    let p = instance.options.position

    for (let i of Msg.instances) {
      if (i.is_open()) {
        if (i.options.position === p) {
          let pos

          if (mode === `vertical`) {
            if (p.includes(`top`)) {
              pos = i.stack_pos_top
            }
            else if (p.includes(`bottom`)) {
              pos = i.stack_pos_bottom
            }
          }
          else if (mode === `horizontal`) {
            if (p.includes(`left`)) {
              pos = i.stack_pos_left
            }
            else if (p.includes(`right`)) {
              pos = i.stack_pos_right
            }
          }

          if (pos !== undefined) {
            if (pos < lowest) {
              lowest = pos
              lowest_ins = i
            }
          }
        }
      }
    }

    return lowest_ins
  }

  instance.above_in_position = (ins, mode) => {
    let ins_above = []
    let p = ins.options.position

    for (let i of Msg.instances) {
      if (i.is_open()) {
        if (i.options.position === p) {
          if (mode === `vertical`) {
            if (p.includes(`top`)) {
              if (i.stack_pos_top > ins.stack_pos_top) {
                ins_above.push(i)
              }
            }
            else if (p.includes(`bottom`)) {
              if (i.stack_pos_bottom > ins.stack_pos_bottom) {
                ins_above.push(i)
              }
            }
          }
          else if (mode === `horizontal`) {
            if (p.includes(`left`)) {
              if (i.stack_pos_left > ins.stack_pos_left) {
                ins_above.push(i)
              }
            }
            else if (p.includes(`right`)) {
              if (i.stack_pos_right > ins.stack_pos_right) {
                ins_above.push(i)
              }
            }
          }
        }
      }
    }

    if (mode === `vertical`) {
      if (p.includes(`top`)) {
        ins_above.sort(instance.stack_pos_top_sort)
      }
      else if (p.includes(`bottom`)) {
        ins_above.sort(instance.stack_pos_bottom_sort)
      }
    }
    else if (mode === `horizontal`) {
      if (p.includes(`left`)) {
        ins_above.sort(instance.stack_pos_left_sort)
      }
      else if (p.includes(`right`)) {
        ins_above.sort(instance.stack_pos_right_sort)
      }
    }

    return ins_above
  }

  instance.nextbelow_in_position = (ins, mode) => {
    let ins_below = []

    let p = ins.options.position

    for (let i of Msg.instances) {
      if (i.is_open()) {
        let ip = i.options.position

        if (ip === p) {
          if (mode === `vertical`) {
            let sp

            if (ip.includes(`left`)) {
              sp = i.stack_pos_left
            }
            else if (ip.includes(`right`)) {
              sp = i.stack_pos_right
            }

            if (sp !== undefined) {
              if ((sp > i.options.edge_padding_x + 2) || (sp < i.options.edge_padding_x - 2)) {
                continue
              }
            }

            if (p.includes(`top`)) {
              if (i.stack_pos_top < ins.stack_pos_top) {
                ins_below.push(i)
              }
            }
            else if (p.includes(`bottom`)) {
              if (i.stack_pos_bottom < ins.stack_pos_bottom) {
                ins_below.push(i)
              }
            }
          }
          else if (mode === `horizontal`) {
            if (p.includes(`left`)) {
              if (i.stack_pos_left < ins.stack_pos_left) {
                ins_below.push(i)
              }
            }
            else if (p.includes(`right`)) {
              if (i.stack_pos_right < ins.stack_pos_right) {
                ins_below.push(i)
              }
            }
          }
        }
      }
    }

    if (mode === `vertical`) {
      if (p.includes(`top`)) {
        ins_below.sort(instance.stack_pos_top_sort2)
      }
      else if (p.includes(`bottom`)) {
        ins_below.sort(instance.stack_pos_bottom_sort2)
      }
    }
    else if (mode === `horizontal`) {
      if (p.includes(`left`)) {
        ins_below.sort(instance.stack_pos_left_sort2)
      }
      else if (p.includes(`right`)) {
        ins_below.sort(instance.stack_pos_right_sort2)
      }
    }

    return ins_below[0]
  }

  instance.check_vStack = () => {
    if (instance.vStackable) {
      let p = instance.options.position

      if (p.includes(`top`)) {
        instance.stack_pos_top = -1000000
      }
      else if (p.includes(`bottom`)) {
        instance.stack_pos_bottom = -1000000
      }

      let highest = instance.highest_in_position(`vertical`)

      let new_top, new_bottom

      if ((highest !== undefined) && (highest !== instance)) {
        if (p.includes(`top`)) {
          new_top =
            highest.stack_pos_top +
            highest.stack_height +
            instance.options.sideStack_padding

          instance.window.style.top = new_top + `px`
        }
        else if (p.includes(`bottom`)) {
          new_bottom =
            highest.stack_pos_bottom +
            highest.stack_height +
            instance.options.sideStack_padding

          instance.window.style.bottom = new_bottom + `px`
        }
      }
      else if (p.includes(`top`)) {
        new_top = instance.options.edge_padding_y
        instance.window.style.top = new_top + `px`
      }
      else if (p.includes(`bottom`)) {
        new_bottom = instance.options.edge_padding_y
        instance.window.style.bottom = new_bottom + `px`
      }

      if (p.includes(`top`)) {
        instance.stack_pos_top = new_top
      }
      else if (p.includes(`bottom`)) {
        instance.stack_pos_bottom = new_bottom
      }
    }
  }

  instance.collapse_vStack = () => {
    let p = instance.options.position
    let ins_above = instance.above_in_position(instance, `vertical`)

    for (let i of ins_above) {
      if (!i.options.sideStack_collapse || (i.options.sideStack !== `vertical`)) {
        continue
      }

      let below = instance.nextbelow_in_position(i, `vertical`)

      let new_top, new_bottom

      if (below !== undefined) {
        if (p.includes(`top`)) {
          new_top =
            below.stack_pos_top +
            below.window.offsetHeight +
            i.options.sideStack_padding

          i.window.style.top = new_top + `px`
        }
        else if (p.includes(`bottom`)) {
          new_bottom =
            below.stack_pos_bottom +
            below.window.offsetHeight +
            i.options.sideStack_padding

          i.window.style.bottom = new_bottom + `px`
        }
      }
      else if (p.includes(`top`)) {
        new_top = i.options.edge_padding_y
        i.window.style.top = new_top + `px`
      }
      else if (p.includes(`bottom`)) {
        new_bottom = i.options.edge_padding_y
        i.window.style.bottom = new_bottom + `px`
      }

      if (p.includes(`top`)) {
        i.stack_pos_top = new_top
      }
      else if (p.includes(`bottom`)) {
        i.stack_pos_bottom = new_bottom
      }
    }
  }

  instance.fix_vStack = () => {
    let p = instance.options.position
    let below = instance.lowest_in_position(`vertical`)
    let new_top, new_bottom

    if (below !== undefined) {
      let above = instance.above_in_position(below, `vertical`)

      for (let i of above) {
        if (p.includes(`top`)) {
          new_top =
            below.stack_pos_top +
            below.window.offsetHeight +
            i.options.sideStack_padding

          i.window.style.top = new_top + `px`
          i.stack_pos_top = new_top
        }
        else if (p.includes(`bottom`)) {
          new_bottom =
            below.stack_pos_bottom +
            below.window.offsetHeight +
            i.options.sideStack_padding

          i.window.style.bottom = new_bottom + `px`
          i.stack_pos_bottom = new_bottom
        }

        below = i
      }
    }
  }

  instance.check_hStack = () => {
    if (instance.hStackable) {
      let p = instance.options.position

      if (p.includes(`left`)) {
        instance.stack_pos_left = -1000000
      }
      else if (p.includes(`right`)) {
        instance.stack_pos_right = -1000000
      }

      let highest = instance.highest_in_position(`horizontal`)
      let new_left, new_right

      if ((highest !== undefined) && (highest !== instance)) {
        if (p.includes(`left`)) {
          new_left =
            highest.stack_pos_left +
            highest.stack_width +
            instance.options.sideStack_padding

          instance.window.style.left = new_left + `px`
        }
        else if (p.includes(`right`)) {
          new_right =
            highest.stack_pos_right +
            highest.stack_width +
            instance.options.sideStack_padding

          instance.window.style.right = new_right + `px`
        }
      }
      else if (p.includes(`left`)) {
        new_left = instance.options.edge_padding_x
        instance.window.style.left = new_left + `px`
      }
      else if (p.includes(`right`)) {
        new_right = instance.options.edge_padding_x
        instance.window.style.right = new_right + `px`
      }

      if (p.includes(`left`)) {
        instance.stack_pos_left = new_left
      }
      else if (p.includes(`right`)) {
        instance.stack_pos_right = new_right
      }
    }
  }

  instance.collapse_hStack = () => {
    let p = instance.options.position
    let ins_above = instance.above_in_position(instance, `horizontal`)

    for (let i of ins_above) {
      if (!i.options.sideStack_collapse || (i.options.sideStack !== `horizontal`)) {
        continue
      }

      let below = instance.nextbelow_in_position(i, `horizontal`)
      let new_left, new_right

      if (below !== undefined) {
        if (p.includes(`left`)) {
          new_left =
            below.stack_pos_left +
            below.window.offsetWidth +
            i.options.sideStack_padding

          i.window.style.left = new_left + `px`
        }
        else if (p.includes(`right`)) {
          new_right =
            below.stack_pos_right +
            below.window.offsetWidth +
            i.options.sideStack_padding

          i.window.style.right = new_right + `px`
        }
      }
      else if (p.includes(`left`)) {
        new_left = i.options.edge_padding_x
        i.window.style.left = new_left + `px`
      }
      else if (p.includes(`right`)) {
        new_right = i.options.edge_padding_x
        i.window.style.right = new_right + `px`
      }

      if (p.includes(`left`)) {
        i.stack_pos_left = new_left
      }
      else if (p.includes(`right`)) {
        i.stack_pos_right = new_right
      }
    }
  }

  instance.fix_hStack = () => {
    let p = instance.options.position

    let below = instance.lowest_in_position(`horizontal`)

    if (below !== undefined) {
      let above = instance.above_in_position(below, `horizontal`)

      let new_left, new_right

      for (let i of above) {
        if (p.includes(`left`)) {
          new_left =
            below.stack_pos_left +
            below.window.offsetWidth +
            i.options.sideStack_padding

          i.window.style.left = new_left + `px`
          i.stack_pos_left = new_left
        }
        else if (p.includes(`right`)) {
          new_right =
            below.stack_pos_right +
            below.window.offsetWidth +
            i.options.sideStack_padding

          i.window.style.right = new_right + `px`
          i.stack_pos_right = new_right
        }

        below = i
      }
    }
  }

  instance.fix_stacks = () => {
    if (instance.is_open()) {
      instance.fix_vStack()
      instance.fix_hStack()
    }
  }

  instance.scroll_top = () => {
    instance.content_container.scrollTop = 0
  }

  instance.scroll_bottom = () => {
    instance.content_container.scrollTop = instance.content_container.scrollHeight
  }

  instance.set_default_positions = () => {
    let p = instance.options.position
    let edge_x = instance.options.edge_padding_x
    let edge_y = instance.options.edge_padding_y

    if (p === `top`) {
      instance.stack_pos_top = edge_y
      instance.stack_pos_bottom = undefined
      instance.stack_pos_left = undefined
      instance.stack_pos_right = undefined
    }
    else if (p === `bottom`) {
      instance.stack_pos_top = undefined
      instance.stack_pos_bottom = edge_y
      instance.stack_pos_left = undefined
      instance.stack_pos_right = undefined
    }
    else if (p === `left`) {
      instance.stack_pos_top = undefined
      instance.stack_pos_bottom = undefined
      instance.stack_pos_left = edge_x
      instance.stack_pos_right = undefined
    }
    else if (p === `right`) {
      instance.stack_pos_top = undefined
      instance.stack_pos_bottom = undefined
      instance.stack_pos_left = undefined
      instance.stack_pos_right = edge_x
    }
    else if (p === `topleft`) {
      instance.stack_pos_top = edge_y
      instance.stack_pos_bottom = undefined
      instance.stack_pos_left = edge_x
      instance.stack_pos_right = undefined
    }
    else if (p === `topright`) {
      instance.stack_pos_top = edge_y
      instance.stack_pos_bottom = undefined
      instance.stack_pos_left = undefined
      instance.stack_pos_right = edge_x
    }
    else if (p === `bottomleft`) {
      instance.stack_pos_top = undefined
      instance.stack_pos_bottom = edge_y
      instance.stack_pos_left = edge_x
      instance.stack_pos_right = undefined
    }
    else if (p === `bottomright`) {
      instance.stack_pos_top = undefined
      instance.stack_pos_bottom = edge_y
      instance.stack_pos_left = undefined
      instance.stack_pos_right = edge_x
    }
    else {
      instance.stack_pos_top = undefined
      instance.stack_pos_bottom = undefined
      instance.stack_pos_left = undefined
      instance.stack_pos_right = undefined
    }

    instance.stack_width = instance.window.offsetWidth
    instance.stack_height = instance.window.offsetHeight
  }

  instance.remove = () => {
    instance.destroy()

    for (let i = 0; i < Msg.instances.length; i++) {
      if (Msg.instances[i].options.id === instance.options.id) {
        Msg.instances.splice(i, 1)
        break
      }
    }
  }

  instance.is_textbox = (element) => {
    let tag_name = element.tagName.toLowerCase()
    if (tag_name === `textarea`) {return true}

    if (tag_name !== `input`) {return false}

    let type = element.getAttribute(`type`)

    if (!type) {
      return false
    }

    let input_types = [
      `text`,
      `password`,
      `number`,
      `email`,
      `tel`,
      `url`,
      `search`,
      `date`,
      `datetime`,
      `datetime-local`,
      `time`,
      `month`,
      `week`,
    ]

    return input_types.includes(type.toLowerCase())
  }

  if ((Msg.msg === undefined) && (instance.options.id !== `__internal_instance__`)) {
    Msg.msg = Msg.factory({id: `__internal_instance__`})
    let style = document.createElement(`style`)

    let css = `
		.Msg-overflow-hidden{overflow: hidden}

		.Msg-overlay{background-color: rgba(0, 0, 0, 0.7)}
		.Msg-window{background-color: white;color: #222222}
		.Msg-titlebar{background-color: #c8c8c8;color: #222222}
		.Msg-progressbar{background-color: #c8c8c8}
		.Msg-window-inner-x:hover{background-color: #cacaca}
		.Msg-window-floating-x{background-color: #3a3a3a;color: white}
		.Msg-window-floating-x:hover{background-color: #2a2a2a}
		.Msg-overlay-x{color: white}
		.Msg-overlay-x:hover{background-color: #686868}

		.Msg-overlay-blue{background-color: rgba(101, 107, 124, 0.7)}
		.Msg-window-blue{background-color: #4f84b8;color: white}
		.Msg-titlebar-blue{background-color: #43729f;color: white}
		.Msg-progressbar-blue{background-color: #43729f}
		.Msg-window-inner-x-blue:hover{background-color: #476b8f}
		.Msg-overlay-x-blue{color: white}
		.Msg-overlay-x-blue:hover{background-color: #747484}

		.Msg-overlay-red{background-color: rgba(104, 64, 64, 0.7)}
		.Msg-window-red{background-color: #ca4e4e;color: white}
		.Msg-titlebar-red{background-color: #af3f3f;color: white}
		.Msg-progressbar-red{background-color: #af3f3f}
		.Msg-window-inner-x-red:hover{background-color: #9d4d4d}
		.Msg-overlay-x-red{color: white}
		.Msg-overlay-x-red:hover{background-color: #805e5e}

		.Msg-overlay-green{background-color: rgba(121, 159, 133, 0.7)}
		.Msg-window-green{background-color: #58a564;color: white}
		.Msg-titlebar-green{background-color: #52935c;color: white}
		.Msg-progressbar-green{background-color: #52935c}
		.Msg-window-inner-x-green:hover{background-color: #4e8456}
		.Msg-overlay-x-green{color: white}
		.Msg-overlay-x-green:hover{background-color: #7c957c}

		.Msg-overlay-black{background-color: rgba(121, 121, 121, 0.7)}
		.Msg-window-black{background-color: #1D1F21;color: white}
		.Msg-titlebar-black{background-color: #3c3c3c;color: white}
		.Msg-progressbar-black{background-color: #3c3c3c}
		.Msg-window-inner-x-black:hover{background-color: #424242}
		.Msg-overlay-x-black{color: white}
		.Msg-overlay-x-black:hover{background-color: #686868}
		`

    style.innerHTML = css
    document.head.appendChild(style)

    Msg.ev(document, `keydown`, (e) => {
      let highest = Msg.msg.highest_instance()
      if (!highest) {return}

      if (e.key === `Escape`) {
        let highest = Msg.msg.highest_instance()
        if (!highest) {return}

        if (highest.options.clear_editables) {
          let el = document.activeElement

          if (highest.is_textbox(el)) {
            if (!el.readOnly && !el.disabled) {
              if (el.value.trim() !== ``) {
                let split = el.value.trimEnd().split(` `)
                let new_value = split.slice(0, -1).join(` `) + ` `

                if (new_value.trim() === ``) {
                  new_value = ``
                }

                el.value = new_value

                let event = new Event(`input`, {
                  bubbles: true,
                  cancelable: true,
                })

                el.dispatchEvent(event)

                return
              }
            }
          }
        }

        if (highest.options.close_on_escape) {
          highest.close()
        }
      }
    })
  }

  if (instance.options.id !== `__internal_instance__`) {
    Msg.instances.push(instance)
    Msg.num_created += 1
  }

  return instance
}

Msg.instances = []

try {
  module.exports = Msg
}
catch (e) {
  // Nothing
}