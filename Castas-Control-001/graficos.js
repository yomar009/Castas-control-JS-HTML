function graficarCartas() {
    graficar_X();
    graficar_R();
    graficar_S();
    graficar_XS();
}

function graficar(data, containerId, promedio, lic, lsc, varName, color) {
    const m = parseInt(document.getElementById('m').value);
    const nfilas = crearLista(m);

    const chartContainer = document.getElementById(containerId);
    
    // Elimina cualquier gráfica anterior en el contenedor
    chartContainer.innerHTML = '';

    const ctx = chartContainer.getContext('2d');

    const xLabels = nfilas.map((valor, i) => i + 1); // Etiquetas del eje X

    const chartData = {
        labels: xLabels,
        datasets: [
            {
                label: 'Data',
                borderColor: color,
                data: data,
                fill: false,
            },
            {
                label: 'Carta',
                borderColor: 'red',
                data: Array(xLabels.length).fill(promedio),
                fill: false,
            },
            {
                label: 'LIC',
                borderColor: 'green',
                data: Array(xLabels.length).fill(lic),
                fill: false,
            },
            {
                label: 'LSC',
                borderColor: 'orange',
                data: Array(xLabels.length).fill(lsc),
                fill: false,
            },
            {
                label: 'VAR',
                borderColor: 'blue',
                data: Array(xLabels.length).fill(varName),
                fill: false,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Muestras',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Valores',
                },
            },
        },
    };

    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions,
    });
}

function graficar_X() {
    const promediosFilaFormateados = promediosFila.map(valor => valor.toFixed(3)); //reduce a 3 decimales
    graficar(promediosFila, 'chart-container_X', promedioPromedios, resultado_X_LIC, resultado_X_LSC, resultado_X_VAR, 'black');
}

function graficar_R() {
    const promediosRangoFormateados = rangos.map(valor => valor.toFixed(3));
    graficar(rangos, 'chart-container_R', promedioRangos, resultado_R_LIC, resultado_R_LSC, resultado_R_VAR, 'black');
}

function graficar_S() {
    const promediosDesviacionesFormateados = desviaciones.map(valor => valor.toFixed(3));
    graficar(desviaciones, 'chart-container_S', promedioDesviaciones, resultado_S_LIC, resultado_S_LSC, resultado_S_VAR, 'black');
}

function graficar_XS() {
    const promediosFilaFormateados = promediosFila.map(valor => valor.toFixed(3));
    graficar(promediosFila, 'chart-container_XS', promedioPromedios, resultado_XS_LIC, resultado_XS_LSC, resultado_XS_VAR, 'black');
}
