'use strict';
const hourrotation = 30;
var cardposition = new Array(13);
cardposition[0] = [0, -360];
cardposition[1] = [180, -311];
cardposition[2] = [311, -180];
cardposition[3] = [360, 0];
cardposition[4] = [311, 180];
cardposition[5] = [180, 311];
cardposition[6] = [0, 360];
cardposition[7] = [-180, 311];
cardposition[8] = [-311, 180];
cardposition[9] = [-360, 0];
cardposition[10] = [-311, -180];
cardposition[11] = [-180, -311];
cardposition[12] = [0, 0];
var clockcards;
var cardrank;
var kingsplayed = 0;
var kingsplayedcount = 0;
var gameover = false;
var countcards;
function cardtosymbols(card) {
	var symbols = "";
	var symbol1 = "";
	var symbol2 = "";
	switch (card.suit) {
		case 0: symbol1 = "♠";
			break;
		case 1: symbol1 = "♥";
			break;
		case 2: symbol1 = "♣";
			break;
		case 3: symbol1 = "♦";
			break;
	}
	switch (card.rank) {
		case 13:symbol2 = "H";
			break;
		case 12:symbol2 = "V";
			break;
		case 11:symbol2 = "B";
			break;
		case 10:symbol2 = "0";
			break;
		case 9: symbol2 = "9";
			break;
		case 8: symbol2 = "8";
			break;
		case 7: symbol2 = "7";
			break;
		case 6: symbol2 = "6";
			break;
		case 5: symbol2 = "5";
			break;
		case 4: symbol2 = "4";
			break;
		case 3: symbol2 = "3";
			break;
		case 2: symbol2 = "2";
			break;
		case 1: symbol2 = "A";
			break;
	}
	symbols = symbols + symbol1 + symbol2;
	return symbols;
}
function increasekingsplayed() {
	kingsplayed = kingsplayed + 1;
	if (kingsplayed === 4) {
		kingsplayedcount = kingsplayedcount + 1;
		if (kingsplayedcount === 2) {
			swal({
				title: "<h4 id='swalgameover'>Game is over!</h4>",
				imageUrl: "Cards.png",
				timer: 30000,
				showConfirmButton: true,
				html: true
			});
			gameover = true;
		}
		else {
			swal({
				title: "<h4 id='swalallkings'>All kings are played!</h4>",
				imageUrl: "Cards.png",
				timer: 30000,
				showConfirmButton: true,
				html: true
			});
		}
		var allcards = true;
		for (var i = 0; i < 13; i++) {
			if (clockcards[i][clockcards[i].length - 1].side === "back") {
				allcards = false;
				break;
			}
			for (var j = 0; j < clockcards[i].length; j++) {
				cardrank = clockcards[i][j].rank;
				if (cardrank === 12) cardrank = 0;
				if (cardrank === 13) cardrank = 12;
				if (cardrank !== i) {
					allcards = false;
					break;
				}
			}
		}
		if (allcards) {
			swal({
				title: "<h4 id='swalwelldone'>Well done!</h4>",
				imageUrl: "Cards.png",
				timer: 30000,
				showConfirmButton: true,
				html: true
			});
			gameover = true;
		}
	}
}
var Deck = (function () {
  'use strict';
  var ticking;
  var animations = [];
  function animationFrames(delay, duration) {
    var now = Date.now();
    var start = now + delay;
    var end = start + duration;
    var animation = {
      start: start,
      end: end
    };
    animations.push(animation);
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
    var self = {
      start: function start(cb) {
        animation.startcb = cb;
        return self;
      },
      progress: function progress(cb) {
        animation.progresscb = cb;
        return self;
      },
      end: function end(cb) {
        animation.endcb = cb;
        return self;
      }
    };
    return self;
  }
  function tick() {
    var now = Date.now();
    if (!animations.length) {
      ticking = false;
      return;
    }
    for (var i = 0, animation; i < animations.length; i++) {
      animation = animations[i];
      if (now < animation.start) {
        continue;
      }
      if (!animation.started) {
        animation.started = true;
        animation.startcb && animation.startcb();
      }
      var t = (now - animation.start) / (animation.end - animation.start);
      animation.progresscb && animation.progresscb(t < 1 ? t : 1);
      if (now > animation.end) {
        animation.endcb && animation.endcb();
        animations.splice(i--, 1);
        continue;
      }
    }
    requestAnimationFrame(tick);
  }
  window.requestAnimationFrame || (window.requestAnimationFrame = function (cb) {
    setTimeout(cb, 0);
  });
  var style = document.createElement('p').style;
  var memoized = {};
  function prefix(param) {
    if (typeof memoized[param] !== 'undefined') {
      return memoized[param];
    }
    if (typeof style[param] !== 'undefined') {
      memoized[param] = param;
      return param;
    }
    var camelCase = param[0].toUpperCase() + param.slice(1);
    var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
    var test;
    for (var i = 0, len = prefixes.length; i < len; i++) {
      test = prefixes[i] + camelCase;
      if (typeof style[test] !== 'undefined') {
        memoized[param] = test;
        return test;
      }
    }
  }
  var has3d;
  function translate(a, b, c) {
    typeof has3d !== 'undefined' || (has3d = check3d());
    c = c || 0;
    if (has3d) {
      return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
    } else {
      return 'translate(' + a + ', ' + b + ')';
    }
  }
  function check3d() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      return false;
    }
    var transform = prefix('transform');
    var $p = document.createElement('p');
    document.body.appendChild($p);
    $p.style[transform] = 'translate3d(1px,1px,1px)';
    has3d = $p.style[transform];
    has3d = has3d != null && has3d.length && has3d !== 'none';
    document.body.removeChild($p);
    return has3d;
  }
  function createElement(type) {
    return document.createElement(type);
  }
  var maxZ = 52;
  function _card(i) {
	var transform = prefix('transform');
	var rank = i % 13 + 1;
	var suit = i / 13 | 0;
	var z = (52 - i) / 4;
	var $el = createElement('div');
	$el.id = 'card' + i;
	var $face = createElement('div');
	var $back = createElement('div');
	var isDraggable = false;
	var isFlippable = false;
	var self = { i: i, rank: rank, suit: suit, pos: i, $el: $el, mount: mount, unmount: unmount, setSide: setSide };
	var modules = Deck.modules;
	var module;
	$face.classList.add('face');
	$back.classList.add('back');
	$el.style[transform] = translate(-z + 'px', -z + 'px');
	self.x = -z;
	self.y = -z;
	self.z = z;
	self.rot = 0;
	self.setSide('back');
	addListener($el, 'mousedown', onMousedown);
	addListener($el, 'touchstart', onMousedown);
    for (module in modules) {
      addModule(modules[module]);
    }
    self.animateTo = function (params) {
      var delay = params.delay;
      var duration = params.duration;
      var _params$x = params.x;
      var x = _params$x === undefined ? self.x : _params$x;
      var _params$y = params.y;
      var y = _params$y === undefined ? self.y : _params$y;
      var _params$rot = params.rot;
      var rot = _params$rot === undefined ? self.rot : _params$rot;
      var ease$$ = params.ease;
      var onStart = params.onStart;
      var onProgress = params.onProgress;
      var onComplete = params.onComplete;
      var startX, startY, startRot;
      var diffX, diffY, diffRot;
      animationFrames(delay, duration).start(function () {
        startX = self.x || 0;
        startY = self.y || 0;
        startRot = self.rot || 0;
        onStart && onStart();
      }).progress(function (t) {
        var et = ease[ease$$ || 'cubicInOut'](t);
        diffX = x - startX;
        diffY = y - startY;
        diffRot = rot - startRot;
        onProgress && onProgress(t, et);
        self.x = startX + diffX * et;
        self.y = startY + diffY * et;
        self.rot = startRot + diffRot * et;
        $el.style[transform] = translate(self.x + 'px', self.y + 'px') + (diffRot ? 'rotate(' + self.rot + 'deg)' : '');
      }).end(function () {
        onComplete && onComplete();
      });
    };
    self.setRankSuit = function (rank, suit) {
      var suitName = SuitName(suit);
      $el.setAttribute('class', 'card ' + suitName + ' rank' + rank);
    };
    self.setRankSuit(rank, suit);
    self.enableDragging = function () {
      if (isDraggable) {
        return;
      }
      isDraggable = true;
      $el.style.cursor = 'move';
    };
    self.enableFlipping = function () {
      if (isFlippable) {
        return;
      }
      isFlippable = true;
    };
    self.disableFlipping = function () {
      if (!isFlippable) {
        return;
      }
      isFlippable = false;
    };
    self.disableDragging = function () {
      if (!isDraggable) {
        return;
      }
      isDraggable = false;
      $el.style.cursor = '';
    };
    return self;
    function addModule(module) {
      module.card && module.card(self);
    }
    function onMousedown(e) {
	var startPos = {};
	var pos = {};
	var starttime = Date.now();
	if (self.side === "front" && !gameover) {
		if (self.x === 0 && self.y === 0) {
			if (clockcards[12].length > 0) {
				console.log("Card13: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 13) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[12].splice(clockcards[12].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
				}
				else {
					clockcards[12].splice(0, 0, self);
					clockcards[12].pop();
					clockcards[12][clockcards[12].length - 1].setSide("front");
					$el.style.zIndex = clockcards[12][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === 0 && self.y === -360) {
			if (clockcards[0].length > 0) {
				console.log("Card0: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 12) {
					cardrank = self.rank;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[0].splice(clockcards[0].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[0].splice(0, 0, self);
					clockcards[0].pop();
					clockcards[0][clockcards[0].length - 1].setSide("front");
					$el.style.zIndex = clockcards[0][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === 180 && self.y === -311) {
			if (clockcards[1].length > 0) {
				console.log("Card1: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 1) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[1].splice(clockcards[1].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[1].splice(0, 0, self);
					clockcards[1].pop();
					clockcards[1][clockcards[1].length - 1].setSide("front");
					$el.style.zIndex = clockcards[1][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === 311 && self.y === -180) {
			if (clockcards[2].length > 0) {
				console.log("Card2: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 2) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[2].splice(clockcards[2].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[2].splice(0, 0, self);
					clockcards[2].pop();
					clockcards[2][clockcards[2].length - 1].setSide("front");
					$el.style.zIndex = clockcards[2][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === 360 && self.y === 0) {
			if (clockcards[3].length > 0) {
				console.log("Card3: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 3) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[3].splice(clockcards[3].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[3].splice(0, 0, self);
					clockcards[3].pop();
					clockcards[3][clockcards[3].length - 1].setSide("front");
					$el.style.zIndex = clockcards[3][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === 311 && self.y === 180) {
			if (clockcards[4].length > 0) {
				console.log("Card4: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 4) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[4].splice(clockcards[4].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[4].splice(0, 0, self);
					clockcards[4].pop();
					clockcards[4][clockcards[4].length - 1].setSide("front");
					$el.style.zIndex = clockcards[4][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === 180 && self.y === 311) {
			if (clockcards[5].length > 0) {
				console.log("Card5: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 5) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[5].splice(clockcards[5].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[5].splice(0, 0, self);
					clockcards[5].pop();
					clockcards[5][clockcards[5].length - 1].setSide("front");
					$el.style.zIndex = clockcards[5][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === 0 && self.y === 360) {
			if (clockcards[6].length > 0) {
				console.log("Card6: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 6) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[6].splice(clockcards[6].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[6].splice(0, 0, self);
					clockcards[6].pop();
					clockcards[6][clockcards[6].length - 1].setSide("front");
					$el.style.zIndex = clockcards[6][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === -180 && self.y === 311) {
			if (clockcards[7].length > 0) {
				console.log("Card7: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 7) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[7].splice(clockcards[7].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[7].splice(0, 0, self);
					clockcards[7].pop();
					clockcards[7][clockcards[7].length - 1].setSide("front");
					$el.style.zIndex = clockcards[7][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === -311 && self.y === 180) {
			if (clockcards[8].length > 0) {
				console.log("Card8: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 8) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[8].splice(clockcards[8].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[8].splice(0, 0, self);
					clockcards[8].pop();
					clockcards[8][clockcards[8].length - 1].setSide("front");
					$el.style.zIndex = clockcards[8][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === -360 && self.y === 0) {
			if (clockcards[9].length > 0) {
				console.log("Card9: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 9) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[9].splice(clockcards[9].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[9].splice(0, 0, self);
					clockcards[9].pop();
					clockcards[9][clockcards[9].length - 1].setSide("front");
					$el.style.zIndex = clockcards[9][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === -311 && self.y === -180) {
			if (clockcards[10].length > 0) {
				console.log("Card10: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 10) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[10].splice(clockcards[10].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[10].splice(0, 0, self);
					clockcards[10].pop();
					clockcards[10][clockcards[10].length - 1].setSide("front");
					$el.style.zIndex = clockcards[10][1].$el.style.zIndex - 1;
				}
			}
		}
		if (self.x === -180 && self.y === -311) {
			if (clockcards[11].length > 0) {
				console.log("Card11: " + $el.id + " z: " + $el.style.zIndex + " " + cardtosymbols(self));
				if (self.rank != 11) {
					cardrank = self.rank;
					if (cardrank === 12) cardrank = 0;
					if (cardrank === 13) cardrank = 12;
					clockcards[cardrank].splice(0, 0, self);
					clockcards[cardrank][clockcards[cardrank].length - 1].setSide("front");
					clockcards[11].splice(clockcards[11].length - 1, 1);
					countcards[cardrank] = countcards[cardrank] + 1;
					$("#countcards" + cardrank).html(countcards[cardrank]);
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[cardrank][0],
						y: cardposition[cardrank][1],
						rot: hourrotation * cardrank,
						onStart: function onStart() {
							$el.style.zIndex = clockcards[cardrank][1].$el.style.zIndex - 1;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 12) increasekingsplayed();
				}
				else {
					clockcards[11].splice(0, 0, self);
					clockcards[11].pop();
					clockcards[11][clockcards[11].length - 1].setSide("front");
					$el.style.zIndex = clockcards[11][1].$el.style.zIndex - 1;
				}
			}
		}
	}
	else {
		console.log("Kingsplayed: " + kingsplayed);
		if (kingsplayed === 4 && !gameover) {
			console.log("All kings are played");
			var zIndex = parseInt(clockcards[12][clockcards[12].length - 1].$el.style.zIndex) + 1;
			cardrank = self.rank;
			if (cardrank === 12) cardrank = 0;
			if (cardrank === 13) cardrank = 12;
			if (self.x === 0 && self.y === -360) {
				if (clockcards[0].length > 0) {
					console.log("Card0: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[0][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[0][clockcards[0].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 0) {
						countcards[0] = countcards[0] - 1;
						$("#countcards0").html(countcards[0]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 0,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[0][0].$el.style.zIndex - 1;
					clockcards[0].splice(0, 0, clockcards[12][3]);
					clockcards[0].pop();
					clockcards[0][clockcards[0].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === 180 && self.y === -311) {
				if (clockcards[1].length > 0) {
					console.log("Card1: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[1][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[1][clockcards[1].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 1) {
						countcards[1] = countcards[1] - 1;
						$("#countcards1").html(countcards[1]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 1,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[1][0].$el.style.zIndex - 1;
					clockcards[1].splice(0, 0, clockcards[12][3]);
					clockcards[1].pop();
					clockcards[1][clockcards[1].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === 311 && self.y === -180) {
				if (clockcards[2].length > 0) {
					console.log("Card2: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[2][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[2][clockcards[2].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 2) {
						countcards[2] = countcards[2] - 1;
						$("#countcards2").html(countcards[2]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 2,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[2][0].$el.style.zIndex - 1;
					clockcards[2].splice(0, 0, clockcards[12][3]);
					clockcards[2].pop();
					clockcards[2][clockcards[2].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === 360 && self.y === 0) {
				if (clockcards[3].length > 0) {
					console.log("Card3: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[3][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[3][clockcards[3].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 3) {
						countcards[3] = countcards[3] - 1;
						$("#countcards3").html(countcards[3]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 3,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[3][0].$el.style.zIndex - 1;
					clockcards[3].splice(0, 0, clockcards[12][3]);
					clockcards[3].pop();
					clockcards[3][clockcards[3].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === 311 && self.y === 180) {
				if (clockcards[4].length > 0) {
					console.log("Card4: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[4][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[4][clockcards[4].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 4) {
						countcards[4] = countcards[4] - 1;
						$("#countcards4").html(countcards[4]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 4,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[4][0].$el.style.zIndex - 1;
					clockcards[4].splice(0, 0, clockcards[12][3]);
					clockcards[4].pop();
					clockcards[4][clockcards[4].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === 180 && self.y === 311) {
				if (clockcards[5].length > 0) {
					console.log("Card5: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[5][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[5][clockcards[5].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 5) {
						countcards[5] = countcards[5] - 1;
						$("#countcards5").html(countcards[5]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 5,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[5][0].$el.style.zIndex - 1;
					clockcards[5].splice(0, 0, clockcards[12][3]);
					clockcards[5].pop();
					clockcards[5][clockcards[5].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === 0 && self.y === 360) {
				if (clockcards[6].length > 0) {
					console.log("Card6: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[6][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[6][clockcards[6].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 6) {
						countcards[6] = countcards[6] - 1;
						$("#countcards6").html(countcards[6]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 6,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[6][0].$el.style.zIndex - 1;
					clockcards[6].splice(0, 0, clockcards[12][3]);
					clockcards[6].pop();
					clockcards[6][clockcards[6].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === -180 && self.y === 311) {
				if (clockcards[7].length > 0) {
					console.log("Card7: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[7][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[7][clockcards[7].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 7) {
						countcards[7] = countcards[7] - 1;
						$("#countcards7").html(countcards[7]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 7,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[7][0].$el.style.zIndex - 1;
					clockcards[7].splice(0, 0, clockcards[12][3]);
					clockcards[7].pop();
					clockcards[7][clockcards[7].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === -311 && self.y === 180) {
				if (clockcards[8].length > 0) {
					console.log("Card8: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[8][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[8][clockcards[8].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 8) {
						countcards[8] = countcards[8] - 1;
						$("#countcards8").html(countcards[8]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 8,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[8][0].$el.style.zIndex - 1;
					clockcards[8].splice(0, 0, clockcards[12][3]);
					clockcards[8].pop();
					clockcards[8][clockcards[8].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === -360 && self.y === 0) {
				if (clockcards[9].length > 0) {
					console.log("Card9: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[9][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[9][clockcards[9].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 9) {
						countcards[9] = countcards[9] - 1;
						$("#countcards9").html(countcards[9]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 9,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[9][0].$el.style.zIndex - 1;
					clockcards[9].splice(0, 0, clockcards[12][3]);
					clockcards[9].pop();
					clockcards[9][clockcards[9].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === -311 && self.y === -180) {
				if (clockcards[10].length > 0) {
					console.log("Card10: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[10][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[10][clockcards[10].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;

						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 10) {
						countcards[10] = countcards[10] - 1;
						$("#countcards10").html(countcards[10]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 10,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[10][0].$el.style.zIndex - 1;
					clockcards[10].splice(0, 0, clockcards[12][3]);
					clockcards[10].pop();
					clockcards[10][clockcards[10].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
			if (self.x === -180 && self.y === -311) {
				if (clockcards[11].length > 0) {
					console.log("Card11: " + $el.id + " zlength: " + $el.style.zIndex + " 0: " + clockcards[11][0].$el.style.zIndex + " " + cardtosymbols(self));
					clockcards[11][clockcards[11].length - 1].setSide('front');
					self.animateTo({
						delay: 250,
						duration: 250,
						x: cardposition[12][0],
						y: cardposition[12][1],
						rot: 0,
						onStart: function onStart() {
							$el.style.zIndex = zIndex;
						},
						onComplete: function onComplete() {
						}
					});
					if (cardrank === 11) {
						countcards[11] = countcards[11] - 1;
						$("#countcards11").html(countcards[11]);
					}
					clockcards[12][3].animateTo({
						delay: 250,
						duration: 250,
						x: self.x,
						y: self.y,
						rot: hourrotation * 11,
						onStart: function onStart() {
						},
						onComplete: function onComplete() {
						}
					});
					clockcards[12][3].$el.style.zIndex = clockcards[11][0].$el.style.zIndex - 1;
					clockcards[11].splice(0, 0, clockcards[12][3]);
					clockcards[11].pop();
					clockcards[11][clockcards[11].length - 1].setSide('front');
					clockcards[12].pop();
					clockcards[12].push(self);
					kingsplayed = kingsplayed - 1;
					countcards[12] = countcards[12] - 1;
					$("#countcards12").html(countcards[12]);
				}
			}
		}
	}
	e.preventDefault();
      if (e.type === 'mousedown') {
        startPos.x = pos.x = e.clientX;
        startPos.y = pos.y = e.clientY;
        addListener(window, 'mousemove', onMousemove);
        addListener(window, 'mouseup', onMouseup);
      } else {
        startPos.x = pos.x = e.touches[0].clientX;
        startPos.y = pos.y = e.touches[0].clientY;
        addListener(window, 'touchmove', onMousemove);
        addListener(window, 'touchend', onMouseup);
      }
      if (!isDraggable) {
        return;
      }
      $el.style[transform] = translate(self.x + 'px', self.y + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
      $el.style.zIndex = maxZ++;
      function onMousemove(e) {
        if (!isDraggable) {
          return;
        }
        if (e.type === 'mousemove') {
          pos.x = e.clientX;
          pos.y = e.clientY;
        } else {
          pos.x = e.touches[0].clientX;
          pos.y = e.touches[0].clientY;
        }
        $el.style[transform] = translate(Math.round(self.x + pos.x - startPos.x) + 'px', Math.round(self.y + pos.y - startPos.y) + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
      }
      function onMouseup(e) {
        if (isFlippable && Date.now() - starttime < 200) {
          self.setSide(self.side === 'front' ? 'back' : 'front');
        }
        if (e.type === 'mouseup') {
          removeListener(window, 'mousemove', onMousemove);
          removeListener(window, 'mouseup', onMouseup);
        } else {
          removeListener(window, 'touchmove', onMousemove);
          removeListener(window, 'touchend', onMouseup);
        }
        if (!isDraggable) {
          return;
        }
        self.x = self.x + pos.x - startPos.x;
        self.y = self.y + pos.y - startPos.y;
      }
    }
    function mount(target) {
      target.appendChild($el);
      self.$root = target;
    }
    function unmount() {
      self.$root && self.$root.removeChild($el);
      self.$root = null;
    }
    function setSide(newSide) {
      if (newSide === 'front') {
        if (self.side === 'back') {
          $el.removeChild($back);
        }
        self.side = 'front';
        $el.appendChild($face);
        self.setRankSuit(self.rank, self.suit);
      } else {
        if (self.side === 'front') {
          $el.removeChild($face);
        }
        self.side = 'back';
        $el.appendChild($back);
        $el.setAttribute('class', 'card');
      }
    }
  }
  function SuitName(suit) {
    return suit === 0 ? 'spades' : suit === 1 ? 'hearts' : suit === 2 ? 'clubs' : suit === 3 ? 'diamonds' : 'joker';
  }
  function addListener(target, name, listener) {
    target.addEventListener(name, listener);
  }
  function removeListener(target, name, listener) {
    target.removeEventListener(name, listener);
  }
  var ease = {
    linear: function linear(t) {
      return t;
    },
    quadIn: function quadIn(t) {
      return t * t;
    },
    quadOut: function quadOut(t) {
      return t * (2 - t);
    },
    quadInOut: function quadInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    cubicIn: function cubicIn(t) {
      return t * t * t;
    },
    cubicOut: function cubicOut(t) {
      return --t * t * t + 1;
    },
    cubicInOut: function cubicInOut(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    quartIn: function quartIn(t) {
      return t * t * t * t;
    },
    quartOut: function quartOut(t) {
      return 1 - --t * t * t * t;
    },
    quartInOut: function quartInOut(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    quintIn: function quintIn(t) {
      return t * t * t * t * t;
    },
    quintOut: function quintOut(t) {
      return 1 + --t * t * t * t * t;
    },
    quintInOut: function quintInOut(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };
  var sort = {
    deck: function deck(_deck2) {
      _deck2.sort = _deck2.queued(sort);
      function sort(next, reverse) {
        var cards = _deck2.cards;
        cards.sort(function (a, b) {
          if (reverse) {
            return a.i - b.i;
          } else {
            return b.i - a.i;
          }
        });
        cards.forEach(function (card, i) {
          card.sort(i, cards.length, function (i) {
            if (i === cards.length - 1) {
              next();
            }
          }, reverse);
        });
      }
    },
    card: function card(_card2) {
      var $el = _card2.$el;
      _card2.sort = function (i, len, cb, reverse) {
        var z = i / 4;
        var delay = i * 10;
        _card2.animateTo({
          delay: delay,
          duration: 400,
          x: -z,
          y: -150,
          rot: 0,
          onComplete: function onComplete() {
            $el.style.zIndex = i;
          }
        });
        _card2.animateTo({
          delay: delay + 500,
          duration: 400,
          x: -z,
          y: -z,
          rot: 0,
          onComplete: function onComplete() {
            cb(i);
          }
        });
      };
    }
  };
  function plusminus(value) {
    var plusminus = Math.round(Math.random()) ? -1 : 1;
    return plusminus * value;
  }
  function fisherYates(array) {
    var rnd, temp;
    for (var i = array.length - 1; i; i--) {
      rnd = Math.random() * i | 0;
      temp = array[i];
      array[i] = array[rnd];
      array[rnd] = temp;
    }
    return array;
  }
  function fontSize() {
    return window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, -2);
  }
  var ____fontSize;
  var shuffle = {
    deck: function deck(_deck3) {
      _deck3.shuffle = _deck3.queued(shuffle);
      function shuffle(next) {
        var cards = _deck3.cards;
        ____fontSize = fontSize();
        fisherYates(cards);
        cards.forEach(function (card, i) {
          card.pos = i;
          card.shuffle(function (i) {
            if (i === cards.length - 1) {
              next();
            }
          });
        });
        return;
      }
    },
    card: function card(_card3) {
      var $el = _card3.$el;
      _card3.shuffle = function (cb) {
        var i = _card3.pos;
        var z = i / 4;
        var delay = i * 2;
        _card3.animateTo({
          delay: delay,
          duration: 200,
          x: plusminus(Math.random() * 40 + 20) * ____fontSize / 16,
          y: -z,
          rot: 0
        });
        _card3.animateTo({
          delay: 200 + delay,
          duration: 200,
          x: -z,
          y: -z,
          rot: 0,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onComplete: function onComplete() {
            cb(i);
          }
        });
      };
    }
  };
  var __fontSize;
  var Clock = {
	deck: function deck(_deck4) {
		_deck4.Clock = _deck4.queued(Clock);
		function Clock(next) {
			clockcards = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
			countcards = [0,0,0,0,0,0,0,0,0,0,0,0,0];
			kingsplayed = 0;
			kingsplayedcount = 0;
			gameover = false;
			var cards = _deck4.cards;
			var len = cards.length;
			__fontSize = fontSize();
			cards.slice(-52).reverse().forEach(function (card, i) {
				card.Clock(i, len, function (i) {
					card.setSide('back');
					if (i === 51) {
						card.setSide('front');
						next();
					}
				});
			});
		}
	},
	card: function card(_card4) {
		var $el = _card4.$el;
		_card4.Clock = function (i, len, cb) {
			var delay = i * 250;
			var rotation;
			var index = Math.floor(i / 4);
			var pos = cardposition[index];
			var xpos = pos[0];
			var ypos = pos[1];
			cardrank = _card4.rank;
			if (cardrank === 12) cardrank = 0;
			if (cardrank === 13) cardrank = 12;
			if (cardrank === index) countcards[cardrank] = countcards[cardrank] + 1;
			$("#countcards" + cardrank).html(countcards[cardrank]);
			if (i < 48)  rotation = index * hourrotation;
			else {
				rotation = 0;
				if (_card4.rank === 13) {
					kingsplayed = kingsplayed + 1;
				}
			}
			clockcards[index].push(_card4);
			_card4.animateTo({
				delay: delay,
				duration: 250,
				x: xpos,
				y: ypos,
				rot: rotation,
				onStart: function onStart() {
					$el.style.zIndex = len - 1 + i;
				},
				onComplete: function onComplete() {
					cb(i);
				}
			});
		};
	}
  };
  var intro = {
    deck: function deck(_deck5) {
      _deck5.intro = _deck5.queued(intro);
      function intro(next) {
        var cards = _deck5.cards;
        cards.forEach(function (card, i) {
          card.setSide('front');
          card.intro(i, function (i) {
            animationFrames(250, 0).start(function () {
              card.setSide('back');
            });
            if (i === cards.length - 1) {
              next();
            }
          });
        });
      }
    },
    card: function card(_card5) {
      var transform = prefix('transform');
      var $el = _card5.$el;
      _card5.intro = function (i, cb) {
        var delay = 500 + i * 10;
        var z = i / 4;
        $el.style[transform] = translate(-z + 'px', '-250px');
        $el.style.opacity = 0;
        _card5.x = -z;
        _card5.y = -250 - z;
        _card5.rot = 0;
        _card5.animateTo({
          delay: delay,
          duration: 1000,
          x: -z,
          y: -z,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onProgress: function onProgress(t) {
            $el.style.opacity = t;
          },
          onComplete: function onComplete() {
            $el.style.opacity = '';
            cb && cb(i);
          }
        });
      };
    }
  };
  function deg2rad(degrees) {
    return degrees * Math.PI / 180;
  }
  function queue(target) {
    var array = Array.prototype;
    var queueing = [];
    target.queue = queue;
    target.queued = queued;
    return target;
    function queued(action) {
      return function () {
        var self = this;
        var args = arguments;
        queue(function (next) {
          action.apply(self, array.concat.apply(next, args));
        });
      };
    }
    function queue(action) {
      if (!action) {
        return;
      }
      queueing.push(action);
      if (queueing.length === 1) {
        next();
      }
    }
    function next() {
      queueing[0](function (err) {
        if (err) {
          throw err;
        }
        queueing = queueing.slice(1);
        if (queueing.length) {
          next();
        }
      });
    }
  }
  function observable(target) {
    target || (target = {});
    var listeners = {};
    target.on = on;
    target.one = one;
    target.off = off;
    target.trigger = trigger;
    return target;
    function on(name, cb, ctx) {
      listeners[name] || (listeners[name] = []);
      listeners[name].push({ cb: cb, ctx: ctx });
    }
    function one(name, cb, ctx) {
      listeners[name] || (listeners[name] = []);
      listeners[name].push({
        cb: cb, ctx: ctx, once: true
      });
    }
    function trigger(name) {
      var self = this;
      var args = Array.prototype.slice(arguments, 1);
      var currentListeners = listeners[name] || [];
      currentListeners.filter(function (listener) {
        listener.cb.apply(self, args);
        return !listener.once;
      });
    }
    function off(name, cb) {
      if (!name) {
        listeners = {};
        return;
      }
      if (!cb) {
        listeners[name] = [];
        return;
      }
      listeners[name] = listeners[name].filter(function (listener) {
        return listener.cb !== cb;
      });
    }
  }
  function Deck(jokers) {
    var cards = new Array(jokers ? 55 : 52);
    var $el = createElement('div');
    var self = observable({ mount: mount, unmount: unmount, cards: cards, $el: $el });
    var $root;
    var modules = Deck.modules;
    var module;
    queue(self);
    for (module in modules) {
      addModule(modules[module]);
    }
    $el.classList.add('deck');
    var card;
    for (var i = cards.length; i; i--) {
      card = cards[i - 1] = _card(i - 1);
      card.mount($el);
    }
    return self;
    function mount(root) {
      $root = root;
      $root.appendChild($el);
    }
    function unmount() {
      $root.removeChild($el);
    }
    function addModule(module) {
      module.deck && module.deck(self);
    }
  }
  Deck.animationFrames = animationFrames;
  Deck.ease = ease;
  Deck.modules = { intro: intro, Clock: Clock, shuffle: shuffle, sort: sort };
  Deck.Card = _card;
  Deck.prefix = prefix;
  Deck.translate = translate;
  return Deck;
})();
