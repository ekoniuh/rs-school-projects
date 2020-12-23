// import CasesTableView from './tableView';
import { addFieldPerOneHundredThousand } from '../../utils';

export default class CasesCountryModel {
  constructor() {
    this.globalCasesData = [];
    this.loadingData = this.init();
  }

  async init() {
    await this.fetchGlobalData();
  }

  async fetchGlobalData() {
    try {
      const globalDataResponse = await fetch(
        'https://disease.sh/v3/covid-19/all'
      );
      this.globalCasesData[0] = await globalDataResponse.json();
     
      addFieldPerOneHundredThousand(this.globalCasesData);
    } catch (error) {
      console.log(error);
    }
  }
}
