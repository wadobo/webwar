(function () {
    // Planet
    var War = this.War;
    var Planet = War.Planet = function (x, y, size) {
        this.color = 'rgba(177, 82, 0, 0.4)';
        this.size = size;
        this.drawSize = size / 2;
        this.x = x;
        this.y = y;
        this.units = size;
        this.player = null;
        this.image = new Image();
        this.image.src = "data/img/planet.png";
        this.shadow = new Image();
        this.shadow.src = "data/img/shadow.png";

        this.draw = function (ctx) {
            var left = this.x - this.drawSize / 2;
            var top = this.y - this.drawSize / 2;

            if (this.player != null) {
                ctx.fillStyle = this.player.color;
            } else {
                ctx.fillStyle = this.color;
            }

            ctx.drawImage(this.image, left, top, this.drawSize, this.drawSize);
            ctx.drawImage(this.shadow, left, top, this.drawSize, this.drawSize);

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.drawSize/2, 0, Math.PI*2, true);
            ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.font = "15px Arial";
            var m = ctx.measureText(this.units);
            ctx.fillText(this.units, this.x - m.width / 2, this.y + 5);
        };

        this.time = function () {
            if (this.player != null && this.units <= this.size * 2) {
                this.units += Math.floor(this.size / 20);
            }
        };

        this.contains = function (x, y) {
            var left = this.x - this.drawSize / 2;
            var right = left + this.drawSize;
            var top = this.y - this.drawSize / 2;
            var bottom = top + this.drawSize;
            return (x >=left && x<=right && y>=top && y<=bottom);
        };

        this.attack = function (target) {
            if (this.units > 10) {
                this.units -= 10;
                unit = new War.Unit(this, target, 10);
                unit.go();
            }
        };

        this.attacked = function (unit) {
            if (this.player == unit.player) {
                this.units += unit.size;
            } else {
                this.units -= unit.size * 1.5;
            }

            if (this.units <= 0) {
                // conquested
                this.units = -this.units;
                this.player = unit.player;
                if (War.U.selectedPlanet == this) {
                    War.U.selectedPlanet = null;
                };
            }
        };

        this.distance = function (p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            return Math.sqrt(dx*dx + dy*dy);
        };
    };
}).call(this);
