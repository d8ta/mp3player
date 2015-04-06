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

    	//show duration of the audiofile
    	this.getSongDuration();
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
			// console.log('play')
			this.timeUpdate();
	    },	

	    stopTitle: function () {
			this._audio.pause();
			// console.log('pause')
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
			var duration = this._audio.duration;
		    var sec = Math.floor( duration );    
		    var min = Math.floor( sec / 60 );
		    min = min >= 10 ? min : '0' + min;    
		    sec = Math.floor( sec % 60 );
		    sec = sec >= 10 ? sec : '0' + sec; 		    

			// time left 
		    var timeLeft = duration - this._audio.currentTime;
		    var secLeft = Math.floor( duration );    
		    var minLeft = Math.floor( secLeft / 60 );
		    minLeft = minLeft >= 10 ? minLeft : '0' + minLeft;    
		    secLeft = Math.floor( secLeft % 60 );
		    secLeft = secLeft >= 10 ? secLeft : '0' + secLeft;    

		    // show label
		    $('#time').html(min + ':' + sec + ' / ' + minLeft + ':' + secLeft);
		    
		    return duration;
    	},

    	setHead: function() {
    		var music = document.getElementById('playhead');
			music.addEventListener("timeupdate", timeUpdate, false);
    	},

    	timeUpdate: function() {
		    // transform to percent value
		    var percentOfSong = 100 * (this._audio.currentTime / this.getSongDuration());
		    var durationPercent = percentOfSong.toFixed(0);
			playhead.style.marginLeft = durationPercent + "%";

	    	// test
	    	console.log(durationPercent);			 
	    	// test

    	},

	};

    ns.PlayerModel = PlayerModel;
    
})(player);






