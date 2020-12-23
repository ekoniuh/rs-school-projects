export default class GraphView {
  constructor(canvas, data, dataStyle) {
    // this.canvas = canvas;
    // this.dataGraph = data;
    this.dataStyle = dataStyle;
  }

  render(key, dataGraph) {
    // console.log('key', key);
    // console.log('dataGraph', dataGraph);
    document.querySelector('.canvas-container').innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-graph popChart';
    document.querySelector('.canvas-container').append(canvas);

    const styleData = {
      type: 'bar',
      backgroundColor: 'red',
      clip: { left: 50, top: false, right: -2, bottom: 0 },

      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: '#5bfff7',
          },
        ],
      },
    };
    styleData.data.labels = dataGraph[`${key}`].date;
    // console.log('this.dataGraph[${key}].value', this.dataGraph[`${key}`].value);
    styleData.data.datasets[0].data = dataGraph[`${key}`].value;
    const barChart = new Chart(canvas, styleData);
  }
}
