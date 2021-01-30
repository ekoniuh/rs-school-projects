const stateGlobalTable = {
  switchParameterState: 'cases',
  isClickCountry: false,
  isSwitchActive: null,
  isSwitchParameterPeriod: false,
  isSwitchParameterValue: false,
  keyValue: 'cases',
};

const stateCountryTable = {
  countryData: [],
  nameCountry: null,
  keyParameterState: 'cases',
  keyParameterPeriod: 'deaths',
  keyParameterValue: 'recovered',
  keyView: '',
  switchParameterState: '',
  isSwitchActive: null,
  isSwitchParameterPeriod: false,
  isSwitchParameterValue: false,
  defaultDataGlobal: [],

};

const stateGraph = {
  countryData: [],
  nameCountry: null,
  keyParameterState: 'cases',
  keyParameterPeriod: 'deaths',
  keyParameterValue: 'recovered',
  keyView: '',
  switchParameterState: 'cases',
  isSwitchActive: null,
  isSwitchParameterPeriod: false,
  isSwitchParameterValue: false,
  defaultDataGlobal: [],

};

export { stateGlobalTable, stateCountryTable, stateGraph };
