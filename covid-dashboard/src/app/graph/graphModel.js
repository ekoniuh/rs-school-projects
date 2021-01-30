export default class GraphModel {
  constructor(dataGraph) {
    this.dataGraph = dataGraph;

    this.apiAnswer = {};
    this.dataTimeAll = null;
    this.loadingData = this.initData();
  }

  async initData() {
    await this.fetchDataGraph();
  }

  async fetchDataGraph() {
    const link = 'https://disease.sh/v3/covid-19/historical/all?lastdays=300';

    try {
      const summaryPerDate = await fetch(link);
      this.apiAnswer = await summaryPerDate.json();
      this.getDataWorld(this.apiAnswer);
    } catch (error) {
      console.error(error);    }
  }

  async fetchDataCountry(nameCountry) {
    const urlTimeAll = `https://disease.sh/v3/covid-19/historical/${nameCountry}?lastdays=366`;

    try {
      const dataTimeAll = await fetch(urlTimeAll);
      this.dataTimeAll = await dataTimeAll.json();

      this.getDataWorld(this.dataTimeAll.timeline);
    } catch (error) {
      console.error(error);
    }
  }

  getDataWorld(data) {
    this.dataGraph.cases.value = Object.values(data.cases);
    this.dataGraph.cases.date = Object.keys(data.cases);

    this.dataGraph.deaths.value = Object.values(data.deaths);
    this.dataGraph.deaths.date = Object.keys(data.deaths);

    this.dataGraph.recovered.value = Object.values(data.recovered);
    this.dataGraph.recovered.date = Object.keys(data.recovered);
  }
}
