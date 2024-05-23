noseX=0;
noseY=0;
difference = 0;
rightWristX = 0;
leftWristX = 0;


function setup ()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(700, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log ('PoseNet se inicializó');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX +"noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX = " + leftWristX + "rightWristX = "+ rightWristX + "difference = " + difference);
    }
}

function draw ()
{
    background('#969A97');
    document.getElementById("square_side").innerHTML = "El ancho y alto del cuadrado será= " + difference + "px";
    fill('#F90093');
    stroke('cyan');
    square(noseX, noseY, difference);
}