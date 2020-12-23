import { stateGlobalTable } from '../../state';

export default class CasesGlobalModelView {
  constructor(globalModel) {
    this.globalModel = globalModel;
    this.globalModel.view = this;
    this.viewWrapper = document.createElement('table');
    this.viewWrapper.className = 'table global-table';
  }

  render() {
    this.viewWrapper.innerHTML = this.buildList();
    return this.viewWrapper;
    // ${this.buildModeButtons()}
  }

  buildList() {
    return `<tbody>
            ${this.globalModel
              .getCountriesData()
              .map((item) => this.buildRow(item))}
            </tbody>`;
  }

  buildRow(item) {
    return `<tr class="country-item">
							${this.buildImg(item.countryInfo, item.country)}
							 ${this.buildTotalConfirmed(item[stateGlobalTable.keyValue])}
					  </tr>`;
  }

  buildImg(countryInfo, country) {
    return `<td><img src="${countryInfo.flag}"><span class="country-name">${country}</span></td>`;
  }

  buildTotalConfirmed(keyValue) {
    return `<td class="cases-total">
              ${keyValue}
            </td>`;
  }

  // buildModeButtons() {
  //   return `<button onclick={() => {sort()}}>a</button>
  // 	<button>a</button><button>a</button>`;
  // }

  // updateList(data) {
  //   this.list;
  // }
}
