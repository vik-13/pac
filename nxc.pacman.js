(function(){
	var initializing = false,
		fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	
	Object.subClass = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var proto = new this();
		initializing = false;
		
		for( var name in prop ) {
			proto[name] = typeof prop[name] == "function" &&
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn){
				return function() {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);       
					this._super = tmp;
					return ret;
				};
			})(name, prop[name]) : prop[name];
		}

		function Class() {
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}
   
		Class.prototype = proto;
		Class.constructor = Class;
		Class.subClass = arguments.callee;
		return Class;
	};
})();

Matrix = function(rows){
	var arr = [];
	for( var i = 0; i < rows; i++ ){
		arr[i] = [];
	}
	return arr;
}

Map = Object.subClass({
	'map': new Matrix(20),
	'generalBlock': false,
	'size': {
		'width': 37,
		'height': 16
	},
	'home': {
		'left': 24,
		'top': 8
	},
	'homeOut': {
		'left': 27,
		'top': 8
	},
	'init': function(){
		// 9 - wall; 8 - nxc; 7 - blocked; 6 - energy; 5 - dots;
		this.map[0] = 	[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ];
		this.map[1] = 	[ 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9 ];
		this.map[2] = 	[ 9, 5, 5, 6, 9, 5, 9, 9, 5, 9, 5, 5, 5, 9, 9, 9, 9, 9, 5, 9, 5, 9, 9, 9, 5, 9, 5, 9, 9, 5, 9, 9, 9, 5, 9, 5, 9 ];
		this.map[3] = 	[ 9, 5, 9, 9, 9, 5, 9, 5, 5, 9, 5, 9, 9, 9, 5, 5, 5, 5, 5, 9, 5, 5, 5, 9, 5, 9, 5, 5, 5, 5, 5, 5, 9, 6, 9, 5, 9 ];
		this.map[4] = 	[ 9, 5, 5, 5, 5, 5, 5, 5, 9, 9, 5, 9, 5, 5, 5, 9, 9, 9, 9, 9, 9, 9, 5, 9, 5, 9, 9, 9, 5, 9, 9, 5, 9, 9, 9, 5, 9 ];
		this.map[5] = 	[ 9, 5, 9, 9, 5, 9, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 5, 5, 5, 5, 5, 9 ];
		this.map[6] = 	[ 9, 5, 5, 5, 5, 9, 5, 9, 9, 5, 8, 5, 8, 8, 5, 5, 8, 5, 5, 5, 8, 5, 5, 8, 8, 8, 5, 0, 9, 5, 9, 5, 9, 9, 9, 5, 9 ];
		this.map[7] =	[ 9, 5, 9, 9, 5, 9, 5, 5, 5, 5, 8, 8, 5, 5, 8, 5, 5, 8, 5, 8, 5, 5, 8, 0, 0, 0, 8, 0, 9, 5, 9, 5, 9, 5, 9, 5, 9 ];
		this.map[8] = 	[ 9, 5, 9, 5, 5, 9, 9, 9, 9, 5, 8, 5, 5, 5, 8, 5, 5, 5, 8, 5, 5, 5, 8, 0, 0, 0, 7, 0, 9, 5, 5, 5, 9, 5, 9, 5, 9 ];
		this.map[9] = 	[ 9, 5, 5, 5, 5, 5, 5, 5, 9, 5, 8, 5, 9, 5, 8, 5, 5, 8, 5, 8, 5, 5, 8, 0, 0, 0, 8, 0, 9, 5, 9, 9, 9, 5, 9, 5, 9 ];
		this.map[10] = 	[ 9, 5, 9, 9, 9, 5, 9, 5, 9, 5, 8, 5, 9, 5, 8, 5, 8, 5, 5, 5, 8, 5, 5, 8, 8, 8, 5, 0, 9, 5, 9, 5, 5, 5, 5, 5, 9 ];
		this.map[11] = 	[ 9, 5, 9, 6, 9, 5, 9, 5, 9, 5, 5, 5, 9, 5, 5, 5, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 5, 9, 5, 9, 5, 9 ];
		this.map[12] = 	[ 9, 5, 9, 5, 9, 5, 9, 5, 5, 5, 5, 9, 9, 5, 9, 5, 5, 5, 0, 5, 5, 5, 9, 5, 5, 9, 5, 9, 9, 5, 5, 5, 9, 5, 9, 5, 9 ];
		this.map[13] = 	[ 9, 5, 9, 5, 9, 5, 9, 9, 9, 5, 9, 9, 5, 5, 9, 5, 9, 9, 9, 9, 9, 5, 5, 9, 9, 9, 5, 9, 6, 5, 9, 9, 9, 5, 9, 5, 9 ];
		this.map[14] = 	[ 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9 ];
		this.map[15] = 	[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ];
		
		this.generalBlock = document.getElementById( 'pacman' );
		if( this.generalBlock != null ){
			this.setStyleToGeneralBlock();
			this.show();
		}
	},
	'show': function(){
		for( var i = 0; i < this.size.height; i++ ){
			for( var j = 0; j < this.size.width; j++ ){
				if( this.map[i][j] != 0 && this.map[i][j] != 6 && this.map[i][j] != 5 )
					this.generalBlock.appendChild( this.createNewElement( this.map[i][j], i, j ) );
			}
		}
	},
	'setStyleToGeneralBlock': function(){
		this.generalBlock.style.position = 'relative';
		this.generalBlock.style.background = '#05013d';
		this.generalBlock.style.width = ( this.size.width * 16 ) + 'px';
		this.generalBlock.style.height = ( this.size.height * 16 + 26 ) + 'px';
		this.generalBlock.style.margin = '100px auto';
	},
	'createNewElement': function( elementIndex, i, j ){
		var element;
		element = document.createElement('div');
		element.style.position = 'absolute';
		element.style.width = 16 + 'px';
		element.style.height = 16 + 'px';
		element.style.margin = 0 + 'px';
		element.style.padding = 0 + 'px';
		element.style['font-size'] = 1 + 'px';
		element.style.background = 'white';
		element.style.left = ( j * 16 ) + 'px';
		element.style.top = ( i * 16 ) + 'px';
		switch( elementIndex ){
			case 7:
				element.style.background = '#444444';
				break;
			case 8:
				element.style.background = 'white';
				break;
			case 9:
				element.style.background = 'blue';
				break;
		}
		return element;
	}
});

