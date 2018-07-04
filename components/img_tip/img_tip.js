Component({
    properties: {
        img: {
            type: String,
            default: "",
            observer: function(t, i) {
                this.setData({
                    imgSrc: t
                });
            }
        }
    },
    data: {
        imgSrc: ""
    },
    attached: function() {
        this.setData({
            imgSrc: this.data.img
        });
    },
    methods: {
        hideTip: function() {
            this.triggerEvent("hideTip");
        }
    }
});