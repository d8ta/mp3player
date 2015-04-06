var player = window.player || {};

(function (ns) {
    "use strict";

    // constructor function
    var PlayerModel = function() { 

    	this._audio = new Audio();
    	this._audio.controls = false;
    	this._audio.autoplay = false;
    	this._audio.preload = "metadata";
    	window.document.body.appendChild(this._audio);

    	this.getTrackInfo();  //calls getTrackInfo from prototype
    	this.playTitle();
    	this.stopTitle();

    	// trackarray
    	this._allTracks = null;

    	// show duration of the audiofile
    	this.getSongDuration();
    	this.timeUpdate();

    	var self = this; // because of needing another scope

    	// eventlistener for playhead
        this._audio.addEventListener('timeupdate', function (event) {
            $(self).trigger('timeUpdate');
        });


        // eventlistener for songduration and time left of song
        this._audio.addEventListener('getSongDuration',function (event) {
			$(self).trigger('getSongDuration');	
        });



    };

    PlayerModel.prototype = {

	    getTrackInfo: function() {

	    var self = this;
		    $.getJSON('data/_tracklist.json', function (data) { 

		    	self._allTracks = data.tracks; //loads the array from the JSON file
		    	self._currentSong = 0;
		    	self._audio.src = self._allTracks[self._currentSong].url;

		        var output = "<div>";
		        for (var i in data.tracks) {
		            output += "<p class='trackList'>"
		            + data.tracks[i].title + " ("
		            + data.tracks[i].artist + ")"
		    		+ "</p>";
		        }

		        output += "</div>";
		        document.getElementById("trackinfos").innerHTML = output;
		    })
	    
	    },

	    playTitle: function () {
			this._audio.play();	
			console.log('play')
	    },	

	    stopTitle: function () {
			this._audio.pause();
			console.log('pause')
		},

		forwardTitle: function() { 
			this._currentSong = (this._currentSong + 1) % this._allTracks.length;
			this._audio.src = this._allTracks[this._currentSong].url;
			this._audio.play();
			console.log('>>')
		},
		
		backwardTitle: function() {
			this._currentSong = ((this._currentSong - 1) + this._allTracks.length) % this._allTracks.length;
			this._audio.src = this._allTracks[this._currentSong].url;
			this._audio.play();
			console.log('<<')
		},

		shuffleTitle: function() {
			this._allTracks = _.shuffle(this._allTracks);
			console.log('shuffle')
		},

		setVolume: function(value) {
			this._audio.volume = value;
			console.log('volume changed')
		},

		getSongDuration: function() {
			// songtime in min:sec format
			var duration = this._audio.currentTime.toFixed(0);
		    var sec = Math.floor( duration );    
		    var min = Math.floor( sec / 60 );
		    min = min >= 10 ? min : '0' + min;    
		    sec = Math.floor( sec % 60 );
		    sec = sec >= 10 ? sec : '0' + sec; 		    

			// time left 
		    var timeLeft = this._audio.duration - this._audio.currentTime.toFixed(0);
		    var secLeft = Math.floor( timeLeft );    
		    var minLeft = Math.floor( secLeft / 60 );
		    minLeft = minLeft >= 10 ? minLeft : '0' + minLeft;    
		    secLeft = Math.floor( secLeft % 60 );
		    secLeft = secLeft >= 10 ? secLeft : '0' + secLeft; 

		    console.log('songtime: ' + this._audio.currentTime.toFixed(1) + ' sec');

		    // show label
		    $('#time').html('Played: ' + min + ':' + sec);
		    $('#timeLeft').html('Left:  ' + minLeft + ':' + secLeft);
		    // $('#time').html(this._audio.currentTime.toFixed(0) + ' / ' + this._audio.currentTime.toFixed(1));

		    return this._audio.duration;
    	},

    	timeUpdate: function() {
		    // transform to percent value
		    var percentOfSong = 100 * (this._audio.currentTime / this.getSongDuration());
		    var durationPercent = percentOfSong.toFixed(0);
			playhead.style.marginLeft = durationPercent + "%";
	    	
	    	console.log('duration: ' + durationPercent + '%');			 
    	},

	};

    ns.PlayerModel = PlayerModel;
    
})(player);