Player = Object.subClass({
	'imgSrc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAQCAYAAACBSfjBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNDFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGQzE5MDk3OTg0MUExMUUxQjVFRkY2M0E2NTM2QTQ5RCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGQzE5MDk3ODg0MUExMUUxQjVFRkY2M0E2NTM2QTQ5RCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNDFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNDFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIvPiA8L3JkZjpEZXNjcmlwdGlv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',
	'defPos': '0px 0px',
	'backPos': '16px 0px',
	'defaultPosition': {
		'left': 18,
		'top': 12
	},
	'globalPosition': {
		'left': 18,
		'top': 12
	},
	'shiftPosition': {
		'left': 0,
		'top': 0
	},
	'isAnimating': false,
	'element': false,
	'defaultDirection': {
		'left': 0,
		'top': -1
	},
	'direction': {
		'left': 0,
		'top': -1
	},
	'speed': 2.4,
	'normalSpeed': 2.4,
	'speedOnDots': 2,
	'timeOut': 30,
	'prevArrayElement': 0,
	'killed': false,
	'hasEnergy': false,
	'energieDefaultLife': 10000,
	'energieStartTime': 0,
	'actuallyKey': false,
	'color': 'yellow',
	'lastUpdate': new Date().getTime(),
	'lastUpdateAnim': new Date().getTime(),
	'init': function(){
		var self = this;
		this.createNewElement();
		map.generalBlock.appendChild( this.element );
		window.setInterval( function(){ self.iteration(); }, 30 );
	},
	'setDirectionByKey': function( key ){
		switch( key ){
			case 37:
				this.direction.left = -1;
				this.direction.top = 0;
				this.backPos = '32px 0px';
				break;
			case 38:
				this.direction.left = 0;
				this.direction.top = -1;
				this.backPos = '16px 0px';
				break;
			case 39:
				this.direction.left = 1;
				this.direction.top = 0;
				this.backPos = '64px 0px';
				break;
			case 40:
				this.direction.left = 0;
				this.direction.top = 1;
				this.backPos = '48px 0px';
				break;
		}
	},
	'winnerHandler': function(){
		if( !this.killed ){
			this.killed = true;
			var self = this;
			window.setTimeout(
				function(){
					document.location.href = 'http://nxcgroup.com';
				},
				1000
			);
		}
		
	},
	'calculateNewDirection': function(){
		var nextField, isWin;
		this.speed = this.normalSpeed;
		this.setDirectionByKey( keyboard.lastKey );
		nextField = map.map[this.globalPosition.top + this.direction.top][this.globalPosition.left + this.direction.left];
		if( nextField != 9 && nextField != 8 && nextField != 7 ){
			this.actuallyKey = keyboard.lastKey;
			this.isAnimating = true;
		} else {
			this.setDirectionByKey( this.actuallyKey );
			nextField = map.map[this.globalPosition.top + this.direction.top][this.globalPosition.left + this.direction.left];
			if( nextField != 9 && nextField != 8 && nextField != 7 ){
				this.isAnimating = true;
			}
		}
		if( nextField == 5 ){
			isWin = dots.removeDot( this.globalPosition.left + this.direction.left, this.globalPosition.top + this.direction.top );
			if( isWin ){
				this.winnerHandler();
				return false;
			}
			this.speed = this.speedOnDots;
		}
		if( nextField == 6 ){
			this.hasEnergy = true;
			blinky.gotEnergyHandler();
			pinky.gotEnergyHandler();
			inky.gotEnergyHandler();
			clyde.gotEnergyHandler();
			energies.removeEnergy( this.globalPosition.left + this.direction.left, this.globalPosition.top + this.direction.top );
			this.energieStartTime = new Date().getTime();
		}
		if( this.isAnimating ){
			this.globalPosition = {
				'left': this.globalPosition.left + this.direction.left,
				'top': this.globalPosition.top + this.direction.top
			},
			this.shiftPosition = {
				'left': -1 * this.direction.left * 16,
				'top': -1 * this.direction.top * 16
			};
		}
	},
	'resetToDefault': function(){
		var isLive = footer.removeLive();
		if( isLive ){
			this.killed = false;
			this.globalPosition.left = this.defaultPosition.left;
			this.globalPosition.top = this.defaultPosition.top;
			this.direction.left = this.defaultDirection.left;
			this.direction.top = this.defaultDirection.top;
			this.shiftPosition.left = 0;
			this.shiftPosition.top = 0;
			this.isAnimating = false;
			this.actuallyKey = false;
			keyboard.lastKey = false;
			this.updatePosition();
			blinky.resetToDefault();
			pinky.resetToDefault();
			inky.resetToDefault();
			clyde.resetToDefault();
		} else {
			this.gameOver();
		}
	},
	'gameOver': function(){
		var element = document.createElement('div');
		element.style.position = 'absolute';
		element.style.height = 70 + 'px';
		element.style.width = 350 + 'px';
		element.style.textAlign = 'center';
		element.style.fontSize = 64 + 'px';
		element.style.background = 'black';
		element.style.color = 'darkred';
		element.style.left = '120px';
		element.style.top = '18px';
		element.style.zIndex = 1000;
		element.innerHTML = 'Game Over';
		map.generalBlock.appendChild( element );
	},
	'lostLive': function(){
		if( !this.killed ){
			this.killed = true;
			var self = this;
			window.setTimeout(
				function(){
					self.resetToDefault();
				},
				1000
			);
		}
	},
	'checkCollision': function(){
		if( this.globalPosition.left == blinky.globalPosition.left && this.globalPosition.top == blinky.globalPosition.top ){
			if( !blinky.killed ){
				if( this.hasEnergy ){
					blinky.killed = true;
					blinky.goIn = true;
					footer.addScore( 2000 );
				} else {
					this.lostLive();
				}
			}
		}
		if( this.globalPosition.left == pinky.globalPosition.left && this.globalPosition.top == pinky.globalPosition.top ){
			if( !pinky.killed ){
				if( this.hasEnergy ){
					pinky.killed = true;
					pinky.goIn = true;
					footer.addScore( 1000 );
				} else {
					this.lostLive();
				}
			}
		}
		if( this.globalPosition.left == inky.globalPosition.left && this.globalPosition.top == inky.globalPosition.top ){
			if( !inky.killed ){
				if( this.hasEnergy ){
					inky.killed = true;
					inky.goIn = true;
					footer.addScore( 1000 );
				} else {
					this.lostLive();
				}
			}
		}
		if( this.globalPosition.left == clyde.globalPosition.left && this.globalPosition.top == clyde.globalPosition.top ){
			if( !clyde.killed ){
				if( this.hasEnergy ){
					clyde.killed = true;
					clyde.goIn = true;
					footer.addScore( 1000 );
				} else {
					this.lostLive();
				}
			}
		}
	},
	'checkEnergy': function(){
		if( new Date().getTime() - this.energieStartTime >= this.energieDefaultLife ){
			this.hasEnergy = false;
			blinky.lostEnergyHandler();
			pinky.lostEnergyHandler();
			inky.lostEnergyHandler();
			clyde.lostEnergyHandler();
		}
	},
	'iteration': function(){
		if( this.killed ){
			this.killedAnimate();
		} else {
			this.checkCollision();
			if( this.hasEnergy ){
				this.checkEnergy();
			}
			if( !this.isAnimating ){
				this.calculateNewDirection();
			}
			if( this.isAnimating ){
				var timeShift = new Date().getTime() - this.lastUpdate;
				if( timeShift == 0 )
					timeShift = 1;
				var nextPosition = {
					'left': this.shiftPosition.left + parseInt( this.direction.left * ( this.speed * ( timeShift / this.timeOut ) ) ),
					'top': this.shiftPosition.top + parseInt( this.direction.top * ( this.speed * ( timeShift / this.timeOut ) ) )
				};
				if( nextPosition.left != this.shiftPosition.left || nextPosition.top != this.shiftPosition.top ){
					if( this.shiftPosition.left > 0 && nextPosition.left <= 0 ){
						nextPosition.left = 0;
						this.isAnimating = false;
					} else if( this.shiftPosition.left < 0 && nextPosition.left >= 0 ){
						nextPosition.left = 0;
						this.isAnimating = false;
					} else if( this.shiftPosition.top < 0 && nextPosition.top >= 0 ){
						nextPosition.top = 0;
						this.isAnimating = false;
					} else if( this.shiftPosition.top > 0 && nextPosition.top <= 0 ){
						nextPosition.top = 0;
						this.isAnimating = false;
					}
					this.shiftPosition.left = nextPosition.left;
					this.shiftPosition.top = nextPosition.top;
					this.updatePosition();
				}
			}
		}
		this.lastUpdate = new Date().getTime();
	},
	'killedAnimate': function(){
		var currentPosition = this.element.style.backgroundPosition.split( ' ' );
		currentPosition = parseInt( currentPosition[0] );
		var nextPosition = currentPosition + 16;
		if( nextPosition > 64 )
			nextPosition = 0;
		this.element.style.backgroundPosition = nextPosition + 'px 0px';
	},
	'updatePosition': function(){
		this.element.style.left = ( this.globalPosition.left * 16 + this.shiftPosition.left ) + 'px';
		this.element.style.top = ( this.globalPosition.top * 16 + this.shiftPosition.top ) + 'px';
		if( new Date().getTime() - this.lastUpdateAnim > 100 ){
			if( this.element.style.backgroundPosition != this.defPos )
				this.element.style.backgroundPosition = this.defPos;
			else
				this.element.style.backgroundPosition = this.backPos;
			this.lastUpdateAnim = new Date().getTime();
		}
	},
	'createNewElement': function(){
		this.element = document.createElement('div');
		this.element.style.position = 'absolute';
		this.element.style.width = 16 + 'px';
		this.element.style.height = 16 + 'px';
		this.element.style['font-size'] = 1 + 'px';
		this.element.style.background = 'url( ' + this.imgSrc + ' )';
		this.element.style.left = ( this.globalPosition.left * 16 ) + 'px';
		this.element.style.top = ( this.globalPosition.top * 16 ) + 'px';
		this.element.style.zIndex = 100;
	}
});

