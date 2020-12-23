export default class CasesCountryView {
  constructor() {
    this.viewWrapper = document.createElement('div');
    this.viewWrapper.className = 'cases-wrap';
  }

  render(casesData, key) {
    this.viewWrapper.innerHTML = this.buildList(casesData, key);
    return this.viewWrapper;
  }

  buildList(casesData, key) {
    return ` <table class="stat-table table">
    ${
      casesData.countryInfo
        ? this.buildImg(casesData.countryInfo, casesData.country)
        : ''
    }
              ${this.buildHeadTable()}
            <tbody>
               <tr>
									<td class="cases-info">${casesData[`cases${key}`]}</td>
									<td class="cases-info">${casesData[`deaths${key}`]}</td>
									<td class="cases-info">${casesData[`recovered${key}`]}</td>
								</tr>
            </tbody>
            </table>`;
  }

  buildHeadTable() {
    return `<thead>
          <tr class="table-cases-wrap">
            <th class="cases-head">Total cases</th>
              <th class="cases-head">Total deaths</th>
              <th class="cases-head">Total healed</th>
          </tr>
          </thead>
         `;
  }

  buildImg(countryInfo, country) {
    return `<div class="country-info">
               <img src="${countryInfo.flag}" alt="">
               <h3>${country}</h3>
            </div>`;
  }
}
