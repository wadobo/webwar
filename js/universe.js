(function () {
    var War = this.War;
    var U = War.U = {};
    var dashOffset = 0;

    U.startUniverse = function () {
        U.planets = new Array();
        U.units = new Array();
        U.selectedPlanet = null;
    };

    U.time = function () {
        // everything changes with time
        for (var i=0; i<U.planets.length; i++) {
            U.planets[i].time();
        }

        setTimeout(U.time, 1000);
    };

    U.draw = function (ctx) {
        // drawing planets
        for (var i=0; i<U.planets.length; i++) {
            U.planets[i].draw(ctx);
        }

        // drawing units
        for (var i=0; i<U.units.length; i++) {
            U.units[i].draw(ctx);
        }

        // drawing selection
        if (U.selectedPlanet != null) {
            var p = U.selectedPlanet;
            ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
            ctx.lineWidth=5;
            ctx.mozDash=[10, 5];
            ctx.mozDashOffset=dashOffset++;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.drawSize/2 + 10, 0, Math.PI*2, true);
            ctx.stroke();
        }
    };

    U.newPlanet = function (x, y, size) {
        var p = new War.Planet(x, y, size);
        // checking collisions
        for (var i=0; i<U.planets.length; i++) {
            var p2 = U.planets[i];
            var x1 = p.x;
            var y1 = p.y;
            var r1 = p.size / 2;
            var x2 = p2.x;
            var y2 = p2.y;
            var r2 = p2.size / 2;
            if (Math.sqrt(( x2-x1 ) * ( x2-x1 ) + ( y2-y1 ) * ( y2-y1 )) < ( r1 + r2 )) {
                // collision
                return null;
            }
        }

        U.planets.push(p);
        return p;
    };

    U.click = function (event) {
        for (var i=0; i<U.planets.length; i++) {
            var planet = U.planets[i];
            if (planet.contains(event.clientX, event.clientY)) {
                if (planet.player == War.playerOne) {
                    U.selectPlanet(planet);
                } else if (U.selectedPlanet != null) {
                    // attack!
                    U.selectedPlanet.attack(planet);
                }
            }
        }
    };

    U.selectPlanet = function (planet) {
        U.selectedPlanet = planet;
    };

    U.addUnit = function (unit) {
        U.units.push(unit);
    };

    U.removeUnit = function (unit) {
        U.units.splice(U.units.indexOf(unit), 1);
    };
}).call(this);

