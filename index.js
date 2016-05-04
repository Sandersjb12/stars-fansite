var images=[];
images[0]="images/modano.jpg";
images[1]="images/faceoff.jpg";
images[2]="images/downstairs.jpg";
images[3]="images/salute.jpg";

function displayImage(id)
{
    document.getElementById("image").src=images[id];
}