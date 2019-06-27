/* */

/* we've selected the element 'canvas' that's located inside the html file which we've set inside a variable 
just so we don't have to write the whole thing everytime we need to manipulate it */
var cvs = document.getElementById('canvas');
/* We've attached our element canvas (via the cvs variable) to getContext which is a method/property that basically gives us access to the canvas)
and same as above we've set it into a variable */
var ctx = cvs.getContext('2d');



/* setting the images*/
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image;
/*affecting the image source */
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


/* We're setting the width of the gap between the two pipes at first */
var gap = 85;
var constant = 0;

/* Merci à Stéphane  pour le code ->  if else condition that indicates 
that if the image is complete the pipeNorth image has to show up with a gap 
else it has to wait for the image to finish onload and then show the pipe + its gap*/
if (pipeNorth.complete)
    constant = pipeNorth.height + gap
else {
    pipeNorth.onload = () => {
        constant = pipeNorth.height + gap
    }
} 

// bird coordinates
var bX = 10;
var bY = 150;

var gravity = 1;
var score = 0;

// Audio files 

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

/*Determining what will occur once the user press a key on his/her keyboard */

document.addEventListener("keydown", moveUp);
function moveUp() {
    bY -= 25;
    fly.play();
}

// Pipe coordinates

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw() {

    ctx.drawImage(bg, 0, 0); // painting the background onto the canvas, the x position as well as the Y position are set to 0, 
    for (var i = 0; i < pipe.length; i++) { // For loop used in order to draw the pipe and loop our pipe array -> initialize the variable (to 0), condition (if the variable is less than the pipe array's length), iterrate
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y); // We've replaced the x position with -> the variable pipe[i] 
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x-- // this creates the moving of both pipes to the left continuously

        if (pipe[i].x == 105) {
            pipe.push({ // pushing a new object to the array pipe
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }

        // Detect collision
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
            && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >=
                pipe[i].y + constant || bY + bird.height >= cvs.height - fg.height)) {
            location.reload(); // reload the page
        }

        //User's score goes up everytime the bird doesn't crash into a pipe

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "30px Verdana";
    ctx.fillText("SCORE: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw); // callback function to draw the image continuously
}

draw();







