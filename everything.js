function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(document).ready(function () {


    var Clippy = function () {
        var self = this;

        self.startPosX = 200;
        self.startPosY = 150;

        self.eyeLeftHeight = 15;
        self.eyeRightHeight = 15;
        self.eyeBallLeftHeight = 5;
        self.eyeBallRightHeight = 5;
        self.rightBrowVerticalOffset = 0;
        self.leftBrowVerticalOffset = 0;

        self.delayBetweenAnimations = 5000;
        self.delayBeforeFirstAnimation = 2000;

        self.Animations = [  ];

        self.DoAnimation = function () {
            var index = randomIntFromInterval(0, self.Animations.length);
            //self.Animations[index]();
            self.AnimateSuggestiveBrows();
            setTimeout(function () { self.DoAnimation(); }, self.delayBetweenAnimations);
        };
        setTimeout(function () { self.DoAnimation(); }, self.delayBeforeFirstAnimation);

        self.AnimateWink = function (options) {
            var shrinkTo = 0;

            if (!options) {
                options = {
                    iterations : 0,
                    returnToSize : self.eyeRightHeight,
                    stepAmount: -1,
                    eyeBallRatio: self.eyeBallRightHeight / self.eyeRightHeight,
                    originalBrowOffset : self.rightBrowVerticalOffset
                };
            } else {
                options.iterations = options.iterations + 1;
            }
            
            self.eyeRightHeight = self.eyeRightHeight + options.stepAmount;
            self.eyeBallRightHeight = self.eyeRightHeight * options.eyeBallRatio;
            self.rightBrowVerticalOffset = options.originalBrowOffset + (options.returnToSize - self.eyeRightHeight);

            if (self.eyeRightHeight === shrinkTo) {
                options.stepAmount = 1;
            }
            if (self.eyeRightHeight === options.returnToSize) {
                // we done? guess so
                return;
            }

            setTimeout(function () { self.AnimateWink(options); }, 10);
        };
        self.Animations.push(self.AnimateWink);

        self.AnimateBlink = function (options) {
            var shrinkTo = 0;

            if (!options) {
                options = {
                    iterations: 0,
                    returnToSize: self.eyeRightHeight,
                    stepAmount: -1,
                    eyeBallRatio: self.eyeBallRightHeight / self.eyeRightHeight,
                    originalBrowOffset: self.rightBrowVerticalOffset
                };
            } else {
                options.iterations = options.iterations + 1;
            }

            self.eyeRightHeight = self.eyeRightHeight + options.stepAmount;
            self.eyeLeftHeight = self.eyeRightHeight;
            self.eyeBallRightHeight = self.eyeRightHeight * options.eyeBallRatio;
            self.eyeBallLeftHeight = self.eyeBallRightHeight;
            self.rightBrowVerticalOffset = options.originalBrowOffset + (options.returnToSize - self.eyeRightHeight);
            self.leftBrowVerticalOffset = self.rightBrowVerticalOffset;

            if (self.eyeRightHeight === shrinkTo) {
                options.stepAmount = 1;
            }
            if (self.eyeRightHeight === options.returnToSize) {
                // we done? guess so
                return;
            }

            setTimeout(function () { self.AnimateBlink(options); }, 10);
        };
        self.Animations.push(self.AnimateBlink);

        self.AnimateSuggestiveBrows = function (options, type) {
            if (!type) type = 'both';
            if (!options) {
                options = {
                    iterations: 0,
                    alterTo: self.rightBrowVerticalOffset - 14,
                    stepAmount: -1,
                    returnTo: self.rightBrowVerticalOffset,
                    loopsRequired: 2,
                    loopsCounter: 1
                };
            } else {
                options.iterations = options.iterations + 1; // what is this even for !
            }

            if (type === 'both' || type === 'right') {
                self.rightBrowVerticalOffset = self.rightBrowVerticalOffset + options.stepAmount;
            }
            if (type === 'both' || type === 'left') {
                self.leftBrowVerticalOffset = self.leftBrowVerticalOffset + options.stepAmount;
            }

            // check to see if we're changing direction
            if (self.rightBrowVerticalOffset <= options.alterTo) {
                options.stepAmount = options.stepAmount * -1;
            }

            // check to see if we're back at the start
            if (self.rightBrowVerticalOffset >= options.returnTo) {
                self.rightBrowVerticalOffset = options.returnTo;
                if (options.loopsCounter < options.loopsRequired) {
                    // switch directions again
                    options.stepAmount = options.stepAmount * -1;
                    options.loopsCounter = options.loopsCounter + 1;
                } else {
                    return;
                }
            }

            setTimeout(function () { self.AnimateSuggestiveBrows(options, type); }, 10);
        };
        self.Animations.push(self.AnimateSuggestiveBrows);

        self.Draw = function (ctx) {
            
            var x = self.startPosX;
            var y = self.startPosY;

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
            ctx.lineTo(x, y - lengthOfHead);
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
            ctx.lineTo(x, y + lengthOfHead + bufferOnRightOfHead);
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
            ctx.lineTo(x, y - startTailLength);
            y = y - startTailLength;
            var flickRadius = 10;
            ctx.arcTo(x, y - flickRadius, x + flickRadius, y - flickRadius, flickRadius);

            ctx.stroke();
            ctx.restore();

            // the eyes
            ctx.save();
            var eyeVerticalOffSet = -20;
            var eyeGap = 50;
            var eyeLeftX = self.startPosX;
            var eyeLeftY = self.startPosY + eyeVerticalOffSet;
            var eyeRightX = self.startPosX + eyeGap;
            var eyeRightY = self.startPosY + eyeVerticalOffSet;


            ctx.beginPath();
            ctx.ellipse(eyeLeftX, eyeLeftY, 20, self.eyeLeftHeight, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(eyeRightX, eyeRightY, 20, self.eyeRightHeight, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.stroke();

            // eye balls
            ctx.beginPath();
            ctx.ellipse(eyeLeftX, eyeLeftY, 10, self.eyeBallLeftHeight, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(eyeRightX, eyeRightY, 10, self.eyeBallRightHeight, 0, 0, 2 * Math.PI);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.stroke();

            // furious brows
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(eyeLeftX, eyeLeftY + self.leftBrowVerticalOffset, 30, 25, 0, 250 * Math.PI / 180, 300 * Math.PI / 180);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(eyeRightX, eyeRightY + self.rightBrowVerticalOffset, 30, 25, 0, 240 * Math.PI / 180, 290 * Math.PI / 180);
            ctx.stroke();

            ctx.restore();

        };
    };
    


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