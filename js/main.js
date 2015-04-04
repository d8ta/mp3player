var player = window.player || {};

(function (ns) {
    "use strict";


    $(".slider").each(function(){
        var $slider = $(this);

        var slider = new ns.mySlider.Slider({
            view: $slider,
            min: $slider.data('min'),
            max: $slider.data('max'),
            value: parseFloat($slider.attr('data-value'))
        });
    });
    
    //present the views and controls
    var model = new ns.PlayerModel();
    var trackView = new ns.TrackInfoView(model, $('#trackinfos'));
    var audioControls = new ns.AudioControls(model, $('#audioControls'), null);

})(player);