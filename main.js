var song="";
var leftWristx=0;
var leftWristy=0;
var rightWristx=0;
var rightWristy=0;
function preload(){
song=loadSound("music.mp3");
}


function setup(){
canvas=createCanvas(600,600);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotResult);
}


function draw(){
image(video,0,0,600,600);
fill("#FF0000");
stroke("#FF0000");
if(scorerightWrist>0.2){
circle(rightWristx,rightWristy,20);

if(rightWristy>0&&rightWristy<=100){
document.getElementById("speed").innerHTML="speed=0.5x";
song.rate(0.5);
}
if(rightWristy>100&&rightWristy<=200){
    document.getElementById("speed").innerHTML="speed=1x";
    song.rate(1);
    }
    if(rightWristy>200&&rightWristy<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
        }
        if(rightWristy>300&&rightWristy<=400){
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2);
            }
            if(rightWristy>400&&rightWristy<=500){
                document.getElementById("speed").innerHTML="speed=2.5x";
                song.rate(2.5);
                }
}
if(scoreleftWrist>0.2){
circle(leftWristx,leftWristy,20);
numleftWristy=Number(leftWristy);
no_deci=floor(numleftWristy);
vol=no_deci/500;
document.getElementById("volume").innerHTML="Volume="+vol;
song.setVolume(vol);
}
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


function modelLoaded(){
console.log("modelLoaded");
}


function gotResult(results){
    if(results.length>0){
console.log(results);
leftWristx=results[0].pose.leftWrist.x;


console.log("leftWristx="+leftWristx);

leftWristy=results[0].pose.leftWrist.y;
console.log("leftWristy="+leftWristy);

rightWristx=results[0].pose.rightWrist.x;
console.log("rightWristx="+rightWristx);

rightWristy=results[0].pose.rightWrist.y;
console.log("rightWristy="+rightWristy);

scoreleftWrist=results[0].pose.keypoints[9].score;
console.log("scoreleftwrist"+scoreleftWrist);

scorerightWrist=results[0].pose.keypoints[10].score;
console.log("scorerightwrist"+scorerightWrist);
    }
}
