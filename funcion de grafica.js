let promediosFila = [];
let nfilas = [];
let promedioPromedios = [];
resultado_X_LIC = [];
resultado_X_LSC = [];

function crearLista(n) {
    const lista = [];
    for (let i = 1; i <= n; i++) {
        lista.push(i);
    }
    return lista;
}

function graficar() {
    const n = parseInt(document.getElementById('n').value); // Obtener el valor de n
    nfilas = crearLista(n);

    // Reemplaza estos valores con los datos adecuados
    promediosFila = [2, 4, 5, 7, 6];
    promedioPromedios = 4.8;
    resultado_X_LIC = 3.2;
    resultado_X_LSC = 4.2;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([1, n])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(promediosFila.concat(promedioPromedios, resultado_X_LIC, resultado_X_LSC))])
        .range([height, 0]);

    // Dibujar líneas horizontales para promedioPromedios, resultado_X_LIC y resultado_X_LSC
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(promedioPromedios))
        .attr("x2", width)
        .attr("y2", yScale(promedioPromedios))
        .attr("stroke", "red")
        .attr("stroke-dasharray", "5,5");

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(resultado_X_LIC))
        .attr("x2", width)
        .attr("y2", yScale(resultado_X_LIC))
        .attr("stroke", "green")
        .attr("stroke-dasharray", "5,5");

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(resultado_X_LSC))
        .attr("x2", width)
        .attr("y2", yScale(resultado_X_LSC))
        .attr("stroke", "orange")
        .attr("stroke-dasharray", "5,5");

    // Dibujar las líneas de los datos
    const line = d3.line()
        .x((d, i) => xScale(nfilas[i]))
        .y(d => yScale(d));

    svg.append("path")
        .datum(promediosFila)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Agregar círculos en los puntos
    svg.selectAll("circle")
        .data(promediosFila.concat(promedioPromedios, resultado_X_LIC, resultado_X_LSC))
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(nfilas[i]))
        .attr("cy", d => yScale(d))
        .attr("r", 5)
        .attr("fill", "blue");

    // Agregar números en los puntos
    svg.selectAll("text")
        .data(promediosFila.concat(promedioPromedios, resultado_X_LIC, resultado_X_LSC))
        .enter()
        .append("text")
        .text(d => d)
        .attr("x", (d, i) => xScale(nfilas[i]))
        .attr("y", d => yScale(d) - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "black");

    // Agregar ejes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .call(d3.axisLeft(yScale));

}