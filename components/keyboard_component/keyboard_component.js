Component({
    properties: {},
    data: {
        prefixListLine1: [ "京", "沪", "粤", "津", "冀", "豫", "云", "辽", "黑", "湘" ],
        prefixListLine2: [ "皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘" ],
        prefixListLine3: [ "晋", "蒙", "陕", "吉", "闽", "贵", "渝", "川" ],
        prefixListLine4: [ "青", "藏", "琼", "宁", "使" ],
        suffixListLine1: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ],
        suffixListLine2: [ "Q", "W", "E", "R", "T", "Y", "U", "O", "P", "A" ],
        suffixListLine3: [ "S", "D", "F", "G", "H", "J", "K", "L", "X", "Z" ],
        suffixListLine4: [ "C", "V", "B", "N", "M" ],
        lastListLine: [ "港", "澳", "学" ],
        lpn: "",
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
        enableOKey: !1,
        enableNumKey: !1,
        enableLastKey: !1,
        showKeyboard: !1,
        showEnergyIcon: !1,
        showPlaceholder: !0,
        showCursor: !1,
        showPrefixKeyboard: !0,
        showSuffixKeyboard: !1,
        other: ""
    },
    methods: {
        _keyPressHandler: function(e) {
            console.log(e);
            var t = this, n = e.currentTarget;
            if (!this._enableTap(n.dataset)) return !1;
            var i = wx.createSelectorQuery().in(this);
            i.select("#" + n.id).boundingClientRect(), i.exec(function(e) {
                console.log(e);
                var i = e[0];
                t.setData({
                    keyWidth: i.width,
                    keyHeight: i.height,
                    keyLeft: n.offsetLeft,
                    keyTop: n.offsetTop
                }), t._showHoverImg(n.offsetLeft, n.offsetTop, i.width, i.height, i.dataset.name);
            });
        },
        _keyUpHandler: function(e) {
            console.log(e), this._stopKeyEvent(e.currentTarget.dataset);
        },
        _showHoverImg: function(e, t, n, i, s) {
            var a = n * (105 / 64), o = a * (192 / 102), h = e - (a - n) / 2 - .4, r = t + i - o + 1;
            this.setData({
                hoverImg: {
                    left: h + "px",
                    top: r + "px",
                    width: a + "px",
                    height: o + "px",
                    lineHeight: o - i + "px",
                    text: s,
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
        _inputLpnHandler: function(e) {
            var t = this, n = t.data.lpn;
            return !(n.length >= 8) && (!(n.indexOf("港") > 0 || n.indexOf("澳") > 0 || n.indexOf("学") > 0) && void t.setData({
                lpn: n + e
            }));
        },
        _deleteHandler: function(e) {
            var t = this.data.lpn;
            this.setData({
                lpn: 0 == t.length ? "" : t.substring(0, t.length - 1)
            }), this._stopKeyEvent(e.currentTarget.dataset);
        },
        _stopKeyEvent: function(e) {
            this._hideHoverImg()
            if (!this._enableTap(e)) return !1;
            this._inputLpnHandler(e && e.name ? e.name : "");
            var t = this.data.lpn;
            return this.setData({
                showPrefixKeyboard: t.length < 1,
                showSuffixKeyboard: t.length >= 1,
                showEnergyIcon: t.length > 7,
                enableNumKey: t.length > 1,
                enableOKey: 1 == t.length,
                enableLastKey: t.length >= 6
            }), console.log(this.data), this.triggerEvent("lpnChangeEvent", {
                lpn: t
            }), !0;
        },
        _enableTap: function(e) {
            return null == e || null == e.keyEnable || e.keyEnable;
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
            var e = !1;
            0 == this.data.lpn.length && (e = !0), this.setData({
                showCursor: !1,
                showKeyboard: !1,
                showPlaceholder: e
            }), this.triggerEvent("keyboardStatus", {
                keyboardShow: !1
            });
        },
        getLpn: function() {
            return this.data.lpn;
        },
        setDefaultLpn: function(e) {
            this.setData({
                lpn: e,
                showPlaceholder: null == e || 0 == e.length
            }), this._stopKeyEvent();
        },
        clearInput: function() {
            this.setDefaultLpn(""), this.hide();
        }
    }
});