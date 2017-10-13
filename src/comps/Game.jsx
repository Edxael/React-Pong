import React from 'react';

class Game extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {

      // ------------- Variables & Constants ---------------
      const canvas = this.refs.canvas;
      const canvasContext = this.refs.canvas.getContext('2d');
      const framesPerSecond = 40;

      let ballX = 50;  // Ball initial: location, speed
      let ballY = 50;
      let ballSpeedX = 10;
      let ballSpeedY = 4;
      const winningScore = 3;
      const paddleColorX2 = "blue";
      let player1Score = 0;
      let player2Score = 0;
      let showWinScreen = true;
      canvasContext.font = "20px Verdana";

      const paddleHeight = 100; // Padles Measurements.
      const paddleWidth = 15;
      let paddle1Y = 100;  // User paddle Location.
      let paddle2Y = 250; // Machine Paddle Location


      // ---------------------- FUNCTIONS ------------------------
      const makeRectangleShape = (cX, cY, width, height, color ) => { canvasContext.fillStyle = color ; canvasContext.fillRect( cX, cY,width, height); }
      const makeCircleShape = (cX, cY, radious, angle, color ) => { canvasContext.fillStyle = color; canvasContext.beginPath(); canvasContext.arc(cX, cY, radious, angle, Math.PI*2, true ); canvasContext.fill(); }


      const draw = () => {  // CALL to make all the shapes.
        makeRectangleShape(0, 0, canvas.width, canvas.height, 'rgba(0, 0, 0, 0.5)' )  // Canvas Creation
        new Array(canvas.height).fill(0).map((c, i) => { if (i % 40 === 0){ makeRectangleShape(canvas.width / 2 - 1, i, 2, 20, 'red' )} });  // Net Drawing.
        makeRectangleShape(10, paddle1Y, paddleWidth, paddleHeight, paddleColorX2)           // Left Paddle creation, (User)
        makeRectangleShape((canvas.width - 25), paddle2Y, paddleWidth, paddleHeight, paddleColorX2)          // Right Paddle creation (Machine)
        makeCircleShape(ballX, ballY, 10, 0, "yellow")                                 // Ball creation
        canvasContext.fillText(("Score: " + player1Score ), 100, 100);
        canvasContext.fillText(("Score: " + player2Score ), canvas.width -150, 100);
      }


      const computerAI = () => {
        let paddle2YCenter = paddle2Y + (paddleHeight / 2) ;
        if(paddle2YCenter < ballY - 40) { paddle2Y += 13 }
        else if(paddle2YCenter < ballY + 40) { paddle2Y -= 13 }
      }

      const move = () => {   // This function is incharge of the moving parts.

          if(showWinScreen){    // if one player wins, will stop the game and show the scores....
            if(player1Score >= winningScore){ canvasContext.fillStyle = 'white'; canvasContext.font = "30px Verdana"; canvasContext.fillText("YOU WIN .... Click to Play Again", canvas.width / 4 , 50) }
            if(player2Score >= winningScore){ canvasContext.fillStyle = 'white'; canvasContext.font = "30px Verdana"; canvasContext.fillText("YOU LOSE .... Click to Play Again", canvas.width / 4 , 50) }
            return;
          }

          computerAI()

          ballX += ballSpeedX;
          ballY += ballSpeedY;

          if(ballX > 790) {  //Bouncing the ball in the X Axix      ballSpeedX = -ballSpeedX
            if( (ballY  > paddle2Y) && (ballY < paddle2Y + paddleHeight) ){
              ballSpeedX = -ballSpeedX;  // Bounce the ball
              let deltaY = ballY - (paddle2Y+paddleHeight / 2);
              ballSpeedY = deltaY * 0.35;
            } else {
              player1Score += 1;
              ballReset(); // Reset the ball.
            }
           }

          if(ballX < 10) {
            if( (ballY  > paddle1Y) && (ballY < paddle1Y + paddleHeight) ){
              ballSpeedX = -ballSpeedX;  // Bounce the ball
              let deltaY = ballY - (paddle1Y+paddleHeight / 2);
              ballSpeedY = deltaY * 0.35;
            } else {
              player2Score += 1;
              ballReset(); // Reset the ball.
            }
          }

          if(ballY > 590) { ballSpeedY = -ballSpeedY }  //Bouncing the ball in the Y Axix
          if(ballY < 10) { ballSpeedY = -ballSpeedY }
      }

      const CalculateMousePosition = (mouseEvent) => {
        let rect = canvas.getBoundingClientRect();
        let root = document.documentElement;
        let mouseX = mouseEvent.clientX - rect.left - root.scrollLeft;
        let mouseY = mouseEvent.clientY - rect.top - root.scrollTop;
        return { x: mouseX, y: mouseY }
      }

      const handleMouseClick = (evt) => {
        if(showWinScreen){
          player1Score = 0;
          player2Score = 0;
          canvasContext.font = "20px Verdana";
          showWinScreen = false;
        }
      }

      canvas.addEventListener("mousedown", handleMouseClick);  // calls the function that restart the game when "MOUSE-CLICK"

      canvas.addEventListener('mousemove', (evt) => {  // Controlling the User Paddle by calculating the position of the mouse.
        let mousePos = CalculateMousePosition(evt);
        paddle1Y = mousePos.y - (paddleHeight / 2);
      })

      const ballReset = () => {   // this will remove the ball from whaterver position is and drope it in the center.
        if((player1Score >= winningScore) || (player2Score >= winningScore)){ showWinScreen = true; }

        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
      }


      setInterval(() => { draw(); move(); }, 1000/framesPerSecond);

    }

    render() {
        return (
            <canvas ref="canvas" width={800} height={600}/>
        );
    }
}

export default Game;