Ghost = Object.subClass({
	'imgSrc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1M0FCRjM0ODQxRDExRTFBNzlFRDBDNTQ2OTU4NjM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ1M0FCRjM1ODQxRDExRTFBNzlFRDBDNTQ2OTU4NjM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDUzQUJGMzI4NDFEMTFFMUE3OUVEMEM1NDY5NTg2MzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDUzQUJGMzM4NDFEMTFFMUE3OUVEMEM1NDY5NTg2MzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5m3c4bAAABs0lEQVR42ozTOUgcURzH8dlDZT1QUUSxiRo1hcc2Hlhok7UIaSzSBCLYhoCiWAgGIlarIFYKJiAeWNh6tSlcRYwiJNosARXRImhwvV2PfB/7GxiWJTrw4f92Z97/vff/z3iDXq+V4MpDGaK4xi32cBn/YPzsJLSiUwnOcYcHbGMI8/9L0IEB7GMWy7jSc82YQh+GEyXo1ORxtOMsLvk3fMQgwlgwf7p1swTd/NjGOuPXeOmYXIjPLpJi0TwLn70DlzLnMxjjsP2Mc3CMSUzjKyoQYYGZe8tqZOzHqtlBOd5jg8lTj0RV3SRp0Nkr8QcZLFJATEemvQOPjnLG5CPiW9QpwXdcqKi13J9jkYA6c2AnOMRvNKEaK6q+85oR0883amvULuJfTKgWr6ynL0pgZaHY2YVdxYxnJNhS9DkTvFAMKyZrR/bldiSPKGY7E9Tgp87fhjV8Ma3VfTP+hU8IYRMtSPUE3O40vXkurRJEihWrdj1O0YNcLbSpNr7DotnBDX6gFL1YsmIviklwglG1rQsj+v0BO+YLdelzTkWRVt7RJ2zXwq9OhXVks6sqHTn0T4ABAMIRZdagz1NVAAAAAElFTkSuQmCC',
	'imgSrcLoosed': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRCNjM1OUE0ODQxRTExRTE4RUQ1OEM3NjUyQTRCNkZEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRCNjM1OUE1ODQxRTExRTE4RUQ1OEM3NjUyQTRCNkZEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REI2MzU5QTI4NDFFMTFFMThFRDU4Qzc2NTJBNEI2RkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REI2MzU5QTM4NDFFMTFFMThFRDU4Qzc2NTJBNEI2RkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4VRbsoAAAB7UlEQVR42pSTvWsUURTFz307yWhWSHYDoqv5ICoGjCuClQg22mijpja1kCZY+A+oSFJamCpFsFXByr8gRcDAYmOxRvIh0cbEXWLI7s7My7mTuzAsU+jAb9/c+9497+55byQI55HznCaXSIcckjbZIge9C4OeuI/MkFkyYYUq4kmNvCGfLM4VmCMLyH/OkTvkGXndTbrMgqeUfRVRM2IjcWYqhjAXkiBk+JLc784VXHBXxwssXmT/pSv4hfPYQ4ITaOIkR6DMjm/7zxiSCDso9wuSYabfk0j/gpAn3HH0LFr+cbIkzkdoSAU1V0VNruNB8hFn8Bs+aaPhZlBH6WaAuMq6Ve3zMpl23KWJfqnLFA7dME5hH6N+Axf9T1TIX0qEPIRi6qsM8Geoa2JBvVCBfTazLI/o1i6KcoB1vnWY/+OmMUKxb+4Wz3KQBfEua350BXbINhmjiG+jI+upeIk2qn0eaxjBmoyndhaOcy073tTqPfJWDdHeXKoap2ehXUka69m00lGOr0BFjc8e44aZ+a+Prg2zAmPmxf8IlLMC1zKTPqcgyZm7RwZUoEgme9S/mzfZG6tmtzI5vYFVZ8kvpEGa5J1d1Yfkg+U2yQvy3GLYJptin7NejHEz5qt9wrB4yorq5tMNctXWrRwJMABC8473Vmc3PQAAAABJRU5ErkJggg%3D%3D',
	'imgSrcEyes': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJENkJEMzBEODQyMDExRTFBNTJFQjY0QTJGOUI3RkZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJENkJEMzBFODQyMDExRTFBNTJFQjY0QTJGOUI3RkZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkQ2QkQzMEI4NDIwMTFFMUE1MkVCNjRBMkY5QjdGRkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkQ2QkQzMEM4NDIwMTFFMUE1MkVCNjRBMkY5QjdGRkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz65NbSvAAABEklEQVR42mL8//8/AyWAcfAYsGTuJYapfacYeHjZcKllAhF//vz7JyLKxbBgdQADNw8bAwtM9vHTjwwnrj2U4mbg8ANyBYH4AhCfAOLvQGwMxBFAfPc3w9/FUmJ8b//8hVgMN4CViZmBlYHNgJOFtQ/I5QTiD0C8DYj3AnEREGsA8U+WP8xvOJhZljAiOwsJPAPiSyCFQMwLxPpAbA7EKkD8CWowH7IGuAv+//vP8I/h/9V/f//HQDWBDDgOxN+A+DoQG4C8BFSz+9+//5gGMLMwMbAxMP9mY2e+A+TeQXPZJJASUBgy/mb8z8bGjBkL79/9YHj7+hsDExMj3mgDKWcBWiarwAdWyziMUuLQNQAgwAAzF2hmeWE3dwAAAABJRU5ErkJggg%3D%3D',
	'globalPosition': {
		'left': 29,
		'top': 14
	},
	'shiftPosition': {
		'left': 0,
		'top': 0
	},
	'isAnimating': false,
	'element': false,
	'prevArrayElement': 0,
	'direction': {
		'left': 0,
		'top': 0
	},
	'speed': 1.8,
	'loosedSpeed': 1.2,
	'killedSpeed': 3,
	'indexOfMissing': 1,
	'gotEnergy': false,
	'timeOut': 30,
	'killed': false,
	'hasFrozen': false,
	'startFrozen': new Date().getTime(),
	'frozingTime': 3000,
	'goOut': false,
	'goIn': false,
	'actuallyKey': false,
	'secondColor': 'darkgray',
	'color': 'darkred',
	'lastUpdate': new Date().getTime(),
	'init': function(){
		var self = this;
		this.createNewElement();
		map.generalBlock.appendChild( this.element );
		this.checkNewWay();
		window.setInterval( function(){ self.iteration(); }, 30 );
	},
	'resetToDefault': function(){
		this.globalPosition.left = this.defaultPosition.left;
		this.globalPosition.top = this.defaultPosition.top;
		this.hasFrozen = true;
		this.startFrozen = new Date().getTime();
	},
	'setGoal': function( distance ){
		var chanceToMiss = this.indexOfMissing * distance;
		var goalPoint = {
			'left': player.globalPosition.left,
			'top': player.globalPosition.top
		};
		if( this.gotEnergy ){
			goalPoint = {
				'left': this.globalPosition.left + ( this.globalPosition.left - goalPoint.left ),
				'top': this.globalPosition.top + ( this.globalPosition.top - goalPoint.top )
			};
		}
		return { 'chanceToMiss': chanceToMiss, 'goal': goalPoint };
	},
	'checkNewWay': function(){
		var possibleWays = [], possibleWaysFiltered = [], nextField, bestWay = false, bestWayLength = 10000, goalPoint = false, distance, chanceToMiss = 0, randomWay, res;
		distance = Math.sqrt( Math.pow( this.globalPosition.left - player.globalPosition.left, 2 ) + Math.pow( this.globalPosition.top - player.globalPosition.top, 2 ) );
		if( this.goOut ){
			if( this.globalPosition.left == map.homeOut.left && this.globalPosition.top == map.homeOut.top ){
				this.goOut = false;
			} else {
				chanceToMiss = 0;
				goalPoint = {
					'left': map.homeOut.left,
					'top': map.homeOut.top
				};
			}
		}
		if( this.goIn ){
			if( this.globalPosition.left == map.home.left && this.globalPosition.top == map.home.top ){
				this.goIn = false;
				this.gotEnergy = false;
				this.startFrozen = new Date().getTime();
				this.hasFrozen = true;
				this.killed = false;
			} else {
				chanceToMiss = 0;
				goalPoint = {
					'left': map.home.left,
					'top': map.home.top
				};
			}
		}
		if( !this.goOut && !this.goIn ){
			res = this.setGoal( distance );
			chanceToMiss = res.chanceToMiss;
			goalPoint = {
				'left': res.goal.left,
				'top': res.goal.top
			};
		}
		if( goalPoint.left < 0 )
			goalPoint.left = 0;
		else if( goalPoint.left >= map.size.width )
			goalPoint.left = map.size.width - 1;
		if( goalPoint.top < 0 )
			goalPoint.top = 0;
		else if( goalPoint.top >= map.size.height )
			goalPoint.top = map.size.height - 1;
		nextField = map.map[this.globalPosition.top - 1][this.globalPosition.left];
		if( ( nextField != 9 && nextField != 8 && ( nextField != 7 || this.goOut ) && nextField != 1 ) || this.goIn ){
			possibleWays.push( { 'left': 0, 'top': -1 } );
		}
		nextField = map.map[this.globalPosition.top + 1][this.globalPosition.left];
		if( ( nextField != 9 && nextField != 8 && ( nextField != 7 || this.goOut ) && nextField != 1 ) || this.goIn ){
			possibleWays.push( { 'left': 0, 'top': 1 } );
		}
		nextField = map.map[this.globalPosition.top][this.globalPosition.left - 1];
		if( ( nextField != 9 && nextField != 8 && ( nextField != 7 || this.goOut ) && nextField != 1 ) || this.goIn ){
			possibleWays.push( { 'left': -1, 'top': 0 } );
		}
		nextField = map.map[this.globalPosition.top][this.globalPosition.left + 1];
		if( ( nextField != 9 && nextField != 8 && ( nextField != 7 || this.goOut ) && nextField != 1 ) || this.goIn ){
			possibleWays.push( { 'left': 1, 'top': 0 } );
		}
		if( possibleWays.length > 1 ){
			for( var i = 0; i < possibleWays.length; i++ ){
				if( ( possibleWays[i].left != 0 && ( possibleWays[i].left == this.direction.left || this.direction.left == 0 ) )
					|| ( possibleWays[i].top != 0 && ( possibleWays[i].top == this.direction.top || this.direction.top == 0 ) ) || possibleWays.length == 1 ){
					possibleWaysFiltered.push( possibleWays[i] );
				}
			}
		} else {
			possibleWaysFiltered = possibleWays;
		}
		if( possibleWaysFiltered.length == 1 ){
			this.direction.left = possibleWaysFiltered[0].left;
			this.direction.top = possibleWaysFiltered[0].top;
		} else if( possibleWaysFiltered.length > 1 ){
			for( var i = 0; i < possibleWaysFiltered.length; i++ ){
				if( bestWayLength > Math.sqrt( Math.pow( this.globalPosition.left + possibleWaysFiltered[i].left - goalPoint.left, 2 ) + Math.pow( this.globalPosition.top + possibleWaysFiltered[i].top - goalPoint.top, 2 ) ) ){
					bestWayLength = Math.sqrt( Math.pow( this.globalPosition.left + possibleWaysFiltered[i].left - goalPoint.left, 2 ) + Math.pow( this.globalPosition.top + possibleWaysFiltered[i].top - goalPoint.top, 2 ) );
					bestWay = possibleWaysFiltered[i];
				}
			}
			if( Math.random() > ( chanceToMiss / 100 ) ){
				this.direction.left = bestWay.left;
				this.direction.top = bestWay.top;
			} else {
				randomWay = parseInt( possibleWaysFiltered.length * Math.random() );
				this.direction.left = possibleWaysFiltered[randomWay].left;
				this.direction.top = possibleWaysFiltered[randomWay].top;
			}
		}
	},
	'calculateNewDirection': function(){
		var nextField;
		this.checkNewWay();
		nextField = map.map[this.globalPosition.top + this.direction.top][this.globalPosition.left + this.direction.left];
		if( ( nextField != 9 && nextField != 8 && ( nextField != 7 || this.goOut ) && nextField != 1 ) || this.goIn ){
			this.isAnimating = true;
		} else {
			nextField = map.map[this.globalPosition.top + this.direction.top][this.globalPosition.left + this.direction.left];
			if( ( nextField != 9 && nextField != 8 && ( nextField != 7 || this.goOut ) && nextField != 1 ) || this.goIn ){
				this.isAnimating = true;
			}
		}
		if( this.isAnimating ){
			this.globalPosition = {
				'left': this.globalPosition.left + this.direction.left,
				'top': this.globalPosition.top + this.direction.top
			},
			this.shiftPosition = {
				'left': -1 * this.direction.left * 16,
				'top': -1 * this.direction.top * 16
			};
		}
	},
	'gotEnergyHandler': function(){
		this.gotEnergy = true;
	},
	'lostEnergyHandler': function(){
		this.gotEnergy = false;
	},
	'updatePosition': function(){
		this.element.style.left = ( this.globalPosition.left * 16 + this.shiftPosition.left ) + 'px';
		this.element.style.top = ( this.globalPosition.top * 16 + this.shiftPosition.top ) + 'px';
		if( this.killed )
			this.element.style.background = 'url( ' + this.imgSrcEyes + ' )';
		else if( this.gotEnergy )
			this.element.style.background = 'url( ' + this.imgSrcLoosed + ' )';
		else
			this.element.style.background = 'url( ' + this.imgSrc + ' )';
	},
	'iteration': function(){
		if( this.hasFrozen ){
			if( new Date().getTime() - this.startFrozen > this.frozingTime ){
				this.hasFrozen = false;
				this.goOut = true;
			}
		}
		if( !this.isAnimating ){
			this.calculateNewDirection();
		}
		if( this.isAnimating ){
			var timeShift = new Date().getTime() - this.lastUpdate;
			if( timeShift == 0 )

				timeShift = 1;
			var nextPosition = {
				'left': this.shiftPosition.left + parseInt( this.direction.left * ( ( this.killed ? this.killedSpeed : this.gotEnergy ? this.loosedSpeed : this.speed ) * ( timeShift / this.timeOut ) ) ),
				'top': this.shiftPosition.top + parseInt( this.direction.top * ( ( this.killed ? this.killedSpeed : this.gotEnergy ? this.loosedSpeed : this.speed ) * ( timeShift / this.timeOut ) ) )
			};
			if( nextPosition.left != this.shiftPosition.left || nextPosition.top != this.shiftPosition.top ){
				if( this.shiftPosition.left > 0 && nextPosition.left <= 0 ){
					nextPosition.left = 0;
					this.isAnimating = false;
				} else if( this.shiftPosition.left < 0 && nextPosition.left >= 0 ){
					nextPosition.left = 0;
					this.isAnimating = false;
				} else if( this.shiftPosition.top < 0 && nextPosition.top >= 0 ){
					nextPosition.top = 0;
					this.isAnimating = false;
				} else if( this.shiftPosition.top > 0 && nextPosition.top <= 0 ){
					nextPosition.top = 0;
					this.isAnimating = false;
				}
				this.shiftPosition.left = nextPosition.left;
				this.shiftPosition.top = nextPosition.top;
				this.updatePosition();
			}
		}
		this.lastUpdate = new Date().getTime();
	},
	'createNewElement': function(){
		this.element = document.createElement('div');
		this.element.style.position = 'absolute';
		this.element.style.width = 16 + 'px';
		this.element.style.height = 16 + 'px';
		this.element.style['font-size'] = 1 + 'px';
		this.element.style.background = 'url( ' + this.imgSrc + ' )';
		this.element.style.left = ( this.globalPosition.left * 16 ) + 'px';
		this.element.style.top = ( this.globalPosition.top * 16 ) + 'px';
	}
});

