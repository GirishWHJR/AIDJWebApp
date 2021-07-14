song="";
scoreLeftwrist= 0;
scoreRightwrist=0;
LeftwristX= 0;
LeftwristY= 0;
RightwristX = 0;
RightwristY = 0;

function preload()
{
    song= loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet =ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw()
{
    image(video, 0, 0, 600, 500,);
    fill("#FF0000");
    stroke("#FF0000");
    
    if(scoreRightwrist > 0.2)
    {
        circle(RightwristX,RightwristY,20);

        if(RightwristY > 0 && RightwristY <=100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(RightwristY > 100 && RightwristY<=200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(RightwristY > 200 && RightwristY <=300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5";
            song.rate(1.5);
        }
        else if(RightwristY > 300 && RightwristY <= 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if(RightwristY > 400 && RightwristY <= 500)
        {
            document.getElementById("speed").innerHTML="Speed =2.5x";
            song.rate(2.5);
        }

    }

    if(scoreLeftwrist > 0.2)
    {
        circle(LeftwristX,LeftwristY,20);
        InNumberleftWristY = Number(LeftwristY);
        remove_decimals =floor(InNumberleftWristY);
        volume= remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
        song.setVolume(volume);
    }
}

function play()
{
song.play();
song.setVolume(1);
song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftwrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftwrist =" +scoreLeftwrist);
        LeftwristX = results[0].pose.leftWrist.x;
        LeftwristY = results[0].pose.leftWrist.y
        console.log("LeftwristX = " + LeftwristX + "LeftwristY = " + LeftwristY);

        scoreRightwrist= results[0].pose.keypoints[10].score;
        console.log("scoreRightwrist=" +scoreRightwrist);
        RightwristX= results[0].pose.rightWrist.x;
        RightwristY= results[0].pose.rightWrist.y;
        console.log("RightwristX = " + RightwristX + "RightwristY = " +RightwristY);
    }
}