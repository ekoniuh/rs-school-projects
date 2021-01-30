export default class GraphView {
  constructor(dataStyle) {
    this.dataStyle = dataStyle;
  }

  render(key, dataGraph) {
    document.querySelector('.canvas-container').innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-graph popChart';
    document.querySelector('.canvas-container').append(canvas);

    Chart.defaults.global.defaultFontColor = 'white';
    this.dataStyle.data.labels = dataGraph[`${key}`].date;
    this.dataStyle.data.datasets[0].data = dataGraph[`${key}`].value;
    const barChart = new Chart(canvas, this.dataStyle);
  }
}
