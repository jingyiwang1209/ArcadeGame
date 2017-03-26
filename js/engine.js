var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;

    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);

    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        mutant.update(dt);
        zombie.update(dt);
        player.update();
        player.scoring();
        boat.update(dt);
    }

    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png',    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        var image=new Image();
        image.src='images/Heart-40_small.png';
        ctx.drawImage(image,360,50);
        ctx.font="32px serif";
        ctx.fillStyle='#FFD700';
        ctx.fillText(+player.score, 410, 100);
        ctx.font="20px cursive";
        ctx.fillStyle='#FFF';
        ctx.fillText("Press ENTER to change the player", 110, 575);
        renderEntities();

    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        orange.render();
        green.render();
        star.render();
        player.render();
        zombie.render();
        mutant.render();
        boat.render();
        key.render();

    }

    function reset() {
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Gem-Orange.png',
        'images/Gem-Green.png',
        'images/Star.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Heart-40_small.png',
        'images/Rock.png',
        'images/zombie.png',
        'images/mutant.png',
        'images/boat.png',
        'images/Key.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
