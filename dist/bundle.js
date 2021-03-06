!(function () {
  var e = document.body.querySelector("canvas"),
    t = e.getContext("2d"),
    n = new rbush();
  function a(e, n, a) {
    //t.fillStyle = "red";
    if (a.properties.surface == "tartan") {
      if (a.properties.colour == "purple") {
        t.fillStyle = "RebeccaPurple";
      } else if (a.properties.colour == "navy") {
        t.fillStyle = "Blue";
      } else {
        t.fillStyle = a.properties.colour;
      }
    } else if (a.properties.surface == "asphalt" || a.properties.surface == "concrete") {
      t.fillStyle = "Gainsboro";
    } else {
      t.fillStyle = "NavajoWhite";
    }

    console.log(t.fillStyle);
    console.log(a.properties.name);
    console.log(a.geometry.coordinates.length);
    console.log(a.geometry.coordinates[0].length);
    console.log(a.geometry.coordinates[1].length);
    
    for (
      var i = (function (e) {
          for (
            var t = {}, n = e.geometry.coordinates[0].concat(e.geometry.coordinates[1]), a = 0;
            a < n.length;
            a++
          ) {
            var i = n[a][0],
              r = n[a][1];
            (t.xMin = t.xMin < i ? t.xMin : i),
              (t.xMax = t.xMax > i ? t.xMax : i),
              (t.yMin = t.yMin < r ? t.yMin : r),
              (t.yMax = t.yMax > r ? t.yMax : r);
          }
          return (
            (t.xMin = o(t.xMin, t.yMin).x),
            (t.yMin = o(t.xMin, t.yMin).y),
            (t.xMax = o(t.xMax, t.yMax).x),
            (t.yMax = o(t.xMax, t.yMax).y),
            t
          );
        })(a),
        r = 200 / Math.abs(i.xMax - i.xMin),
        x = 200 / Math.abs(i.yMax - i.yMin),
        M = (r < x ? r : x) - 0.1,
        c = a.geometry.coordinates[0],
        d = 0;
      d < c.length;
      d++
    ) {
      var h = o(c[d][0], c[d][1]);
      (h = { x: (h.x - i.xMin) * M + e, y: (i.yMax - h.y) * M + n }),
        0 === d ? (t.beginPath(), t.moveTo(h.x, h.y)) : t.lineTo(h.x, h.y);
    }
    t.fill();
    
///////
    t.fillStyle = "white";
    for (
      var i = (function (e) {
          for (
            var t = {}, n = e.geometry.coordinates[0].concat(e.geometry.coordinates[1]), a = 0;
            a < n.length;
            a++
          ) {
            var i = n[a][0],
              r = n[a][1];
            (t.xMin = t.xMin < i ? t.xMin : i),
              (t.xMax = t.xMax > i ? t.xMax : i),
              (t.yMin = t.yMin < r ? t.yMin : r),
              (t.yMax = t.yMax > r ? t.yMax : r);
          }
          return (
            (t.xMin = o(t.xMin, t.yMin).x),
            (t.yMin = o(t.xMin, t.yMin).y),
            (t.xMax = o(t.xMax, t.yMax).x),
            (t.yMax = o(t.xMax, t.yMax).y),
            t
          );
        })(a),
        r = 200 / Math.abs(i.xMax - i.xMin),
        x = 200 / Math.abs(i.yMax - i.yMin),
        M = (r < x ? r : x) - 0.1,
        c = a.geometry.coordinates[1],
        d = 0;
      d < c.length;
      d++
    ) {
      var h = o(c[d][0], c[d][1]);
      (h = { x: (h.x - i.xMin) * M + e, y: (i.yMax - h.y) * M + n }),
        0 === d ? (t.beginPath(), t.moveTo(h.x, h.y)) : t.lineTo(h.x, h.y);
    }
    //////
    t.fill();
  }
  
  function o(e, t) {
    var n = 85.0511287798,
      a = Math.PI / 180,
      o = { x: 0, y: 0 };
    return (
      (o.x = 6378137 * e * a),
      (o.y = Math.max(Math.min(n, t), -n) * a),
      (o.y = 6378137 * Math.log(Math.tan(Math.PI / 4 + o.y / 2))),
      o
    );
  }
  
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  
  function i(n, o) {
    o.clear(), t.clearRect(0, 0, e.width, e.height);
    var i = n.features.length,
      x = Math.min(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      ),
      M = Math.floor(x / 200);
    (e.height = 200 * Math.ceil(((i / M) * 200 - 1) / 200)),
      (e.width = 200 * Math.ceil((x - 1) / 200) - 200);
    
    console.log("Features: " + i);
    
    var myArray = []
    for (let iii = 0; iii < i; iii++) {
      myArray.push(iii)
    }
    myArray = shuffle(myArray);
    
    for (var c = 0, d = 0, h = [], y = 0; y < i; y++) {
      var l = n.features[myArray[y]];
      a(c, d, l);
      var u = {
        //featureId: "way/" + l.properties.id,
        featureId: l.id,
        minX: c,
        minY: d,
        maxX: c + 200,
        maxY: d + 200,
      };
      (c += 200) % e.width == 0 && ((c = 0), (d += 200)), h.push(u);
    }
    o.load(h),
      e.removeEventListener("click", r),
      e.addEventListener("click", r);
  }
  function r(e) {
    var t = e.pageX,
      a = e.pageY,
      o = n.search({ minX: t, minY: a, maxX: t + 1, maxY: a + 1 });
    window.open("https://openstreetmap.org/" + o[0].featureId, "_blank");
  }
  fetch("./pools.json")
    .then(function (e) {
      return e.json();
    })
    .then(function (e) {
      var t,
        a = topojson.feature(e, e.objects.export);
      i(a, n),
        window.addEventListener("resize", function () {
          clearTimeout(t), (t = setTimeout(i(a, n), 300));
        });
    });
})();
//# sourceMappingURL=bundle.js.map