Blinky = Ghost.subClass({
	'imgSrc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1M0FCRjM0ODQxRDExRTFBNzlFRDBDNTQ2OTU4NjM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ1M0FCRjM1ODQxRDExRTFBNzlFRDBDNTQ2OTU4NjM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDUzQUJGMzI4NDFEMTFFMUE3OUVEMEM1NDY5NTg2MzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDUzQUJGMzM4NDFEMTFFMUE3OUVEMEM1NDY5NTg2MzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5m3c4bAAABs0lEQVR42ozTOUgcURzH8dlDZT1QUUSxiRo1hcc2Hlhok7UIaSzSBCLYhoCiWAgGIlarIFYKJiAeWNh6tSlcRYwiJNosARXRImhwvV2PfB/7GxiWJTrw4f92Z97/vff/z3iDXq+V4MpDGaK4xi32cBn/YPzsJLSiUwnOcYcHbGMI8/9L0IEB7GMWy7jSc82YQh+GEyXo1ORxtOMsLvk3fMQgwlgwf7p1swTd/NjGOuPXeOmYXIjPLpJi0TwLn70DlzLnMxjjsP2Mc3CMSUzjKyoQYYGZe8tqZOzHqtlBOd5jg8lTj0RV3SRp0Nkr8QcZLFJATEemvQOPjnLG5CPiW9QpwXdcqKi13J9jkYA6c2AnOMRvNKEaK6q+85oR0883amvULuJfTKgWr6ynL0pgZaHY2YVdxYxnJNhS9DkTvFAMKyZrR/bldiSPKGY7E9Tgp87fhjV8Ma3VfTP+hU8IYRMtSPUE3O40vXkurRJEihWrdj1O0YNcLbSpNr7DotnBDX6gFL1YsmIviklwglG1rQsj+v0BO+YLdelzTkWRVt7RJ2zXwq9OhXVks6sqHTn0T4ABAMIRZdagz1NVAAAAAElFTkSuQmCC',
	'defaultPosition': {
		'left': 23,
		'top': 7
	},
	'globalPosition': {
		'left': 23,
		'top': 7
	},
	'shiftPosition': {
		'left': 0,
		'top': 0
	},
	'isAnimating': false,
	'element': false,
	'direction': {
		'left': 0,
		'top': 0
	},
	'speed': 1.9,
	'timeOut': 30,
	'indexOfMissing': 0,
	'hasFrozen': true,
	'startFrozen': new Date().getTime(),
	'actuallyKey': false,
	'secondColor': 'darkgray',
	'color': 'darkred',
	'lastUpdate': new Date().getTime(),
	'setGoal': function( distance ){
		var chanceToMiss = this.indexOfMissing * distance;
		var goalPoint = {
			'left': player.globalPosition.left,
			'top': player.globalPosition.top
		};
		if( this.gotEnergy ){
			goalPoint = {
				'left': this.globalPosition.left + ( this.globalPosition.left - goalPoint.left ),
				'top': this.globalPosition.top + ( this.globalPosition.top - goalPoint.top )
			};
		}
		return { 'chanceToMiss': chanceToMiss, 'goal': goalPoint };
	}
});

