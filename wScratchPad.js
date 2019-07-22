! function (t) {
    "use strict";

    function s(s, i) {
        this.$el = t(s), this.options = i, this.init = !1, this.enabled = !0, this._generate()
    }
    s.prototype = {
        _generate: function () {
            if (!t.support.canvas) return this.$el.append("Canvas is not supported in this browser."), !0;
            this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), "static" === this.$el.css("position") && this.$el.css("position", "relative"), this.$img = t('<img src=""/>').attr("crossOrigin", "").css({
                position: "absolute",
                width: "100%",
                height: "100%"
            }), this.$scratchpad = t(this.canvas).css({
                position: "absolute",
                width: "100%",
                height: "100%"
            }), this.$scratchpad.bindMobileEvents(), this.$scratchpad.mouseenter(t.proxy(function (s) {
                if (!this.enabled) return !0;
                s.preventDefault(), s.stopPropagation(), this.canvasOffset = t(this.canvas).offset(), this.scratch = !0, this._scratchFunc(s, "Down")
            }, this)).mousemove(t.proxy(function (t) {
                this.scratch && this._scratchFunc(t, "Move")
            }, this)).mouseleave(t.proxy(function (t) {
                this.scratch && (this.scratch = !1, this._scratchFunc(t, "Up"))
            }, this)), this._setOptions(), this.$el.append(this.$img).append(this.$scratchpad), this.init = !0, this.reset()
        },
        reset: function () {
            var s = this,
                i = Math.ceil(this.$el.innerWidth()),
                e = Math.ceil(this.$el.innerHeight()),
                h = window.devicePixelRatio || 1;
            this.pixels = i * e, this.$scratchpad.attr("width", i).attr("height", e), this.canvas.setAttribute("width", i * h), this.canvas.setAttribute("height", e * h), this.ctx.scale(h, h), this.pixels = i * h * e * h, this.$img.hide(), this.options.bg && ("#" === this.options.bg.charAt(0) ? this.$el.css("backgroundColor", this.options.bg) : (this.$el.css("backgroundColor", ""), this.$img.attr("src", this.options.bg))), this.options.fg && ("#" === this.options.fg.charAt(0) ? (this.ctx.fillStyle = this.options.fg, this.ctx.beginPath(), this.ctx.rect(0, 0, i, e), this.ctx.fill(), this.$img.show()) : t(new Image).attr("crossOrigin", "").attr("src", this.options.fg).load(function () {
                s.ctx.drawImage(this, 0, 0, i, e), s.$img.show()
            }))
        },
        clear: function () {
            this.ctx.clearRect(0, 0, Math.ceil(this.$el.innerWidth()), Math.ceil(this.$el.innerHeight()))
        },
        enable: function (t) {
            this.enabled = !0 === t
        },
        destroy: function () {
            this.$el.children().remove(), t.removeData(this.$el, "wScratchPad")
        },
        _setOptions: function () {
            var t, s;
            for (t in this.options) this.options[t] = this.$el.attr("data-" + t) || this.options[t], this[s = "set" + t.charAt(0).toUpperCase() + t.substring(1)] && this[s](this.options[t])
        },
        setBg: function () {
            this.init && this.reset()
        },
        setFg: function () {
            this.setBg()
        },
        setCursor: function (t) {
            this.$el.css("cursor", t)
        },
        _scratchFunc: function (t, s) {
            t.pageX = Math.floor(t.pageX - this.canvasOffset.left), t.pageY = Math.floor(t.pageY - this.canvasOffset.top), this["_scratch" + s](t), (this.options.realtime || "Up" === s) && this.options["scratch" + s] && this.options["scratch" + s].apply(this, [t, this._scratchPercent()])
        },
        _scratchPercent: function () {
            for (var t = 0, s = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height), i = 0, e = s.data.length; i < e; i += 4) 0 === s.data[i] && 0 === s.data[i + 1] && 0 === s.data[i + 2] && 0 === s.data[i + 3] && t++;
            return t / this.pixels * 100
        },
        _scratchDown: function (t) {
            this.ctx.globalCompositeOperation = "destination-out", this.ctx.lineJoin = "round", this.ctx.lineCap = "round", this.ctx.strokeStyle = this.options.color, this.ctx.lineWidth = this.options.size, this.ctx.beginPath(), this.ctx.arc(t.pageX, t.pageY, this.options.size / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill(), this.ctx.beginPath(), this.ctx.moveTo(t.pageX, t.pageY)
        },
        _scratchMove: function (t) {
            this.ctx.lineTo(t.pageX, t.pageY), this.ctx.stroke()
        },
        _scratchUp: function () {
            this.ctx.closePath()
        }
    }, t.support.canvas = document.createElement("canvas").getContext, t.fn.wScratchPad = function (i, e) {
        if ("string" == typeof i) {
            var h, a = [],
                n = (void 0 !== e ? "set" : "get") + i.charAt(0).toUpperCase() + i.substring(1);
            return this.each(function () {
                (h = t.data(this, "wScratchPad")) && (h[i] ? h[i].apply(h, [e]) : void 0 !== e ? (h.options[i] && (h.options[i] = e), h[n] && h[n].apply(h, [e])) : a.push(h[n] ? h[n].apply(h, [e]) : h.options[i] ? h.options[i] : void 0))
            }), a.length ? 1 === a.length ? a[0] : a : this
        }
        return i = t.extend({}, t.fn.wScratchPad.defaults, i), this.each(function () {
            var e = t.data(this, "wScratchPad");
            return e || (e = new s(this, t.extend(!0, {}, i)), t.data(this, "wScratchPad", e)), e
        })
    }, t.fn.wScratchPad.defaults = {
        size: 5,
        bg: "#cacaca",
        fg: "#6699ff",
        realtime: !0,
        scratchDown: null,
        scratchUp: null,
        scratchMove: null,
        cursor: "crosshair"
    }, t.fn.bindMobileEvents = function () {
        t(this).on("touchstart touchmove touchend touchcancel", function (t) {
            var s = (t.changedTouches || t.originalEvent.targetTouches)[0],
                i = "";
            switch (event.type) {
                case 'touchstart':
                    type = 'mousedown';
                    break;
                case 'touchmove':
                    type = 'mousemove';
                    event.preventDefault();
                    break;
                case 'touchend':
                    type = 'mouseup';
                    break;
                default:
                    return;
            }
            var e = document.createEvent("MouseEvent");
            e.initMouseEvent(i, !0, !0, window, 1, s.screenX, s.screenY, s.clientX, s.clientY, !1, !1, !1, !1, 0, null), s.target.dispatchEvent(e)
        })
    }
}(jQuery);
