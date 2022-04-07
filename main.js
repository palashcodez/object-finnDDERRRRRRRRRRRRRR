
Status="";
objects=[];


function preload(){
}

function setup(){
    canvas = createCanvas(500, 420);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
    document.getElementById("numofobjects").innerHTML = "results : none";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video, 0, 0, 500, 420);
        if(Status !=""){
            r=random(255);
            g=random(255);
            b=random(255);
            objectDetector.detect(video, gotResult);
            for(i=0; i<objects.length; i++){
                document.getElementById("status").innerHTML = "status : object detected";
                document.getElementById("numofobjects").innerHTML = "Results : "+objects.length;
                fill(100,0,0);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " "+ percent +"%", objects[i].x, objects[i].y);
                noFill();
                stroke(100,0,0);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }

}