Pinky = Ghost.subClass({
	'imgSrc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RkQwNDQzQjg0MUQxMUUxQkVERUQ5NDQ2NkRGMTlENCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RkQwNDQzQTg0MUQxMUUxQkVERUQ5NDQ2NkRGMTlENCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoXhcqUAAAG8SURBVHjajNNPSJRBGMfxd9/dFLOlxIiii6SmhywvVnjYLtpBunTwEih4lcBQPAgKiodYA/GkUIn4hz10rbZjHjSR3CWoXZBFqBD3ICrt+i/X3fU78HvhZVnKgQ8zu/PO88zM876+oO+lVaRdw21kcIwT/MJh4YO+gt8X0IleBdjHKXKIYRwf/hXgBcbwG++whCM99xjzGMFEsQC9WjyDHqQLgr9FN14hgY/mT1uT1ei3LTuGr4xbUONafBNDHsuTRtg8izJnBx5Fvs7k65yVG2VciR3MYQFvcAcpEoSyVjbAuBErZgd1eIYIi+fzVj6iWzdBmnX2BmzDT5Ib9Jdw2dmBV0dJszhJ/wQPFGARB7rU+8y/J0mrKrPpBNjCBh7hHr7o9t0tJNQz16ayZpxL3MOs7qLe+n/L4gpuuavwU73/HAG+qS9zB6hSn1Bfoh05zXYFT6mvcAdownedvwurGDal1bwZ/8BzLCOKp7jobbVbyvXmeZQliFKY236IPxjAVSWKqoztCJsd/MUaajGITwgowC6mVLY+TOp3B+LmC/Vp0iycVua4PuF186bpjdvT/ZiEn3FXR06eCTAACohyNhVCMWwAAAAASUVORK5CYII%3D',
	'defaultPosition': {
		'left': 23,
		'top': 9
	},
	'globalPosition': {
		'left': 23,
		'top': 9
	},
	'shiftPosition': {
		'left': 0,
		'top': 0
	},
	'isAnimating': false,
	'element': false,
	'direction': {
		'left': 0,
		'top': 0
	},
	'speed': 1.8,
	'timeOut': 30,
	'hasFrozen': true,
	'startFrozen': new Date().getTime(),
	'actuallyKey': false,
	'secondColor': 'darkblue',
	'color': 'pink',
	'lastUpdate': new Date().getTime(),
	'setGoal': function( distance ){
		var chanceToMiss = this.indexOfMissing * distance;
		if( distance < 3 )
			goalPoint = {
				'left': player.globalPosition.left,
				'top': player.globalPosition.top
			};
		else
			goalPoint = {
				'left': player.globalPosition.left + ( player.direction.left * 6 ),
				'top': player.globalPosition.top + ( player.direction.top * 6 )
			};
		if( this.gotEnergy ){
			goalPoint = {
				'left': this.globalPosition.left + ( this.globalPosition.left - goalPoint.left ),
				'top': this.globalPosition.top + ( this.globalPosition.top - goalPoint.top )
			};
		}
		return { 'chanceToMiss': chanceToMiss, 'goal': goalPoint };
	}
});

