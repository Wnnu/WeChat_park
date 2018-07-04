function t(t) {
    wx.getNetworkType({
        success: function(n) {
            t(n.networkType);
        }
    });
}

function n() {
    var t = wx.getSystemInfoSync();
    return {
        adt: encodeURIComponent(t.model),
        scl: t.pixelRatio,
        scr: t.windowWidth + "x" + t.windowHeight,
        lg: t.language,
        fl: t.version,
        jv: encodeURIComponent(t.system),
        tz: encodeURIComponent(t.platform)
    };
}

function e() {
    try {
        return wx.getStorageSync(h.prefix + "auid");
    } catch (t) {}
}

function a() {
    try {
        var t = i();
        return wx.setStorageSync(h.prefix + "auid", t), t;
    } catch (t) {}
}

function r() {
    try {
        return wx.getStorageSync(h.prefix + "ssid");
    } catch (t) {}
}

function o() {
    try {
        var t = "s" + i();
        return wx.setStorageSync(h.prefix + "ssid", t), t;
    } catch (t) {}
}

function i(t) {
    for (var n = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], e = 10; 1 < e; e--) {
        var a = Math.floor(10 * Math.random()), r = n[a];
        n[a] = n[e - 1], n[e - 1] = r;
    }
    for (e = a = 0; 5 > e; e++) a = 10 * a + n[e];
    return (t || "") + (a + "") + +new Date();
}

function s() {
    try {
        var t = getCurrentPages(), n = "/";
        return 0 < t.length && (n = t.pop().__route__), n;
    } catch (t) {
        console.log("get current page path error:" + t);
    }
}

function c() {
    var t = {
        dm: "wechat.apps.xx",
        url: s(),
        pvi: "",
        si: "",
        ty: 0
    };
    return t.pvi = function() {
        var n = e();
        return n || (n = a(), t.ty = 1), n;
    }(), t.si = function() {
        var t = r();
        return t || (t = o()), t;
    }(), t;
}

function u() {
    var e = n();
    return t(function(t) {
        try {
            wx.setStorageSync(h.prefix + "ntdata", t);
        } catch (t) {}
    }), e.ct = wx.getStorageSync(h.prefix + "ntdata") || "4g", e;
}

function p() {
    var t, n = f.Data.userInfo, e = [];
    for (t in n) n.hasOwnProperty(t) && e.push(t + "=" + n[t]);
    return n = e.join(";"), {
        r2: h.app_id,
        r4: "wx",
        ext: "v=" + h.version + (null !== n && "" !== n ? ";ui=" + encodeURIComponent(n) : "")
    };
}

var h = {
    app_id: "",
    event_id: "",
    api_base: "https://pingtas.qq.com/pingd",
    prefix: "_mta_",
    version: "1.3.5",
    stat_share_app: !1,
    stat_pull_down_fresh: !1,
    stat_reach_bottom: !1
}, f = {
    App: {
        init: function(t) {
            "appID" in t && (h.app_id = t.appID), "eventID" in t && (h.event_id = t.eventID), 
            "statShareApp" in t && (h.stat_share_app = t.statShareApp), "statPullDownFresh" in t && (h.stat_pull_down_fresh = t.statPullDownFresh), 
            "statReachBottom" in t && (h.stat_reach_bottom = t.statReachBottom), o(), "lauchOpts" in t && (f.Data.lanchInfo = t.lauchOpts, 
            f.Data.lanchInfo.landing = 1);
        }
    },
    Page: {
        init: function() {
            var t = getCurrentPages()[getCurrentPages().length - 1];
            t.onShow && function() {
                var n = t.onShow;
                t.onShow = function() {
                    f.Page.stat(), n.call(this, arguments);
                };
            }(), h.stat_pull_down_fresh && t.onPullDownRefresh && function() {
                var n = t.onPullDownRefresh;
                t.onPullDownRefresh = function() {
                    f.Event.stat(h.prefix + "pulldownfresh", {
                        url: t.__route__
                    }), n.call(this, arguments);
                };
            }(), h.stat_reach_bottom && t.onReachBottom && function() {
                var n = t.onReachBottom;
                t.onReachBottom = function() {
                    f.Event.stat(h.prefix + "reachbottom", {
                        url: t.__route__
                    }), n.call(this, arguments);
                };
            }(), h.stat_share_app && t.onShareAppMessage && function() {
                var n = t.onShareAppMessage;
                t.onShareAppMessage = function() {
                    return f.Event.stat(h.prefix + "shareapp", {
                        url: t.__route__
                    }), n.call(this, arguments);
                };
            }();
        },
        stat: function() {
            if ("" != h.app_id) {
                var t = [], n = p(), e = [ c(), n, u() ];
                f.Data.lanchInfo && (e.push({
                    ht: f.Data.lanchInfo.scene,
                    rdm: "/",
                    rurl: f.Data.lanchInfo.path
                }), f.Data.lanchInfo.query && f.Data.lanchInfo.query._mta_ref_id && e.push({
                    rarg: f.Data.lanchInfo.query._mta_ref_id
                }), 1 == f.Data.lanchInfo.landing && (n.ext += ";lp=1", f.Data.lanchInfo.landing = 0)), 
                e.push({
                    rand: +new Date()
                }), n = 0;
                for (var a = e.length; n < a; n++) for (var r in e[n]) e[n].hasOwnProperty(r) && t.push(r + "=" + (void 0 === e[n][r] ? "" : e[n][r]));
                wx.request({
                    url: h.api_base + "?" + t.join("&").toLowerCase()
                });
            }
        }
    },
    Event: {
        stat: function(t, n) {
            if ("" != h.event_id) {
                var e = [], a = c(), r = p();
                a.dm = "wxapps.click", a.url = t, r.r2 = h.event_id;
                var o, i = void 0 === n ? {} : n, s = [];
                for (o in i) i.hasOwnProperty(o) && s.push(encodeURIComponent(o) + "=" + encodeURIComponent(i[o]));
                for (i = s.join(";"), r.r5 = i, i = 0, r = (a = [ a, r, u(), {
                    rand: +new Date()
                } ]).length; i < r; i++) for (var f in a[i]) a[i].hasOwnProperty(f) && e.push(f + "=" + (void 0 === a[i][f] ? "" : a[i][f]));
                wx.request({
                    url: h.api_base + "?" + e.join("&").toLowerCase()
                });
            }
        }
    },
    Data: {
        userInfo: null,
        lanchInfo: null
    }
};

module.exports = f;