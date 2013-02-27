(function () {
    // Player
    var War = this.War;
    var Player = War.Player = function (name, color) {
        this.color = color;
        this.name = name;
        this.time = function () { };

        this.mine = function () {
            return War.U.planets.filter(function (e, i, a) { return e.player == this }, this);
        };

        this.notMine = function () {
            return War.U.planets.filter(function (e, i, a) { return e.player != this }, this);
        };
    };
    Player.prototype.constructor = Player;

    // IA
    // always ramdom planet
    var IA1 = War.IA1 = function (name, color) {
        this.color = color;
        this.name = name;
        this.died = false;
        this.time = function () {
            if (!this.died) {
                var mine = this.mine();
                var notMine = this.notMine();
                if (mine.length == 0) {
                    this.died = true;
                } else if (notMine.length != 0) {
                    var index = Math.floor(Math.random() * notMine.length);
                    var index2 = Math.floor(Math.random() * mine.length);
                    mine[index2].attack(notMine[index]);
                } else {
                    // I WIN
                    console.log(this.name + " IA1 wins!");
                }
            }
        };
    };
    IA1.prototype = new Player;

    // always attack the nearest planet
    var IA2 = War.IA2 = function (name, color) {
        this.color = color;
        this.name = name;
        this.died = false;
        this.time = function () {
            if (!this.died) {
                var notMine = this.notMine();
                var mine = this.mine();
                if (mine.length == 0) {
                    this.died = true;
                } else if (notMine.length != 0) {
                    mine.forEach(function (p) {
                        var nearest = notMine.sort(function (a, b) {
                            return p.distance(a) > p.distance(b) ? 1 : -1;
                        });
                        p.attack(nearest[0]);
                    });
                } else {
                    // I WIN
                    console.log(this.name + " IA2 wins!");
                }
            }
        };
    };
    IA2.prototype = new Player;
}).call(this);
