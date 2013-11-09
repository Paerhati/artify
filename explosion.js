// Generated by CoffeeScript 1.6.3
(function() {
  var Explosion, Particle, w,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  w = window;

  w.findClickPos = function(e) {
    var posx, posy;
    posx = 0;
    posy = 0;
    if (!e) {
      e = window.event;
    }
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return alert("X: " + posx + " Y: " + posy);
  };

  w.getOffset = function(el) {
    var body, _x, _y;
    body = document.getElementsByTagName("body")[0];
    _x = 0;
    _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return {
      top: _y + body.scrollTop,
      left: _x + body.scrollLeft
    };
  };

  Particle = (function() {
    function Particle(elem, body) {
      this.elem = elem;
      this.parent = this.elem.parentNode;
      this.char = elem.innerHTML;
      this.body = body;
      this.style = this.parent.style;
      this.fontsize = parseFloat(window.getComputedStyle(this.parent).getPropertyValue('font-size'));
      this.fontfamily = window.getComputedStyle(this.parent).getPropertyValue('font-family');
      this.fontweight = window.getComputedStyle(this.parent).getPropertyValue('font-weight');
      this.textdecoration = window.getComputedStyle(this.parent).getPropertyValue('text-decoration');
      this.fontstyle = window.getComputedStyle(this.parent).getPropertyValue('font-style');
      this.lineheight = window.getComputedStyle(this.parent).getPropertyValue('line-height');
      this.textalign = window.getComputedStyle(this.parent).getPropertyValue('text-allign');
      this.stroke = window.getComputedStyle(this.parent).getPropertyValue('stroke');
      this.strokeweight = window.getComputedStyle(this.parent).getPropertyValue('stroke-weight');
      this.cssprops = [this.fontsize, this.fontfamily, this.fontweight, this.textdecoration, this.fontstyle, this.lineheight, this.textalign, this.stroke, this.strokeweight];
      this.elem.style['zIndex'] = -9999;
      this.transformX = 0;
      this.transformY = 0;
      this.transformRotation = 0;
      this.offsetTop = window.getOffset(this.elem).top;
      this.offsetLeft = window.getOffset(this.elem).left;
      this.width = elem.offsetWidth;
      this.height = elem.offsetHeight;
    }

    return Particle;

  })();

  this.Particle = Particle;

  Explosion = (function() {
    function Explosion() {
      this.justClicked = __bind(this.justClicked, this);
      var char, curr, _i, _len, _ref, _ref1,
        _this = this;
      this.body = document.getElementsByTagName("body")[0];
      this.pixels = 0;
      if ((_ref = this.body) != null) {
        _ref.onclick = function(event) {
          return _this.justClicked(event);
        };
      }
      this.body.addEventListener("touchstart", function(event) {
        return _this.touchEvent = event;
      });
      this.body.addEventListener("touchmove", function(event) {
        _this.touchMoveCount || (_this.touchMoveCount = 0);
        return _this.touchMoveCount++;
      });
      this.body.addEventListener("touchend", function(event) {
        if (_this.touchMoveCount < 2) {
          _this.dropBomb(_this.touchEvent);
        }
        return _this.touchMoveCount = 0;
      });
      this.explosifyNodes(this.body.childNodes);
      this.chars = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = document.getElementsByTagName('particle');
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          char = _ref1[_i];
          curr = new Particle(char, this.body);
          _results.push(curr);
        }
        return _results;
      }).call(this);
      _ref1 = document.getElementsByTagName('particle');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        char = _ref1[_i];
        char.style.visibility = 'hidden';
      }
    }

    Explosion.prototype.justClicked = function(event) {
      var pos;
      return pos = window.findClickPos(event);
    };

    Explosion.prototype.explosifyNodes = function(nodes) {
      var node, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        _results.push(this.explosifyNode(node));
      }
      return _results;
    };

    Explosion.prototype.explosifyNode = function(node) {
      var name, newNode, _i, _len, _ref;
      _ref = ['script', 'style', 'iframe', 'canvas', 'video', 'audio', 'textarea', 'embed', 'object', 'select', 'area', 'map', 'input'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        if (node.nodeName.toLowerCase() === name) {
          return;
        }
      }
      switch (node.nodeType) {
        case 1:
          return this.explosifyNodes(node.childNodes);
        case 3:
          if (!/^\s*$/.test(node.nodeValue)) {
            if (node.parentNode.childNodes.length === 1) {
              return node.parentNode.innerHTML = this.explosifyText(node.nodeValue);
            } else {
              newNode = document.createElement("particles");
              newNode.innerHTML = this.explosifyText(node.nodeValue);
              return node.parentNode.replaceChild(newNode, node);
            }
          }
      }
    };

    Explosion.prototype.explosifyText = function(string) {
      var char, chars, index;
      chars = (function() {
        var _i, _len, _ref, _results;
        _ref = string.split('');
        _results = [];
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          char = _ref[index];
          if (!/^\s*$/.test(char)) {
            _results.push("<particle style='display:inline-block;'>" + char + "</particle>");
          } else {
            _results.push('&nbsp;');
          }
        }
        return _results;
      })();
      chars = chars.join('');
      chars = (function() {
        var _i, _len, _ref, _results;
        _ref = chars.split('&nbsp;');
        _results = [];
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          char = _ref[index];
          if (!/^\s*$/.test(char)) {
            _results.push("<word style='white-space:nowrap'>" + char + "</word>");
          } else {
            _results.push(char);
          }
        }
        return _results;
      })();
      return chars.join(' ');
    };

    return Explosion;

  })();

  this.Explosion = Explosion;

}).call(this);