Inky = Ghost.subClass({
	'imgSrc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3QkY0MEJEMDg0MUQxMUUxQjY5QkVFN0M0MDI1MjY1MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3QkY0MEJDRjg0MUQxMUUxQjY5QkVFN0M0MDI1MjY1MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuvRQWYAAAG9SURBVHjajNNPSJRBGMfxed9di91aKhJRuvRHq4PZXtLwsBK0HcRLhy5CQVcRDKNDoNDSyYLoVKCClOHBq7pdO7RK6C5B7V4WoSL0ICq5aX/W3fU72++Fl0WqgQ8z777vPDPzPDtOMDFi9mkNOIsifuI3PmOn9sNgzXMdbmFQAb5jF2Vk8QSzfwtwB4/wBdN4ix/67homkcDT/QIMavIEBlCoCT6OPjxGHnP2R1cvz+Cecd0sFhlfRbNv8gkMG8cpIFn91piQtwNHkRt5OWrK5YeMj2MdL/EKY2jFFgtMmVIpxjiKBbuDc+hFmsmTplJJK+s2SKfOfgFriLBIE/1hHPF2ENBRCkxepe9BhwK8wbaS2s77GRaJqzJfvQArWEYXLmJe2fe3KaGg5W6VteglcRMvlIvz5t+thKM47a/CJ/WR/wjwXn3IH+Ck+rz6A9qR11xf8C31x/wBLuGDzn8b7/CgWto/zY4/oh8pZHAd4YB7JX5I/zxHq9jbdRA225fxDfdRr4UyKuMNJO0OfmEJLRjCa8QUYAPPVba7eKbnm8jZG+roOodxSivndIW9XERVqbyObHfVpiOn9gQYAG3AbwhrbJVlAAAAAElFTkSuQmCC',
	'defaultPosition': {
		'left': 25,
		'top': 7
	},
	'globalPosition': {
		'left': 25,
		'top': 7
	},
	'shiftPosition': {
		'left': 0,
		'top': 0
	},
	'isAnimating': false,
	'element': false,
	'direction': {
		'left': 0,
		'top': 0
	},
	'speed': 1.8,
	'timeOut': 30,
	'hasFrozen': true,
	'startFrozen': new Date().getTime(),
	'actuallyKey': false,
	'secondColor': 'darkblue',
	'color': 'lightblue',
	'lastUpdate': new Date().getTime(),
	'setGoal': function( distance ){
		var chanceToMiss = this.indexOfMissing * distance;
		if( distance < 3 )
			goalPoint = {
				'left': player.globalPosition.left,
				'top': player.globalPosition.top
			};
		else
			goalPoint = {
				'left': player.globalPosition.left - ( player.direction.left * 4 ),
				'top': player.globalPosition.top - ( player.direction.top * 4 )
			};
		if( this.gotEnergy ){
			goalPoint = {
				'left': this.globalPosition.left + ( this.globalPosition.left - goalPoint.left ),
				'top': this.globalPosition.top + ( this.globalPosition.top - goalPoint.top )
			};
		}
		return { 'chanceToMiss': chanceToMiss, 'goal': goalPoint };
	}
});

