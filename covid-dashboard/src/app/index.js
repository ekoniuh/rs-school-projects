import '../styles/style.scss';
import CasesGlobalModel from './table/tableGlobal/tableGlobalModel';
import CasesGlobalModelView from './table/tableGlobal/tableGlobalView';
import CasesCountryModel from './table/tableCountry/tableCountryModel';
import CasesCountryView from './table/tableCountry/tableCountryView';
import GraphView from './graph/graphView';
import GraphModel from './graph/graphModel';
import { stateGlobalTable, stateCountryTable, stateGraph } from './state';
import Keyboard from './virtualKeyBoard/virtualKeyBoard';
import {
  getKeyTotal,
  changeCaseSwitch,
  sortData,
  searchCountry,
  createWindowGlobalTotal,
  addFieldCountryDailyDataGraph,
} from './utils';
import MapView from './map/mapView';

import { objectDataWorld, styleData } from '../data/objectDataWorld';

const mapView = new MapView();
mapView.render();
const popCanvas = document.getElementById('popChart');

const casesGlobalModel = new CasesGlobalModel();
const casesGlobalModelView = new CasesGlobalModelView(casesGlobalModel);

const casesCountryModel = new CasesCountryModel();
const casesCountryView = new CasesCountryView();

const keyBoard = new Keyboard();

const graphModel = new GraphModel(objectDataWorld);
const graphView = new GraphView(styleData);

function updateTableGlobal() {
  document.querySelector('.country-wrap').append(casesGlobalModelView.render());
}

function updateTableCountry(data, key) {
  document
    .querySelector('.global-info')
    .append(casesCountryView.render(data, key));
}

graphModel.loadingData.then(() =>
  graphView.render(stateGlobalTable.switchParameterState, graphModel.dataGraph)
);

casesCountryModel.loadingData.then(() => {
  document
    .querySelector('.global-info')
    .append(
      casesCountryView.render(
        casesCountryModel.globalCasesData[0],
        stateCountryTable.keyView
      )
    );

  document.querySelector('.global-data').innerHTML = createWindowGlobalTotal(
    casesCountryModel.globalCasesData[0].cases
  );
});

updateTableGlobal();

document
  .querySelector('.left-container .select-parameter')
  .addEventListener('change', ({ target }) => {
    stateGlobalTable.switchParameterState = target.value;

    stateGlobalTable.keyValue = getKeyTotal(
      stateGlobalTable.switchParameterState,
      stateGlobalTable.isSwitchParameterPeriod,
      stateGlobalTable.isSwitchParameterValue
    );
    updateTableGlobal();
    graphView.render(
      stateGlobalTable.switchParameterState,
      graphModel.dataGraph
    );
  });

document
  .querySelector('.graph-container .select-parameter')
  .addEventListener('change', ({ target }) => {
    stateGraph.switchParameterState = target.value;
    stateGraph.keyView = getKeyTotal(
      stateGraph.switchParameterState,
      stateGraph.isSwitchParameterPeriod,
      stateGraph.isSwitchParameterValue
    );
    graphView.render(stateGraph.keyView, graphModel.dataGraph);
  });

[...document.querySelectorAll('.global-info__switch')].forEach((item) => {
  item.addEventListener('change', async ({ target }) => {
    changeCaseSwitch(target, stateGlobalTable);

    stateGlobalTable.keyValue = getKeyTotal(
      stateGlobalTable.switchParameterState,
      stateGlobalTable.isSwitchParameterPeriod,
      stateGlobalTable.isSwitchParameterValue
    );

    sortData(casesGlobalModel.countriesData, stateGlobalTable.keyValue);
    updateTableGlobal();

    const countryData = stateGlobalTable.isClickCountry
      ? stateCountryTable.countryData
      : casesCountryModel.globalCasesData[0];

    updateTableCountry(countryData, stateCountryTable.keyView);

    addFieldCountryDailyDataGraph(
      graphModel.dataGraph,
      casesCountryModel.globalCasesData[0].population
    );

    graphView.render(stateGlobalTable.keyValue, graphModel.dataGraph);
  });
});

[...document.querySelectorAll('.full-screen__btn')].forEach((item) => {
  item.addEventListener('click', ({ target }) => {
    target.closest('.box-shadow').classList.toggle('full-screen__active');
  });
});

[...document.querySelectorAll('.country-info__switch')].forEach((item) => {
  item.addEventListener('change', ({ target }) => {
    changeCaseSwitch(target, stateCountryTable);

    getKeyTotal(
      stateCountryTable.switchParameterState,
      stateCountryTable.isSwitchParameterPeriod,
      stateCountryTable.isSwitchParameterValue
    );

    const countryData = stateGlobalTable.isClickCountry
      ? stateCountryTable.countryData
      : casesCountryModel.globalCasesData[0];

    updateTableCountry(countryData, stateCountryTable.keyView);
  });
});

document
  .querySelector('.global-table')
  .addEventListener('click', async ({ target }) => {
    const countryItem = target.closest('.country-item');
    const countryName = countryItem.querySelector('.country-name').textContent;

    stateGlobalTable.isClickCountry = true;
    stateCountryTable.countryData = casesGlobalModel.countriesData.find(
      (item) => item.country === countryName
    );
    updateTableCountry(
      stateCountryTable.countryData,
      stateCountryTable.keyView
    );

    await graphModel.fetchDataCountry(countryName);

    const populationCountry = stateCountryTable.countryData.population;

    addFieldCountryDailyDataGraph(graphModel.dataGraph, populationCountry);

    graphView.render(stateGlobalTable.keyValue, graphModel.dataGraph);
  });

[...document.querySelectorAll('.graph-info__switch')].forEach((item) => {
  item.addEventListener('change', ({ target }) => {
    changeCaseSwitch(target, stateGraph);
    stateGraph.keyView = getKeyTotal(
      stateGraph.switchParameterState,
      stateGraph.isSwitchParameterPeriod,
      stateGraph.isSwitchParameterValue
    );

    addFieldCountryDailyDataGraph(
      graphModel.dataGraph,
      casesCountryModel.globalCasesData[0].population
    );

    graphView.render(stateGraph.keyView, graphModel.dataGraph);
  });
});

document
  .getElementById('input-search')
  .addEventListener('keyup', () => searchCountry());

window.addEventListener('DOMContentLoaded', () => {
  keyBoard.init();
});
