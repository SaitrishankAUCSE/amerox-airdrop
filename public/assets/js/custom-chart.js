const ctx = document.getElementById('doughnutChart');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            'Liquidity & Ecosystem Growth',
            'Treasury / Strategic Reserve',
            'Validators / Node Incentives',
            'Community & Airdrops',
            'Team & Founders (Vested)',
            'Investors (Private / Public)',
        ],
        datasets: [{
            label: ['Token Distribution'],
            data: [30, 20, 10, 10, 15, 15],
            borderWidth: 0,
            backgroundColor: [
                '#FAFAD2', // Light Goldenrod Yellow
                '#FFD700', // Gold
                '#DAA520', // Goldenrod
                '#B8860B', // Dark Goldenrod
                '#CD853F', // Peru (Bronze-ish)
                '#8B4513', // SaddleBrown (Dark Bronze)
            ],
            hoverOffset: 4
        }],
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
});