Clyde = Ghost.subClass({
	'imgSrc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMjlEOUQyNjg0MUQxMUUxOTU3Mzg4MUM3NTc0OTgyMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMjlEOUQyNTg0MUQxMUUxOTU3Mzg4MUM3NTc0OTgyMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNjFDNjM1NDEyODRFMTExQTRBMkI4QkUyRTUwODJGMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt/poEgAAAHASURBVHjajNNPSBRhGMfxd2bXZFMpMcLoIlpqUNmlP3iwi3YQLwZeggSvISQrHgKFwtMmRKeCUqJWPHit9FiHUqJ2EWoXQgSV0IPU0m6ZpjvT94XfwLAs1Qsfnpl5533e933emWjiatSUaUfRjD3s4DfWsF36YunoCvQjrgQ/sA8PGdzDi78lGMJdrGMWb/BL711BEndwv1yCuAY/wU0USpJP4gYmsIyX9qGrziaMuI7JuK55z3UnToQGH8eY45gC5uy7iAUrcJS5ns5Hnm/Gua7DVzzDNB7jtPFN3o2YmWLRdHB/Dot2BS24hhSDk75vUqq6TdKuvZ/BFmqY5BixGoeCFUS0lQKDN4k9uKgEr/FTRb3gG/Pc80yXTuZLkGADK7iMNiyo+uE2I4YE3TrWvaCIOTxVLVrNv1sRh9EYPoVVxZr/SLCkGAsnaFBcVjygFQXNDSXPK9aGE5zHR+1/AO9w2x6t+u31JwziLdLoxcFI1ym3Sl+eo1kSqISt9iV8xy0c0URpHWMf5uwKdvEBJzGKeXQowTc81LEN44HuryNr/9CoOu3AKc2c1S/82X5p+uJyqo+d8BXOasubfwQYAK5HcegP2bgtAAAAAElFTkSuQmCC',
	'defaultPosition': {
		'left': 27,
		'top': 8
	},
	'globalPosition': {
		'left': 27,
		'top': 8
	},
	'shiftPosition': {
		'left': 0,
		'top': 0
	},
	'isAnimating': false,
	'element': false,
	'direction': {
		'left': 0,
		'top': 0
	},
	'speed': 1.8,
	'timeOut': 30,
	'hasFrozen': false,
	'startFrozen': new Date().getTime(),
	'actuallyKey': false,
	'secondColor': 'darkblue',
	'color': 'orange',
	'lastUpdate': new Date().getTime(),
	'setGoal': function( distance ){
		var chanceToMiss = this.indexOfMissing * distance;
		if( distance < 7 )
			goalPoint = {
				'left': player.globalPosition.left + 1,
				'top': player.globalPosition.top + 2
			};
		else
			goalPoint = {
				'left': player.globalPosition.left,
				'top': player.globalPosition.top
			};
		if( this.gotEnergy ){
			goalPoint = {
				'left': this.globalPosition.left + ( this.globalPosition.left - goalPoint.left ),
				'top': this.globalPosition.top + ( this.globalPosition.top - goalPoint.top )
			};
		}
		return { 'chanceToMiss': chanceToMiss, 'goal': goalPoint };
	}
});

Energy = Object.subClass({
	'imgSrc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU2MTA3NTREODQyMDExRTFBQzBEOTFBRTIzMTFDMzU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU2MTA3NTRFODQyMDExRTFBQzBEOTFBRTIzMTFDMzU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTYxMDc1NEI4NDIwMTFFMUFDMEQ5MUFFMjMxMUMzNTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTYxMDc1NEM4NDIwMTFFMUFDMEQ5MUFFMjMxMUMzNTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4GBXHmAAABC0lEQVR42mL8//8/AyWAiYFCQLEBLOgC/4A+QvKVKJR+DRNgBNnKhMeAz1//MXz78c+HkZGhGMjVgwpfAuJeoLlbWJkZGUQEmOHqGdED8f3nf+nff/ybwciI6VygykygATNEBXEY8Ocvg/KbD38uA4U4sfkXqPIH0AAdoAF3sQbi95//Av/9w64ZCjiAOAhnLAA1K+ILcUaIKxT/4zKAiZHhMREx9xinCzjYmTYwMjH8xqUTaPNvoCs2MOIygJWF4QYHK1MVntRdBcTX8SYkoEd7gAa8ALKKgFgDKgrS1Ac0dym64Rjp4MfP/wy//vxnAKYDkOvkocIPoYmUgRkowc3JiNsAumcmgAADAFEaWPKFR0DJAAAAAElFTkSuQmCC',
	'energies': [],
	'elements': [],
	'init': function(){
		for( var i = 0; i < map.size.height; i++ ){
			for( var j = 0; j < map.size.width; j++ ){
				if( map.map[i][j] == 6 ){
					this.energies.push({
						'left': j,
						'top': i
					});
				}
			}
		}
		for( var i = 0; i < this.energies.length; i++ ){
			map.generalBlock.appendChild( this.createNewElement( this.energies[i].left, this.energies[i].top ) );
		}
	},
	'createNewElement': function( left, top ){
		var element = document.createElement('div');
		element.style.position = 'absolute';
		element.style.width = 16 + 'px';
		element.style.height = 16 + 'px';
		element.style['font-size'] = 1 + 'px';
		element.style.background = 'url( ' + this.imgSrc + ' )';
		element.style.left = ( left * 16 ) + 'px';
		element.style.top = ( top * 16 ) + 'px';
		this.elements.push( element );
		return element;
	},
	'removeEnergy': function( left, top ){
		for( var i = 0; i < this.energies.length; i++ ){
			if( this.energies[i] && this.energies[i].left == left && this.energies[i].top == top ){
				this.energies[i] = false;
				this.elements[i].style.background = 'none';
				map.map[top][left] = 0;
			}
		}
	}
});

