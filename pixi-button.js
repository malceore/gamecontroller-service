function PixiButton(letter, x, y){
  let button = new PIXI.Sprite.fromImage('img/nub.png');
  button.x = x;
  button.y = y;
  button.text = new PIXI.Text(letter, { font: 'bold 350px Arial', fill: '#cc00ff', stroke: '#FFFFFF', strokeThickness: 6 });
  button.interactive = button.buttonMode = true;
  button.text.anchor.set(0.5);
  button.text.x = 205;
  button.text.y = 205;
  button.addChild(button.text);
  return button;
}