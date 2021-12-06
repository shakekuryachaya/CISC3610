let fruits = [
    { name: "Apple", quantity: 20, color: "red" },
    { name: "Orange", quantity: 10, color: "orange" },
    { name: "Banana", quantity: 15, color: "yellow" },
    { name: "Kiwi", quantity: 3, color: "green" },
    { name: "Blueberry", quantity: 5, color: "blue" },
    { name: "Grape", quantity: 8, color: "purple" } //just changed to grape so it's singular like the rest
];

const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function init() {
    window.requestAnimationFrame(draw);
}

function draw() {
    window.requestAnimationFrame(draw);

    //canvas gets cleared
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fruits.forEach((fruit, index) => {
        //this is for the bars
        ctx.fillStyle = fruit.color;
        ctx.fillRect(index * 100, canvas.height - (fruit.quantity * 30), canvas.width / fruits.length, canvas.height);

        //words on the bars
        ctx.fillStyle = 'black';
        ctx.font = '20px Palatino';
        ctx.textAlign = 'center';
        ctx.fillText(fruit.quantity, (index * 100) + 50, canvas.height - 40, canvas.width / fruits.length);
        ctx.fillText(fruit.name, (index * 100) + 50, canvas.height - 15, canvas.width / fruits.length);
    });
}
init();
