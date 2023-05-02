function el (query, root = document) {
  return root.querySelector(query)
}

let msg = Msg.factory({})

let msg_title = Msg.factory({
  enable_titlebar: true,
  window_x: `inner_right`,
  center_titlebar: true,
  class: `blue`,
})

let msg_img = Msg.factory({
  class: `green`,
})

let msg_custom = Msg.factory({
  id: `foo`,
  class: `bar`,
  content_class: `!big`,
  enable_titlebar: true,
})

let msg_stack = Msg.factory({
  id: `boom`,
  window_x: `none`,
  overlay_x: `right`,
})

let msg_boop = Msg.factory({
  id: `boop`,
})

let msg_autoclose = Msg.factory({
  class: `red`,
  autoclose: true,
  window_x: `none`,
  close_on_overlay_click: false,
  enable_titlebar: true,
  enable_progressbar: true,
  autoclose_delay: 1800,
})

function play_audio (id) {
  if (audio_fadeout_interval !== undefined) {
    clearInterval(audio_fadeout_interval)
  }

  let audio = el(`#${id}`)

  audio.pause()
  audio.volume = 1
  audio.currentTime = 0
  audio.play()
}

let audio_fadeout_interval

function stop_audio (id) {
  let audio = el(`#${id}`)

  if (audio_fadeout_interval !== undefined) {
    clearInterval(audio_fadeout_interval)
  }

  audio_fadeout_interval = setInterval(function () {
    audio_fadeout(audio)
  }, 100)
}

function audio_fadeout (audio) {
  let newVolume = audio.volume - 0.04

  if (newVolume >= 0) {
    audio.volume = newVolume
  }
  else {
    if (audio_fadeout_interval !== undefined) {
      clearInterval(audio_fadeout_interval)
    }

    audio.volume = 0
    audio.pause()
    audio.currentTIme = 0
  }
}

let toytime0
let toytime1
let toytime2

let msg_toy = Msg.factory({
  id: `toy`,
  persistent: false,
  window_min_width: `100vw`,
  window_min_height: `100vh`,
  enable_overlay: false,
  window_x: `inner_x`,
  after_show: function (instance) {
    run_symmetric_harmony()
    play_audio(`toymusic`)

    toytime0 = setTimeout(function () {
      el(`#spinner`).style.display = `none`
      el(`#canv`).style.display = `block`

      toytime1 = setTimeout(function () {
        Msg.factory({ preset: `popup`, zStack_level: 2, class: `black` }).show(
          `Try moving the mouse`
        )
      }, 5000)

      toytime2 = setTimeout(function () {
        Msg.factory({ preset: `popup`, zStack_level: 2, class: `black` }).show(
          `Try drag and dropping images`
        )
      }, 20000)
    }, 2000)
  },
  after_close: function (instance) {
    clearInterval(sym_interval)
    clearTimeout(toytime0)
    clearTimeout(toytime1)
    clearTimeout(toytime2)
    stop_audio(`toymusic`)
    instance.close_all()
  },
})

let msg_np = Msg.factory({
  persistent: false,
  before_close: function (instance) {
    console.log(instance.window)
  },
  after_close: function (instance) {
    console.log(instance.window)
  },
})

let lorem = `<div class="heading">Where does it come from?</div><br>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
lorem += `<br><br><br><div class='heading'>Why do we use it?</div><br>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
lorem += `<br><br><br><div class='heading'>Where can I get some?</div><br>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`
let sm = `This is a simple message.`
let sc = `There are options to give elements different ids and classes. Then it's a matter of customizing and reusing parts however you want.`
let s2 = `<div class='heading'>Bubbagum</div><br><img src='bubbagum.jpg'>`
let s3 = `<div class='btn' onclick='msg_boop.show(\"This window is on top.\")'>Open Another Window</div>`
let s4 = `This window will autoclose.`
let stoy = `<div class='heading'>Symmetric Harmony</div>By Tiffany Rayside<br><br><div><canvas id="canv"></canvas></div><img id='spinner' src='spinner.gif'>`
let pops = []
let colors = [`green`, `blue`, `red`, `black`]
let current_color = 0

