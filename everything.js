$(document).ready(function () {


    var Clippy = function () {
        var self = this;
        
        self.Draw = function (ctx) {


            var x = 200;
            var y = 150;

            ctx.save();

            ctx.strokeStyle = '#B3B3BB';
            //var grad = ctx.createLinearGradient(200, 0, 270, 0);
            //grad.addColorStop(0, "#B3B3BB");
            //grad.addColorStop(1, "#696975");
            //ctx.strokeStyle = grad;

            ctx.lineWidth = '5';
            ctx.beginPath();
            ctx.moveTo(x, y);
            y = y + 50;
            ctx.lineTo(x, y);

            // the nose thing
            var radiusOfNose = 24;
            ctx.arcTo(x, y + radiusOfNose, x + radiusOfNose, y + radiusOfNose, radiusOfNose);
            y = y + radiusOfNose;
            x = x + radiusOfNose;
            ctx.arcTo(x + radiusOfNose, y, x + radiusOfNose, y - radiusOfNose, radiusOfNose);
            y = y - radiusOfNose;
            x = x + radiusOfNose;

            // right side of the head
            var lengthOfHead = 120;
            ctx.lineTo(x, y - lengthOfHead)
            y = y - lengthOfHead;

            // top of head
            var radiusOfHead = 28;
            ctx.arcTo(x, y - radiusOfHead, x - radiusOfHead, y - radiusOfHead, radiusOfHead);
            y = y - radiusOfHead;
            x = x - radiusOfHead;
            ctx.arcTo(x - radiusOfHead, y, x - radiusOfHead, y + radiusOfHead, radiusOfHead);
            y = y + radiusOfHead;
            x = x - radiusOfHead;

            // left side of the head
            //var lengthOfHead = 100;
            var bufferOnRightOfHead = 30;
            ctx.lineTo(x, y + lengthOfHead + bufferOnRightOfHead)
            y = y + lengthOfHead + bufferOnRightOfHead;

            // the ... chin?
            var radiusOfChin = 32;
            ctx.arcTo(x, y + radiusOfChin, x + radiusOfChin, y + radiusOfChin, radiusOfChin);
            y = y + radiusOfChin;
            x = x + radiusOfChin;
            ctx.arcTo(x + radiusOfChin, y, x + radiusOfChin, y - radiusOfChin, radiusOfChin);
            y = y - radiusOfChin;
            x = x + radiusOfChin;

            // the tail thing
            var startTailLength = 40;
            ctx.lineTo(x, y - startTailLength)
            y = y - startTailLength;
            var flickRadius = 10
            ctx.arcTo(x, y - flickRadius, x + flickRadius, y - flickRadius, flickRadius);

            ctx.stroke();
            ctx.restore();

            // the eyes
            ctx.save();
            var leftX = 200;
            var leftY = 130;
            var rightX = 250;
            var rightY = 130;

            ctx.beginPath();
            ctx.ellipse(leftX, leftY, 20, 15, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(rightX, rightY, 20, 15, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.stroke();

            // eye balls
            ctx.beginPath();
            ctx.ellipse(leftX, leftY, 10, 5, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(rightX, rightY, 10, 5, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.stroke();

            // furious brows

            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(leftX, leftY, 30, 25, 0, 250 * Math.PI / 180, 300 * Math.PI / 180);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(rightX, rightY, 30, 25, 0, 240 * Math.PI / 180, 290 * Math.PI / 180);
            ctx.stroke();

            ctx.restore();

        }
    }
    


    var clippy = new Clippy();

    function draw() {

        var canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();

            clippy.Draw(ctx);

            ctx.restore();
            setTimeout(function () { draw(); }, 20);
        }
    }
    draw();
});