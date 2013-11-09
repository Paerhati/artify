// Generated by CoffeeScript 1.6.3
(function() {
  window.greedyAlgorithm = function(chars, validPixels) {
    var a, allShitty, b, char, checks, currTime, currX, currY, end, finalX, finalY, fits, i, j, k, keep, newChars, results, seconds, _i, _j, _k, _l, _len, _m, _ref, _ref1, _ref2, _ref3;
    seconds = new Date().getTime() / 1000;
    currTime = seconds;
    results = [];
    while (chars.length > 0) {
      allShitty = true;
      newChars = [];
      for (_i = 0, _len = chars.length; _i < _len; _i++) {
        char = chars[_i];
        currTime = new Date().getTime() / 1000;
        if (currTime > seconds + 10) {
          break;
        }
        keep = true;
        checks = [];
        checks[0] = [0, 0];
        checks[1] = [char.width, 0];
        checks[2] = [0, char.height];
        checks[3] = [char.width, char.height];
        fits = true;
        finalX = -1;
        finalY = -1;
        end = false;
        console.log(char.attempts);
        if (char.attempts <= 3) {
          allShitty = false;
        }
        for (i = _j = 0, _ref = validPixels.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
          for (j = _k = 0, _ref1 = validPixels[i].length; 0 <= _ref1 ? _k < _ref1 : _k > _ref1; j = 0 <= _ref1 ? ++_k : --_k) {
            k = 0;
            fits = true;
            while (k < 4 - char.attempts) {
              currX = checks[k][0];
              currY = checks[k][1];
              if (currX + i >= validPixels.length) {
                currX = validPixels.length - i - 1;
              }
              if (currY + j >= validPixels[i].length) {
                currY = validPixels[i].length - j - 1;
              }
              if (!validPixels[currX + i][currY + j]) {
                fits = false;
              }
              k++;
            }
            if (fits) {
              end = true;
              finalX = i;
              finalY = j;
              break;
            }
          }
          if (end) {
            break;
          }
        }
        end = false;
        char.attempts++;
        if (fits) {
          keep = false;
          results.push([char, finalX, finalY]);
          for (a = _l = 0, _ref2 = char.width; 0 <= _ref2 ? _l <= _ref2 : _l >= _ref2; a = 0 <= _ref2 ? ++_l : --_l) {
            for (b = _m = 0, _ref3 = char.height; 0 <= _ref3 ? _m <= _ref3 : _m >= _ref3; b = 0 <= _ref3 ? ++_m : --_m) {
              validPixels[Math.floor(a + finalX, validPixels.length - 1)][Math.floor(b + finalY, validPixels[0].length - 1)] = false;
            }
          }
        }
        if (keep) {
          newChars.push(char);
        }
      }
      if (!allShitty) {
        chars = newChars;
      } else {
        chars = [];
      }
    }
    return results;
  };

}).call(this);