function pop (position) {
  let color = colors[current_color]
  current_color += 1

  if (current_color === colors.length) {
    current_color = 0
  }

  let message, title

  if (color === `green`) {
    message = `Your popup is ready.`
    title = `Success`
  }
  else if (color === `blue`) {
    message = `You can click the popups.`
    title = `Reminder`
  }
  else if (color === `red`) {
    message = `Your ice cream is melting.`
    title = `Warning`
  }
  else if (color === `black`) {
    message = `Try giving me a star on GitHub!`
    title = `Tip`
  }

  let sideStack = el(`#select_sideStack`).value
  let autoclose = el(`#input_autoclose`).checked
  let sideStack_collapse = el(`#input_sideStack_collapse`).checked
  let enable_titlebar = el(`#input_enable_titlebar`).checked
  let window_x = el(`#select_window_x`).value
  let overlay_x = el(`#select_overlay_x`).value
  let enable_overlay = el(`#input_enable_overlay`).checked
  let lock = el(`#input_lock`).checked
  let enable_progressbar

  if (autoclose) {
    enable_progressbar = true
  }
  else {
    enable_progressbar = false
  }

  let popup = Msg.factory({
    class: color,
    preset: `popup`,
    position: position,
    autoclose: autoclose,
    autoclose_delay: 2000,
    window_x: window_x,
    overlay_x: overlay_x,
    enable_overlay: enable_overlay,
    enable_progressbar: enable_progressbar,
    lock: lock,
    sideStack: sideStack,
    sideStack_collapse: sideStack_collapse,
    enable_titlebar: enable_titlebar,
    edge_padding_x: el(`#input_edge_padding_x`).value,
    edge_padding_y: el(`#input_edge_padding_y`).value,
    sideStack_padding: el(`#input_sideStack_padding`).value,
    window_cursor: `pointer`,
    window_unselectable: true,
    on_click: function (instance) {
      show_options(instance)
    },
  })

  pops.push(popup)
  popup.show([title, message])
}

function show_options (popup) {
  let msg = Msg.factory({
    class: popup.options.class,
    enable_titlebar: true,
    center_titlebar: true,
  })

  let s = ``
  let keys = Object.keys(popup.options)

  for (let key of keys) {
    let prop = popup.options[key]

    if (typeof prop === `string`) {
      prop = `"${prop}"`
    }

    s += key + `: `
    s += prop + `<br><br>`
  }

  msg.show([`Popup Properties`, s])
}

let msg_window = Msg.factory({
  id: `window`,
  preset: `window`,
})

let txt = `
<div class='scroller_container'>
<div class='scroller'>
A wonderful serenity has taken possession of my entire soul,
like these sweet mornings of spring which I enjoy with my whole heart.
I am alone, and feel the charm of existence in this spot, which was created for the bliss
of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere
tranquil existence, that I neglect my talents. I should be incapable of drawing a single
stroke at the present moment; and yet I feel that I never was a greater artist than now.
When, while the lovely valley teems with vapour around me, and the meridian sun strikes
the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal
into the inner sanctuary, I throw myself down among the tall grass by the trickling stream;
and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear
the buzz of the little world among the stalks, and grow familiar with the countless indescribable
forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his
own image, and the breath of that universal love which bears and sustains us, as it floats around
us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and
 earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress,
 then I often think with longing, Oh, would I could describe these conceptions, could impress
 upon paper all that is living so full and warm within me, that it might be the mirror of my soul,
 as my soul is the mirror of the infinite God! O my friend -- but it is too much for my strength
 -- I sink under the weight of the splendour of these visions! A wonderful serenity has taken
 possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.

<br><br><div onclick='msg_window.close()' style='cursor:pointer'>Close This Window</div><br><br>
</div></div>
`

function open_window () {
  msg_window.show(txt)
}

function show_color (color) {
  if (color.includes(`titlebar`)) {
    color = color.split(`_`)[0]

    let msg = Msg.factory({
      class: color,
      enable_titlebar: true,
      persistent: false,
      window_min_width: `20rem`,
    })

    let text = `let msg = Msg.factory({
  class: "${color}",
  enable_titlebar: true
})`
    msg.show([`Theme`, `<pre class='precode'><code>${text}</code></pre>`])
  }
  else {
    let msg = Msg.factory({
      class: color,
      persistent: false,
      window_min_width: `20rem`,
    })

    let text = `let msg = Msg.factory({
  class: "${color}"
})`
    msg.show(`<pre class='precode'><code>${text}</code></pre>`)
  }
}