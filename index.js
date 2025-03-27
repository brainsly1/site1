// Константы
const R = 8.314;  // Универсальная газовая постоянная (Дж/(моль*К))

// Функция распределения Максвелла-Больцмана
function maxwellBoltzmann(v, M, T) {
    return 4 * Math.PI * Math.pow((M / (2 * Math.PI * R * T)), 1.5) * Math.pow(v, 2) * Math.exp(-M * Math.pow(v, 2) / (2 * R * T));
}

document.getElementById('plotButton').addEventListener('click', function() {
    // Получаем значения из полей ввода
    const temperature = parseFloat(document.getElementById("temperature").value);
    const molarMass = parseFloat(document.getElementById("molarMass").value) / 1000; // Convert g/mol to kg/mol
    const vMax = parseFloat(document.getElementById("vMax").value);

    // Диапазон скоростей
    const v = Array.from(Array(200).keys()).map(i => i * vMax / 200); // От 0 до vMax м/с

    // Вычисление функции распределения
    const f = v.map(velocity => maxwellBoltzmann(velocity, molarMass, temperature));

    // Создание графика с использованием Plotly
    const trace = {
        x: v,
        y: f,
        type: 'scatter',
        mode: 'lines',
        name: `T = ${temperature} K, M = ${molarMass*1000} г/моль`
    };

    const layout = {
        title: 'Распределение Максвелла-Больцмана',
        xaxis: { title: 'Скорость, v (м/с)' },
        yaxis: { title: 'f(v)' }
    };

    Plotly.newPlot('plot', [trace], layout);
});
