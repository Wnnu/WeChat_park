Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        placeholderText: {
            type: String,
            value: "请输入"
        }
    },
    data: {
        suffixListLine1: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ],
        suffixListLine2: [ "Q", "W", "E", "R", "T", "Y", "U", "O", "P", "A" ],
        suffixListLine3: [ "S", "D", "F", "G", "H", "J", "K", "L", "Z" ],
        suffixListLine4: [ "X", "C", "V", "B", "N", "M" ],
        content: "",
        hoverImg: {
            width: "0",
            height: "0",
            lineHeight: "0",
            text: "",
            left: "0",
            top: "10rpx",
            zIndex: "-200",
            visibility: "hidden"
        },
        keyWidth: 0,
        keyHeight: 0,
        keyLeft: 0,
        keyTop: 0,
        showKeyboard: !1,
        showPlaceholder: !0,
        showCursor: !1,
        showSuffixKeyboard: !0,
        other: ""
    },
    methods: {
        _keyPressHandler: function(t) {
            console.log(t);
            var e = this, n = t.currentTarget;
            if (!this._enableTap(n.dataset)) return !1;
            var i = wx.createSelectorQuery().in(this);
            i.select("#" + n.id).boundingClientRect(), i.exec(function(t) {
                console.log(t);
                var i = t[0];
                e.setData({
                    keyWidth: i.width,
                    keyHeight: i.height,
                    keyLeft: n.offsetLeft,
                    keyTop: n.offsetTop
                }), e._showHoverImg(n.offsetLeft, n.offsetTop, i.width, i.height, i.dataset.name);
            });
        },
        _keyUpHandler: function(t) {
            console.log(t), this._stopKeyEvent(t.currentTarget.dataset);
        },
        _showHoverImg: function(t, e, n, i, o) {
            var s = n * (105 / 64), a = s * (192 / 102), h = t - (s - n) / 2 - .4, r = e + i - a + 1;
            this.setData({
                hoverImg: {
                    left: h + "px",
                    top: r + "px",
                    width: s + "px",
                    height: a + "px",
                    lineHeight: a - i + "px",
                    text: o,
                    zIndex: 200,
                    visibility: "visible"
                }
            });
        },
        _hideHoverImg: function() {
            this.setData({
                hoverImg: {
                    visibility: "hidden",
                    zIndex: -200
                }
            });
        },
        _inputContentHandler: function(t) {
            var e = this, n = e.data.content;
            e.setData({
                content: n + t
            });
        },
        _deleteHandler: function(t) {
            var e = this.data.content;
            this.setData({
                content: 0 == e.length ? "" : e.substring(0, e.length - 1)
            }), this._stopKeyEvent(t.currentTarget.dataset);
        },
        _stopKeyEvent: function(t) {
          // 此处限制输入长度
          if (this.data.content.length>3){
            // 关闭动画
            return this._hideHoverImg()
          }
            return !!this._enableTap(t) && (this._hideHoverImg(), this._inputContentHandler(t && t.name ? t.name : ""), 
            console.log(this.data), !0);
        },
        _enableTap: function(t) {
            return null == t || null == t.keyEnable || t.keyEnable;
        },
        show: function() {
            this.setData({
                showCursor: !0,
                showKeyboard: !0,
                showPlaceholder: !1
            }), this.triggerEvent("keyboardStatus", {
                keyboardShow: !0
            });
        },
        hide: function() {
            var t = !1;
            0 == this.data.content.length && (t = !0), this.setData({
                showCursor: !1,
                showKeyboard: !1,
                showPlaceholder: t
            }), this.triggerEvent("keyboardStatus", {
                keyboardShow: !1
            });
        },
        getContent: function() {
            return this.data.content;
        },
        setDefaultContent: function(t) {
            this.setData({
                content: t,
                showPlaceholder: null == t || 0 == t.length
            }), this._stopKeyEvent();
        },
        clearInput: function() {
            this.setDefaultContent(""), this.hide();
        }
    }
});