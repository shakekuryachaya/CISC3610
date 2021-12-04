document.addEventListener('DOMContentLoaded', init);
let canvasone, chartone

function init() {
    canvasone = document.getElementById('doughnut');
    chartone = canvasone.getContext('2d');
    createDoughnut();
}
function createDoughnut() {
    new Chart(chartone, {
        type: 'doughnut',
        data: {
            labels: ['11040', '10018', '10039', '11001', '10040', '10018', '10038', '10014', '10005', '11364'],
            datasets: [{
                label: 'amount (thousands)',
                data: [378, 476, 81, 53, 445, 476, 430, 213, 27, 269],
                backgroundColor: ["salmon", "lightsalmon","crimson","tomato","orange","violet","peachpuff","peru","lightpink","lavender"]
            }]
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: ['Natural Gas Consumption by ZIP Code for Residential Buildings (in thousands)', 'by Shake Kuryachaya']
                }
            }
        }
    });
}