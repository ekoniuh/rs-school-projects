import { addFieldPerOneHundredThousand, sortData } from '../../utils';
import { stateGlobalTable } from '../../state';

export default class CasesGlobalModel {
  constructor() {
    this.countriesData = [];
    this.TotalConfirmedCountry = [];
    this.globalData = [];
    this.init();
  }

  async init() {
    await this.fetchCountries();
    if (this.view) {
      this.view.render();
    }
  }

  getCountriesData() {
    if (this.countriesData) {
      sortData(this.countriesData, stateGlobalTable.keyValue);
    }
    return this.countriesData.filter((item) => {
      return !(
        item.country === 'MS Zaandam' || item.country === 'Diamond Princess'
      );
    });
  }

  async fetchCountries() {
    try {
      const countriesData = await fetch(
        'https://disease.sh/v3/covid-19/countries'
      );
      this.countriesData = await countriesData.json();
      addFieldPerOneHundredThousand(this.countriesData);
    } catch (error) {
      console.error(error);
    }
  }
}
