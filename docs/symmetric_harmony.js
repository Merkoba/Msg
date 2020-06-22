// Modified version

function run_symmetric_harmony() {
  try {
    var ks, kx, ky

    var current_image = 1

    var nextImg = function () {
      var img = `sym_images/${current_image}.jpg`

      current_image += 1

      if (current_image > 5) {
        current_image = 1
      }

      return img
    }

    var Set = function () {}
    Set.partitions = function (display, img, scale) {
      var c1 = document.createElement("canvas")
      var c2 = document.createElement("canvas")
      var w = (c1.width = c2.width = img.naturalWidth || img.width)
      var h = (c1.height = c2.height = img.naturalHeight || img.height)
      var $ = c1.getContext("2d")
      var $$ = c2.getContext("2d")
      $.drawImage(img, 0, 0)

      while (scale < 0.3) {
        $$.clearRect(0, 0, w / 2, h / 2)
        $$.drawImage(c1, 0, 0, w, h, 0, 0, w / 2, h / 2)
        w /= 2
        h /= 2
        scale *= 2
        var hiddencanvas = c1
        c1 = c2
        c2 = hiddencanvas
        var hiddencontext = $
        $ = $$
        $$ = hiddencontext
      }
      display.width = w * scale
      display.height = h * scale
      display
        .getContext("2d")
        .drawImage(c1, 0, 0, w, h, 0, 0, w * scale, h * scale)
    }

    var opts = {
      imgURL: nextImg(),
      speed: 0.002,
      segmentSize: 200,
      smoothing: 0.1,
    }

    var Obj = function (canvas, segmentMotion) {
      this._c = canvas
      this._$ = canvas.getContext("2d")
      this.segmentWidth = segmentMotion
      this.segmentHeight = (segmentMotion * Math.sqrt(3)) / 2

      this.fillStyle = "hsla(0,0%,0%,1)"
      this.offsetX = 0
      this.offsetY = 0
      this.rotation = 0

      this.stock = document.createElement("canvas")
      this.stock.width = (segmentMotion * 9) / 2
      this.stock.height = segmentMotion
      this.stockctx = this.stock.getContext("2d")
    }

    Obj.prototype = {
      draw: function () {
        var _$_ = this.stockctx
        var w = this.segmentWidth
        var h = this.segmentHeight
        _$_.fillStyle = this.fillStyle
        _$_.strokeStyle = this.fillStyle
        _$_.clearRect(0, 0, this.stock.width, this.stock.height)

        this.drawSegment(_$_, 0, 0, 0, false)
        this.drawSegment(_$_, w, 0, Math.PI / 3, true)
        this.drawSegment(_$_, (w * 3) / 2, h, (Math.PI * 4) / 3, false)
        this.drawSegment(_$_, (w * 5) / 2, h, (Math.PI * 3) / 3, true)
        this.drawSegment(_$_, w * 3, 0, (Math.PI * 2) / 3, false)
        this.drawSegment(_$_, (w * 5) / 2, h, (Math.PI * 5) / 3, true)

        _$_ = this._$
        var ofsX = 0
        var heightstart = -1
        var initPOV = 0
        var heightend = Math.ceil(this._c.width / (w * 3))
        var finalPOV = Math.ceil(this._c.height / h)

        _$_.clearRect(0, 0, this._c.width, this._c.height)
        for (var i = initPOV; i < finalPOV; i++) {
          for (var j = heightstart; j < heightend; j++) {
            _$_.drawImage(this.stock, j * w * 3 + ofsX, i * h)
          }
          ofsX = (w * 3) / 2 - ofsX
        }
      },

      resize: function (w, h) {
        this._c.width = w
        this._c.height = h
      },

      setImage: function (img) {
        var calibrate = Math.max(
          this.segmentWidth / img.naturalWidth,
          this.segmentHeight / img.naturalHeight
        )

        if (calibrate < 1.0) {
          var pre = document.createElement("canvas")
          Set.partitions(pre, img, calibrate)
          this.fillStyle = this.stockctx.createPattern(pre, "repeat")
        } else {
          this.fillStyle = this.stockctx.createPattern(img, "repeat")
        }
      },

      drawSegment: function (_$_, kx, ky, dt, reverse) {
        var w = this.segmentWidth
        var h = this.segmentHeight

        _$_.save()
        _$_.translate(kx, ky)
        _$_.rotate(dt)
        if (reverse) {
          _$_.translate(w, 0)
          _$_.scale(-1, 1)
        }
        _$_.beginPath()
        _$_.moveTo(0, 0)
        _$_.lineTo(w, 0)
        _$_.lineTo(w / 2, h)
        _$_.closePath()
        _$_.translate(this.offsetX, this.offsetY)
        _$_.rotate(this.rotation)
        _$_.fill()
        _$_.stroke()
        _$_.restore()
      },
    }

    function ready() {
      var c = document.getElementById("canv")
      ks = new Obj(c, opts.segmentSize)
      ks.resize(window.innerWidth, window.innerHeight)
      kx = 0
      ky = 0

      loadImage(opts.imgURL, setImage)

      window.addEventListener("mousemove", function (e) {
        kx = (e.clientX / window.innerWidth - 0.5) * opts.segmentSize
        ky = (e.clientY / window.innerHeight - 0.5) * opts.segmentSize
      })

      window.addEventListener("touchmove", function (e) {
        e.preventDefault()
        kx = (e.touches[0].clientX / window.innerWidth - 0.5) * opts.segmentSize
        ky =
          (e.touches[0].clientY / window.innerHeight - 0.5) * opts.segmentSize
      })

      window.addEventListener("dragover", function (e) {
        e.preventDefault()
      })

      window.addEventListener("drop", function (e) {
        e.preventDefault()
        if (e.dataTransfer.files.length < 1) {
          return
        }
        openFile(e.dataTransfer.files[0], setImage)

        clearInterval(sym_interval)
      })

      window.addEventListener("paste", function (e) {
        if (e.clipboardData == false) return false
        var items = e.clipboardData.items
        if (items == undefined) return false

        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") == -1) continue
          var item = items[i].getAsFile()
          var URL = window.URL || window.webkitURL
          var src = URL.createObjectURL(item)
        }
        copyPasteImage(src, setImage)
      })

      window.addEventListener("deviceorientation", function (e) {
        kx = opts.segmentSize * Math.sin((e.beta * Math.PI) / 180)
        ky = opts.segmentSize * Math.sin((e.gamma * Math.PI) / 90)
      })

      setTimeout(function () {
        window.addEventListener("resize", function (e) {
          ks.resize(window.innerWidth, window.innerHeight)
        })
      }, 3000)
    }

    function draw() {
      ks.offsetX += (kx - ks.offsetX) * opts.smoothing
      ks.offsetY += (ky - ks.offsetY) * opts.smoothing
      ks.rotation += opts.speed
      ks.draw()
      window.requestAnimationFrame(draw)
    }

    function openFile(file, callback) {
      if (file.type.lastIndexOf("image") !== 0) {
        alert("Bad, Bad Image")
        return
      }
      loadImage(URL.createObjectURL(file), callback)
    }

    function copyPasteImage(src, callback) {
      var img = new Image()
      img.onload = function (e) {
        callback(e.target)
      }
      img.src = src
    }

    function loadImage(src, callback) {
      var img = new Image()
      img.onload = function (e) {
        callback(e.target)
      }
      img.src = src
    }

    function setImage(img) {
      ks.setImage(img)
    }

    ready()
    draw()

    sym_interval = setInterval(function () {
      loadImage(nextImg(), setImage)
    }, 5000)
  } catch (err) {}
}
