/*
Main for paddle publishers, sets up stage and pixi sprites for interaction.
Brandon T. Wood 2018
*/

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(400, 300);
renderer.backgroundColor = 0x8888ff;

// add the renderer view element to the DOM
document.querySelector('#gameDiv').appendChild(renderer.view);

// create a stage
var stage = new PIXI.Container();

// create a square to move around with the left stick
var leftSquare = new PIXI.Graphics();
leftSquare.x = 30;
leftSquare.y = 30;
leftSquare.xVel = 0;
leftSquare.yVel = 0;

leftSquare.beginFill(0x55ff55, 1);
leftSquare.drawRect(0, 0, 20, 20);
leftSquare.endFill();

// Define a couple of sticks for the user to control;
var leftStick = new PixiStick.StickController(75, 225, {
    type: 'xy',
    nub: new PIXI.Sprite.fromImage('img/nub.png'),
    well: new PIXI.Sprite.fromImage('img/well.png'),
    opacity: 0.3
});

//Define some buttons
var aButton = new PIXI.Sprite.fromImage('img/nub.png');
aButton.interactive = aButton.buttonMode = true;
aButton.scale.x = aButton.scale.y = 0.1;
aButton.click = aButton.tap = () => {
    connection.send("ID:" + ID + ":Button Pressed:A");
};

stage.addChild(aButton);

// just gonna be lazy and copy paste here for now.
var bButton = new PIXI.Sprite.fromImage('img/nub.png');
bButton.interactive = bButton.buttonMode = true;
bButton.scale.x = bButton.scale.y = 0.1;
bButton.click = bButton.tap = () => {
    connection.send("ID:" + ID + ":Button Pressed:B");
};
bButton.x = 300;
aButton.x = 200;
bButton.y = 200;
aButton.y = 200;
stage.addChild(bButton);

stage.addChild(leftSquare);
stage.addChild(leftStick);

var aButtonText = new PIXI.Text('A', { font: 'bold 350px Arial', fill: '#cc00ff', stroke: '#FFFFFF', strokeThickness: 6 });
var bButtonText = new PIXI.Text('B', { font: 'bold 350px Arial', fill: '#cc00ff', stroke: '#FFFFFF', strokeThickness: 6 });
aButtonText.x = bButtonText.x = 75;
aButton.addChild(aButtonText);
bButton.addChild(bButtonText);

var playerSpeed = 10; // Define a maximum speed for the squares

// Handle leftStick input
leftStick.onAxisChange = function(axes) {
    leftSquare.xVel = axes.x * playerSpeed;
    leftSquare.yVel = axes.y * playerSpeed;
    connection.send("ID:" + ID + " axes y:" + axes.y + " axes x:" + axes.x);
}

// Render the scene
requestAnimationFrame(animate);

function animate() {
    requestAnimationFrame(animate);

    // Compute new leftSquare position
    leftSquare.x += leftSquare.xVel;
    leftSquare.y += leftSquare.yVel;

    // Lock the leftSquare into the viewable area
    if (leftSquare.x > 380) leftSquare.x = 380;
    if (leftSquare.x < 0) leftSquare.x = 0;
    if (leftSquare.y > 280) leftSquare.y = 280;
    if (leftSquare.y < 0) leftSquare.y = 0;


    // render the stage   
    renderer.render(stage);
}