const canvas=document.getElementById('canvas');
let ctx=canvas.getContext('2d');

//for the animation
function init() {
    window.requestAnimationFrame(draw);
}

function draw() {
    //draw shapes on top of existing canvas
    ctx.globalCompositeOperation='source-over';

    //a method, must use beginPath always before adding new things
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //for the dark sky
    ctx.fillStyle='rgb(15, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    //for the sun
    ctx.fillStyle='rgb(210, 180, 0)';
    ctx.shadowBlur=70;
    ctx.shadowColor='rgb(290, 130, 0)';
    ctx.beginPath();
    ctx.arc(canvas.width-690, 270, 30, 0, 2*Math.PI);
    ctx.fill();
    ctx.shadowColoe='transparent';

    //for the clouds
    drawCloud(canvas.width/5, 100, 0.3);
    drawCloud(canvas.width/3, 190, 0.5);
    drawCloud(canvas.width/2, 100, 0.38);
    drawCloud(canvas.width/1.5, 150, 0.5);
    drawCloud(canvas.width/1.5, 290, 0.3);

    //for the dark grass
    ctx.fillStyle='rgb(8, 6, 8)';
    ctx.fillRect(0, canvas.height-(canvas.height/2), canvas.width, canvas.height/2);

    //for the driving road
    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
    let begin= {x:canvas.width/1, y:canvas.height/3};
    let cp1= {x:canvas.width*0.5, y:canvas.height*0.7};
    let cp2= {x:-canvas.width*0.5, y:canvas.height*0.4};
    let roadEnd= {x:canvas.width*0.4, y:canvas.height};
    let cp3= {x:canvas.width*0.9, y:canvas.height*0.61};
    let cp4= {x:-canvas.width*0.9, y:canvas.height*0.6};

    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, roadEnd.x, roadEnd.y);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width, canvas.height*0.9);
    ctx.bezierCurveTo(cp4.x, cp4.y, cp3.x, cp3.y, begin.x, begin.y);
    ctx.strokeStyle='rgb(250, 240, 190)';
    ctx.stroke();
    ctx.fillStyle='rgb(20, 20, 30)';
    ctx.fill();

    //for the mountains
    drawMountains((canvas.width/2)-300, canvas.height/2, 100, 120);
    drawMountains((canvas.width/2)-240, canvas.height/2, 100, 170);
    drawMountains((canvas.width/2)-180, canvas.height/2, 100, 190, true);
    drawMountains((canvas.width/2)-100, canvas.height/2, 100, 220, true);

    //for the trees
    drawTrees(canvas.width*0.02, canvas.height*0.66);
    drawTrees(canvas.width*0.08, canvas.height*0.89);
    drawTrees(canvas.width*0.16, canvas.height*0.95);
    drawTrees(canvas.width*0.06, canvas.height*0.55);
    drawTrees(canvas.width*0.05, canvas.height*0.80);
    drawTrees(canvas.width*0.12, canvas.height*0.50);

    //for the mouse
    drawHouse();
    ctx.fillStyle='beige';
    ctx.font='24px arial bold'; //font
    //caption on bottom of the house
    ctx.fillText('A Different Type of Starry Night', (canvas.width/3)-50, canvas.height-40);

    window.requestAnimationFrame(draw);
}

function drawCloud(x, y, size) {
    ctx.fillStyle='grey';

    //for the fog
    ctx.shadowBlur=50;
    ctx.shadowColor='rgb(35, 30, 35)';

    ctx.beginPath();
    ctx.arc(x, y, 60*size, Math.PI*0.5, Math.PI*2.6);
    ctx.arc(x+(60*size), y-(60*size), 70*size, Math.PI*1, Math.PI*1.87);
    ctx.arc(x+(160*size), y-(45*size), 55*size, Math.PI*1.4, Math.PI*1.9);
    ctx.arc(x+(200*size), y, 60*size, Math.PI*1.5, Math.PI*1.3);
    ctx.arc(x+(150*size), y, 75*size, Math.PI*1.4, Math.PI*0.7);

    //lines of clouds attached to puffy clouds
    ctx.arc(x+(10900*size), y, 75*size, Math.PI*1.2, Math.PI*0.4);
    ctx.fill();
}