Dots = Object.subClass({
	'imgSrc': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIxRUEzQTE2ODQyMTExRTFCQjgxRUQ3QjJEMkU4RTAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIxRUEzQTE3ODQyMTExRTFCQjgxRUQ3QjJEMkU4RTAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjFFQTNBMTQ4NDIxMTFFMUJCODFFRDdCMkQyRThFMDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjFFQTNBMTU4NDIxMTFFMUJCODFFRDdCMkQyRThFMDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7+8aHxAAAAp0lEQVR42mL8//8/AyWAiYFCMAwMYMEn+fv3b5D8P2Zm5n9MTEykGXD48OG0e/fuFYDMUVBQaLG3t19NtBeePn1qefny5Znfvn3TBGK9mzdvLn337p0q0Qa8fftW58+fPwxAp4Pxz58/WUkyQEZG5gAXF9fnX79+gTQz8PLyPpGUlDyDTS0jrpR45coV87t37+YAmT/l5eX7DAwMrpFkwGhSJh4ABBgA6wJIRU4BeY0AAAAASUVORK5CYII%3D',
	'dots': [],
	'elements': [],
	'init': function(){
		for( var i = 0; i < map.size.height; i++ ){
			for( var j = 0; j < map.size.width; j++ ){
				if( map.map[i][j] == 5 ){
					this.dots.push({
						'left': j,
						'top': i
					});
				}
			}
		}
		for( var i = 0; i < this.dots.length; i++ ){
			map.generalBlock.appendChild( this.createNewElement( this.dots[i].left, this.dots[i].top ) );
		}
	},
	'checkDots': function(){
		var allDots = true;
		for( var i = 0; i < this.dots.length; i++ ){
			if( this.dots[i] != false ){
				allDots = false;
			}
		}
		return allDots;
	},
	'createNewElement': function( left, top ){
		var element = document.createElement('div');
		element.style.position = 'absolute';
		element.style.width = 16 + 'px';
		element.style.height = 16 + 'px';
		element.style['font-size'] = 1 + 'px';
		element.style.background = 'url( ' + this.imgSrc + ' )';
		element.style.left = ( left * 16 ) + 'px';
		element.style.top = ( top * 16 ) + 'px';
		this.elements.push( element );
		return element;
	},
	'removeDot': function( left, top ){
		for( var i = 0; i < this.dots.length; i++ ){
			if( this.dots[i] && this.dots[i].left == left && this.dots[i].top == top ){
				this.dots[i] = false;
				this.elements[i].style.background = 'none';
				map.map[top][left] = 0;
				footer.addScore( 10 );
			}
		}
		return this.checkDots();
	}
});

Keyboard = Object.subClass({
	'lastKey': false,
	'prevKey': false,
	'init': function(){
		this.addEvent();
	},
	'addEvent': function(){
		var self = this;
		document.onkeydown = function(event){
			var event = event || window.event;
			switch(event.keyCode){
				case 37:
					self.prevKey = self.lastKey;
					self.lastKey = 37;
					break;
				case 38:
					self.prevKey = self.lastKey;
					self.lastKey = 38;
					break;
				case 39:
					self.prevKey = self.lastKey;
					self.lastKey = 39;
					break;
				case 40:
					self.prevKey = self.lastKey;
					self.lastKey = 40;
					break;
			}
		};
	}
});

Footer = Object.subClass({
	'score': 0,
	'lives': 2,
	'maxLives': 2,
	'scoreElement': false,
	'liveElement': false,
	'init': function(){
		this.createScore();
		this.createLives();
		this.createLivesChildren();
		map.generalBlock.appendChild( this.scoreElement );
		map.generalBlock.appendChild( this.liveElement );
	},
	'addScore': function( score ){
		this.score += score;
		this.updateScore();
	},
	'removeLive': function(){
		var isLive = true;
		this.lives--;
		if( this.lives < 0 ){
			isLive = false;
		}
		this.updateLives();
		return isLive;
	},
	'updateScore': function(){
		this.scoreElement.innerHTML = this.score;
	},
	'updateLives': function(){
		for( var i = 0; i < this.liveElement.children.length; i++ ){
			if( i >= this.lives ){
				this.liveElement.children[i].style.background = 'none';
			}
		}
	},
	'createScore': function(){
		this.scoreElement = document.createElement('span');
		this.scoreElement.style.position = 'absolute';
		this.scoreElement.style['line-height'] = '16px';
		this.scoreElement.style['font-size'] ='16px';
		this.scoreElement.style.color = '#ffffff';
		this.scoreElement.style.right = '16px';
		this.scoreElement.style.bottom = '5px';
		this.scoreElement.innerHTML = this.score;
	},
	'createLives': function(){
		this.liveElement = document.createElement('div');
		this.liveElement.style.position = 'absolute';
		this.liveElement.style['line-height'] = '16px';
		this.liveElement.style['font-size'] ='16px';
		this.liveElement.style.color = '#ffffff';
		this.liveElement.style.left = '16px';
		this.liveElement.style.bottom = '5px';
	},
	'createLivesChildren': function(){
		var element;
		for( var i = 0; i < this.maxLives; i++ ){
			element = document.createElement('div');
			element.style.position = 'absolute';
			element.style.background = 'url( ' + player.imgSrc + ' )';
			element.style.backgroundPosition = '64px 0px';
			element.style.width = '16px';
			element.style.height = '16px';
			element.style.left = ( i * 26 ) + 'px';
			element.style.bottom = '0px';
			this.liveElement.appendChild( element );
		}
	}
});

window.onload = function(){
	var map = window.map = new Map();
	var keyboard = window.keyboard = new Keyboard();
	var player = window.player = new Player();
	var energies = window.energies = new Energy();
	var dots = window.dots = new Dots();
	var blinky = window.blinky = new Blinky();
	var pinky = window.pinky = new Pinky();
	var inky = window.inky = new Inky();
	var clyde = window.clyde = new Clyde();
	var footer = window.footer = new Footer();
};
