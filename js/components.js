var player = window.player || {};

player.mySlider = (function (ns, $) {
    function Slider(config) { 

        this.$view = config.view;
        // expand sliderA and B
        this.$view.append('<div class="track"></div><div class="thumb"></div>');
        // finds track and thumb
        this.$track = this.$view.find('.track');
        this.$thumb = this.$view.find('.thumb');
        //checks config
        this.value = (isNaN(config.value) ? 0 : config.value);
        this.minValue = (isNaN(config.min) ? 0 : config.min);
        this.maxValue = (isNaN(config.max) ? 100 : config.max);
        // width of thumb and track
        this.trackWidth = this.$track.width();
        this.thumbWidth = this.$thumb.width();

        // offset of the track
        this.trackLeft = this.$track.offset().left;
        // this = $view Object, also beide slider aus dem html
        this.$view.on('mousedown', this.onMouseDownHandler.bind(this));
        //init value
        //temporarily api
        this.$view.data('interface', {
            setValue: this.setValue.bind(this),
            getValue: this.getValue.bind(this)
        });

        this.setValue(this.value);
    };

    Slider.prototype.setValue = function setValue(newValue) {
        this.value = newValue;
        // position update

        this.$thumb.css('left', this.valueToPosition(newValue));
        this.$view.trigger('change');
    };

    Slider.prototype.onMouseDownHandler = function onMouseDownHandler(e) {
        this.$view.addClass('active');
        var dragOffsetX = 0;
        if (e.target == this.$thumb[0]) {
            //thumb
            dragOffsetX = e.pageX - this.$thumb.offset().left;
        } else {
            //track
            dragOffsetX = this.thumbWidth / 2;
            this.setValueByPageX(e.pageX, dragOffsetX);
        }

        var that = this; //now we save this instead of bind
        $(window).on('mousemove', function (e) {
            that.setValueByPageX(e.pageX, dragOffsetX);
            e.preventDefault();
        });

        $(window).on('mouseup', function (e) {
            $(window).off('mousemove').off('mouseup');
            that.$view.removeClass('active');
            e.preventDefault();
        });
        e.preventDefault();
    };

    Slider.prototype.getValue = function getValue() {
        return this.value;
    };

    Slider.prototype.valueToPosition = function valueToPosition(value) {
        position = (value - this.minValue) / (this.maxValue - this.minValue) * (this.trackWidth - this.thumbWidth); //our thumb position
        return position;
    };

    Slider.prototype.positionToValue = function positionToValue(position) {
        return position / (this.trackWidth - this.thumbWidth) * (this.maxValue - this.minValue) + this.minValue;
    };

    Slider.prototype.setValueByPageX = function setValueByPageX(pageX, dragOffsetX) {
        //min: 0
        //max: this.trackWidth - thumbWidth
        var position = Math.max(0, Math.min(pageX - this.trackLeft - dragOffsetX, this.trackWidth - this.thumbWidth));
        this.setValue(this.positionToValue(position));
    };

    return {
        Slider: Slider
    }
})(player, jQuery);





