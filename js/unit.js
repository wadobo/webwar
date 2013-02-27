(function () {
    // Unit
    var War = this.War;
    var Unit = War.Unit = function (origin, target, size) {
        this.origin = origin;
        this.player = origin.player;
        this.target = target;
        this.size = size;
        this.drawSize = size / 1.2;
        this.color = this.player.color;

        this.randomizeStart = function () {
            var x = this.origin.x;
            var y = this.origin.y;
            var s = this.origin.drawSize;
            var r = this.origin.drawSize / 2;

            this.x = Math.floor(Math.random() * s + x - r);
            this.y = Math.floor(Math.random() * s + y - r);
        };

        this.randomizeStart();

        var dx = (this.x - this.target.x);
        var dy = (this.y - this.target.y);
        var distance = Math.sqrt(dx*dx + dy*dy);
        this.stepX = dx / (distance / 4);
        this.stepY = dy / (distance / 4);

        this.draw = function (ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.drawSize/2, 0, Math.PI*2, true);
            ctx.fill();

            ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
            ctx.lineWidth=1;
            ctx.mozDash=[3, 2];
            ctx.mozDashOffset+=1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.drawSize/2, 0, Math.PI*2, true);
            ctx.stroke();
        };

        this.update = function () {
            var unit = this;
            this.x -= this.stepX;
            this.y -= this.stepY;
            if (this.target.contains(this.x, this.y)) {
                this.target.attacked(unit);
                War.U.removeUnit(unit);
            } else {
                setTimeout(function () { unit.update(); }, 40);
            }
        };

        this.go = function () {
            var unit = this;
            War.U.addUnit(unit);
            setTimeout(function () { unit.update(); }, 40);
        };
    };
}).call(this);

