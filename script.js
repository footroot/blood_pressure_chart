const systolicInput = document.getElementById('systolic');
const diastolicInput = document.getElementById('diastolic');
const pulseInput = document.getElementById('pulse');
const notesInput = document.getElementById('notes'); // Add a notes input field in your HTML
const readingList = document.getElementById('reading-list');
const bpChartCanvas = document.getElementById('bpChart');
const bpChart = new Chart(bpChartCanvas, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Systolic (mmHg)',
                data: [],
                borderColor: '#ECFAE5',
                fill: false,
                tension: 0.3 // Optional: for smoother lines
            },
            {
                label: 'Diastolic (mmHg)',
                data: [],
                borderColor: 'blue',
                fill: false,
                tension: 0.3 // Optional: for smoother lines
            },
            {
                label: 'Pulse (bpm)',
                data: [],
                borderColor: 'green',
                fill: false,
                tension: 0.3 // Optional: for smoother lines
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: 'rgba(240, 248, 255, 0.5)', // AliceBlue with transparency
        borderColor: 'lightgray',
        borderWidth: 1,
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            y: {
                beginAtZero: false // Don't force the Y-axis to start at 0
            }
        }
    }
}); /* ... chart configuration ... */

async function addReading() {
    const systolic = parseInt(systolicInput.value);
    const diastolic = parseInt(diastolicInput.value);
    const pulse = parseInt(pulseInput.value || 0);
    const notes = notesInput.value;

    if (!isNaN(systolic) && !isNaN(diastolic)) {
        const newReading = { systolic, diastolic, pulse, notes };
        try {
            const response = await fetch('add_reading.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Important for PHP $_POST
                },
                body: new URLSearchParams(newReading) // Encode data for form submission
            });
            const data = await response.json();
            if (data.success) {
                fetchAndDisplayReadings(); // Reload readings after adding
                systolicInput.value = '';
                diastolicInput.value = '';
                pulseInput.value = '';
                notesInput.value = '';
            } else {
                alert(data.message || 'Failed to save reading.');
            }
        } catch (error) {
            console.error('Error saving reading:', error);
            alert('Failed to save reading.');
        }
    } else {
        alert('Please enter valid systolic and diastolic readings.');
    }
}

async function fetchAndDisplayReadings() {
    try {
        const response = await fetch('get_readings.php');
        const readings = await response.json();
        console.log("Data received from PHP:", readings);
        displayReadings(readings);
        updateChart(readings);
    } catch (error) {
        console.error('Error fetching readings:', error);
        // alert('Failed to load readings.');
    }
}

function displayReadings(readings) {
    readingList.innerHTML = '';
    readings.forEach(reading => {
        const listItem = document.createElement('li');
        const formattedTimestamp = new Date(reading.timestamp).toLocaleString();
        listItem.textContent = `${formattedTimestamp}: ${reading.systolic}/${reading.diastolic} mmHg (Pulse: ${reading.pulse || '-'}) ${reading.notes ? '- Notes: ' + reading.notes : ''}`;
        readingList.appendChild(listItem);
    });
}

function updateChart(readings) {
    bpChart.data.labels = readings.map(r => new Date(r.timestamp).toLocaleDateString());
    bpChart.data.datasets[0].data = readings.map(r => r.systolic);
    bpChart.data.datasets[1].data = readings.map(r => r.diastolic);
    bpChart.data.datasets[2].data = readings.map(r => r.pulse);
    bpChart.update();
}

// Initial load of readings
fetchAndDisplayReadings();

// Update your HTML to include a notes input:
// <label for="notes">Notes (Optional):</label>
// <textarea id="notes"></textarea><br><br>

// const bpChartCanvas = document.getElementById('bpChart');


function updateChart(readings) {
    const dates = readings.map(r => new Date(r.timestamp).toLocaleDateString());
    const systolicData = readings.map(r => r.systolic);
    const diastolicData = readings.map(r => r.diastolic);
    const pulseData = readings.map(r => r.pulse);

    bpChart.data.labels = dates;
    bpChart.data.datasets[0].data = systolicData;
    bpChart.data.datasets[1].data = diastolicData;
    bpChart.data.datasets[2].data = pulseData; // Ensure pulse data is included

    bpChart.update();
}