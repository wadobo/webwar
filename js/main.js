(function () {

    var War = this.War = {};
    War.maxPlanets = 15;
    War.canvas = document.getElementById('canvas');

    War.draw = function () {
        var w = War.canvas.width;
        var h = War.canvas.height;
        var ctx = War.canvas.getContext('2d');
        ctx.clearRect(0,0,w,h);

        War.U.draw(ctx);

        setTimeout(War.draw, 33);
    }

    War.resize = function () {
        var width = window.innerWidth;
        var height = window.innerHeight;
        War.canvas.width = width;
        War.canvas.height = height;
    }

    War.initApplication = function () {
        War.resize();
        // game timers :P
        setTimeout(War.time, 1000);
        setTimeout(War.draw, 33);

        window.onresize = War.resize;
    }

    War.time = function () {
        if (War.players != undefined) {
            for (var i=0; i<War.players.length; i++) {
                War.players[i].time();
            }
        }
        setTimeout(War.time, 1000);
    };

    War.fastGame = function () {
        War.initApplication();

        War.U.startUniverse();
        War.playerOne = new War.Player('unnamed', 'rgba(0, 0, 255, 0.6)');
        var ia1 = new War.IA1('ia1', 'rgba(255, 0, 0, 0.6)');
        var ia2 = new War.IA2('ia2', 'rgba(0, 255, 0, 0.6)');

        War.players = new Array();
        War.players.push(War.playerOne);
        War.players.push(ia1);
        War.players.push(ia2);

        while (War.U.planets.length < War.maxPlanets) {
            width = War.canvas.width;
            height = War.canvas.height;
            var s = Math.floor(Math.random() * 50) + 50;
            var x = Math.floor(Math.random() * (width - 100)) + 50;
            var y = Math.floor(Math.random() * (height - 100)) + 50;
            War.U.newPlanet(x, y, s);
        }

        War.U.planets[0].player = War.playerOne;
        War.U.planets[1].player = ia1;
        War.U.planets[2].player = ia2;

        War.U.time();
    };

    War.playMusic = function () {
        var music = document.getElementById("music");
        var tracks = [
            'Battery.ogg',
            'DeepSpace.ogg',
            'NorthPole.ogg',
            'Silent.ogg',
            'whyzah.ogg',
        ];
        var randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        music.src = 'data/music/'+randomTrack;
        music.play();
    };

    War.click = function (event) {
        War.U.click(event);
    };

    War.canvas.addEventListener('click', function (event) {
        War.click(event);
    }, false);
}).call(this);
