var player = window.player || {};

(function (ns) {
    "use strict";

    //all the logic
    var PlayerModel = function() { 

    	this._audio = new Audio();
    	this._audio.controls = false;
    	this._audio.autoplay = false;
    	this._audio.preload = "metadata";
    	window.document.body.appendChild(this._audio);

    	this.getTrackInfo();  //calls getTrackInfo from prototype
    	this.playTitle();
    	this.stopTitle();

    	//trackarray
    	this._allTracks = null;

    	//duration of the audiofile
    	this.timeUpdate();
    }

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

		timeUpdate: function() {
			var duration = this._audio.duration;
			var playPercent = 100 * (this._audio.currentTime / duration);
			trackhead.style.marginLeft = playPercent + "%";
			console.log('duration/percent: ' + duration + '/' + playPercent);
		},
	};

    ns.PlayerModel = PlayerModel;
    
})(player);





