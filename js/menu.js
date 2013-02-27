(function () {

    var War = this.War;
    var Menu = War.Menu = {};

    Menu.fast = function () {
        var canvas = document.getElementById("canvas");
        var menu = document.getElementById("menu");
        menu.style.display = "none";
        canvas.style.display = "block";

        War.playMusic();
        War.fastGame();
    };

    Menu.mission = function () {
        alert ("NOT IMPLEMENTED YET");
    };

    Menu.credits = function () {
        alert ("NOT IMPLEMENTED YET");
    };

    document.getElementById("fast").addEventListener("click", Menu.fast, false);
    document.getElementById("mission").addEventListener("click", Menu.mission, false);
    document.getElementById("credits").addEventListener("click", Menu.credits, false);

}).call(this);

