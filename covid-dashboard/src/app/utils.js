// import { doc } from 'prettier';
import { stateCountryTable } from './state';

const ONE_HUNDRED_THOUSAND = 100000;
export function addFieldPerOneHundredThousand(data) {
  data.forEach((country) => {
    country.casesToday = country.todayCases;
    country.deathsToday = country.todayDeaths;
    country.recoveredToday = country.todayRecovered;

    country.casesPerOneHundredThousand = Number(
      Math.round((country.cases / country.population) * ONE_HUNDRED_THOUSAND)
    );
    country.casesTodayPerOneHundredThousand = Number(
      (
        (country.todayCases / country.population) *
        ONE_HUNDRED_THOUSAND
      ).toFixed(3)
    );
    country.deathsPerOneHundredThousand = Number(
      Math.round((country.deaths / country.population) * ONE_HUNDRED_THOUSAND)
    );
    country.deathsTodayPerOneHundredThousand = Number(
      (
        (country.todayDeaths / country.population) *
        ONE_HUNDRED_THOUSAND
      ).toFixed(3)
    );
    country.recoveredPerOneHundredThousand = Number(
      Math.round(
        (country.recovered / country.population) * ONE_HUNDRED_THOUSAND
      )
    );
    country.recoveredTodayPerOneHundredThousand = Number(
      (
        (country.todayRecovered / country.population) *
        ONE_HUNDRED_THOUSAND
      ).toFixed(3)
    );
  });
}

export function sortData(data, key) {
  data.sort((a, b) => (a[key] < b[key] ? 1 : -1));
}

function changeKeyValue(statePeople, isPeriod, isValueAbsolute) {
  let keyValue = '';
  if (isPeriod === true && isValueAbsolute === true) {
    keyValue = `${statePeople}TodayPerOneHundredThousand`;
    stateCountryTable.keyView = 'TodayPerOneHundredThousand';
  }
  if (isPeriod === false && isValueAbsolute === false) {
    keyValue = `${statePeople}`;
    stateCountryTable.keyView = '';
  }
  if (isPeriod === true && isValueAbsolute === false) {
    keyValue = `${statePeople}Today`;
    stateCountryTable.keyView = 'Today';
  }
  if (isPeriod === false && isValueAbsolute === true) {
    keyValue = `${statePeople}PerOneHundredThousand`;
    stateCountryTable.keyView = 'PerOneHundredThousand';
  }
  return keyValue;
}

export function getKeyTotal(statePeople, isPeriod, isValueAbsolute) {
  if (statePeople === 'cases') {
    return changeKeyValue(statePeople, isPeriod, isValueAbsolute);
  }

  if (statePeople === 'deaths') {
    return changeKeyValue(statePeople, isPeriod, isValueAbsolute);
  }

  if (statePeople === 'recovered') {
    return changeKeyValue(statePeople, isPeriod, isValueAbsolute);
  }
  if (!statePeople) {
    return changeKeyValue(statePeople, isPeriod, isValueAbsolute);
  }

  return '';
}

export function changeCaseSwitch(target, state) {
  const switchItem = target.closest('.switch-change');
  const dataSwitch = switchItem.dataset.switch;
  const isSwitchActive = switchItem.dataset.active;
  switch (dataSwitch) {
    case 'time-all':
      if (isSwitchActive === 'true') {
        state.isSwitchParameterPeriod = false;
        switchItem.dataset.active = 'false';
      } else {
        state.isSwitchParameterPeriod = true;
        switchItem.dataset.active = 'true';
      }
      break;

    case 'absolute-value':
      if (isSwitchActive === 'true') {
        state.isSwitchParameterValue = false;
        switchItem.dataset.active = 'false';
      } else {
        state.isSwitchParameterValue = true;
        switchItem.dataset.active = 'true';
      }
      break;
    default:
  }
}

export function searchCountry() {
  const input = document.getElementById('input-search');
  const filter = input.value.toUpperCase();
  const countryArray = [...document.querySelectorAll('.country-item')];
  [...document.querySelectorAll('.country-name')].forEach((country, index) => {
    if (country.innerHTML.toUpperCase().indexOf(filter) > -1) {
      countryArray[index].classList.remove('country-item--none');
    } else {
      countryArray[index].classList.add('country-item--none');
    }
  });
}

function getDataToday() {
  return new Date().toJSON().slice(0, 10).replace(/-/g, '/');
}

export function createWindowGlobalTotal(data) {
  return `
					<img src="https://www.flaticon.com/svg/static/icons/svg/456/456311.svg" alt="" class="full-screen__btn">
          <h2 class="global-title">TOTAL CASES</h2>
          <span class="total-count">${data}</span>
					<span class="total-data">${getDataToday()}</span>
			
  `;
}
