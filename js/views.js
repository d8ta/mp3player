var player = window.player || {};

(function (ns) {
    "use strict";

    //Abstract View to inherit from
    var AbstractView = function (model, $element) {
    	this.model = model;
    	this.$element = $element;
    	$(model).on('change', this.render.bind(this));
    };


    AbstractView.prototype = {
    	render: function() {
    	}
    };

    //View for trackinformations
    var TrackInfoView = function (model, $element) {
    	AbstractView.apply(this, arguments);
    };

    TrackInfoView.prototype = Object.create(AbstractView.prototype);
    TrackInfoView.prototype.constructor = TrackInfoView;
    TrackInfoView.prototype.render = function() {
    	this.$element.html(this.model.getTrackInfo());
    };

    //Audio controls
    var AudioControls = function (model, $element, controller) {
    	AbstractView.apply(this, arguments);
    	$element.find('.playBtn').on('click', model.playTitle.bind(model));
    	$element.find('.stopBtn').on('click', model.stopTitle.bind(model));
    	$element.find('.forwardBtn').on('click', model.forwardTitle.bind(model));
    	$element.find('.backwardBtn').on('click', model.backwardTitle.bind(model));
    	$element.find('.shuffleBtn').on('click', model.shuffleTitle.bind(model));

    	$element.find('#volumeSlider').on('change', function(){
    		this.model.setVolume($element.find('#volumeSlider').data("interface").getValue());
    	}.bind(this));

        //trackhead
        $element.find('#trackhead').on('change', function() {
            this.model.timeUpdate();
        }.bind(model));

    };

    AudioControls.prototype = Object.create(AbstractView.prototype);
    AudioControls.prototype.constructor = AudioControls;
    AudioControls.prototype.render = function () {
    	this.$element.html(this.model.playTitle());
    };


    ns.TrackInfoView = TrackInfoView;
    ns.AudioControls = AudioControls;

})(player);