function drawMountains(x, y, base, height, withColor=false) {
    ctx.beginPath();
    ctx.moveTo(x-base, y);
    ctx.lineTo(x, y-height);
    ctx.lineTo(x+base, y);
    ctx.closePath();
    ctx.lineWidth=3;
    ctx.strokeStyle='rgb(60, 20, 10)';
    ctx.stroke();
    ctx.fillStyle='rgb(72, 36, 10)';
    ctx.fill();

    if(withColor) {
        let colorBase=base/4;
        let colorHeight=height*0.75;

        ctx.beginPath();
        ctx.moveTo(x, y-height);
        ctx.lineTo(x-colorBase, y-colorHeight);
        ctx.lineTo(x-colorBase+(colorBase*0.3), y-colorHeight+(colorHeight*0.05));
        ctx.lineTo(x-colorBase+(colorBase*0.8), y-colorHeight-(colorHeight*0.03));
        ctx.lineTo(x+colorBase-(colorBase*0.5), y-colorHeight+(colorHeight*0.08));
        ctx.lineTo(x+colorBase, y-colorHeight);
        ctx.closePath();
        ctx.lineWidth=2;
        ctx.strokeStyle='Sienna';
        ctx.stroke();
        ctx.fillStyle='SaddleBrown';
        ctx.fill();
    }
}

function drawTrees(x, y) {
    let trunkWidth=8;
    let trunkHeight=23;
    let base=25;

    //for the bottom of tree
    ctx.fillStyle='rgb(58, 32, 0)';
    ctx.fillRect(x, y, trunkWidth, trunkHeight);

    //for the top of tree
    for(let i=0; i<1; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y-(base*i));
        ctx.lineTo(x+base+(base/12), y-(base*i));
        ctx.lineTo(x+(base/10), y-(base*i)-(base* 6));
        ctx.lineTo(x-base, y-(base*i));
        ctx.lineTo(x, y-(base*i));
        ctx.closePath();
        ctx.fillStyle='rgb(0, 20, 0)';
        ctx.fill();
    }
}

function drawHouse() {

    //lining outside of house
    ctx.beginPath();
    ctx.lineWidth=4;
    ctx.strokeStyle='rgb(10, 50, 40)';
    ctx.stroke();

    //for the front of the house
    ctx.beginPath();
    ctx.moveTo((canvas.width/2)+110, canvas.height*0.73);
    ctx.lineTo((canvas.width/2)+110, canvas.height*0.5);
    ctx.lineTo(canvas.width, canvas.height*0.525);
    ctx.lineTo(canvas.width, canvas.height*0.78);
    ctx.fillStyle='rgb(189, 160, 90)';
    ctx.fill();
    ctx.stroke();

    //for the outside door
    ctx.beginPath();
    ctx.moveTo((canvas.width/2)+120, canvas.height*0.733);
    ctx.lineTo((canvas.width/2)+120, canvas.height*0.63);
    ctx.lineTo((canvas.width/2)+160, canvas.height*0.635);
    ctx.lineTo((canvas.width/2)+160, canvas.height*0.739);
    ctx.fillStyle='rgb(100, 15, 15)';
    ctx.fill();
    ctx.stroke();

    //for the door knob
    ctx.beginPath();
    ctx.arc((canvas.width/2)+130, canvas.height*0.7, 3, 0, 2*Math.PI);
    ctx.fillStyle='rgb(139, 69, 19)';
    ctx.fill();

    //for the window
    ctx.beginPath();
    ctx.moveTo((canvas.width/2)+240, canvas.height*0.7);
    ctx.lineTo((canvas.width/2)+240, canvas.height*0.586);
    ctx.lineTo(canvas.width-110, canvas.height*0.59);
    ctx.lineTo(canvas.width-110, canvas.height*0.706);
    ctx.lineTo((canvas.width/2)+240, canvas.height*0.7);
    ctx.fillStyle='rgba(20, 20, 20, 0.7)';
    ctx.fill();
    ctx.stroke();

    //for the top triangle of the house
    ctx.beginPath();
    ctx.moveTo((canvas.width/2)+110, canvas.height*0.5);
    ctx.lineTo(canvas.width-160, canvas.height*0.37);
    ctx.lineTo(canvas.width, canvas.height*0.525);
    ctx.fillStyle='rgb(189, 160, 90)';
    ctx.fill();
    ctx.stroke();

    //for the top of the house
    ctx.beginPath();
    ctx.moveTo(canvas.width-160, canvas.height*0.37);
    ctx.lineTo(canvas.width, canvas.height*0.33);
    ctx.lineTo(canvas.width, canvas.height*0.525);
    ctx.fillStyle='rgb(139, 69, 19)';
    ctx.fill();
    ctx.stroke();
}

init();
