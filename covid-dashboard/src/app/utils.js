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

function addDailyStatisticCases(key, data) {
  data[key].value.forEach((total, index) => {
    if (index + 1 !== data.length) {
      data[`${key}Today`].value[index] = Math.abs(
        data[key].value[index + 1] - total
      );
    }
  });
  data[`${key}Today`].date = data[key].date;
  data[`${key}Today`].value.pop();
  data[`${key}Today`].date.pop();
}

function addStatisticCountryPerOneHundredThousand(key, data, population) {
  data[key].value.forEach((total, index) => {
    data[`${key}PerOneHundredThousand`].value[index] = Number(
      Math.round((total / population) * ONE_HUNDRED_THOUSAND).toFixed(3)
    );
  });
  data[`${key}PerOneHundredThousand`].date = data[key].date;
  data[`${key}Today`].value.forEach((total, index) => {
    data[`${key}TodayPerOneHundredThousand`].value[index] = Number(
      Math.round((total / population) * ONE_HUNDRED_THOUSAND).toFixed(3)
    );
  });
  data[`${key}TodayPerOneHundredThousand`].date = data[key].date;
}

export function addFieldCountryDailyDataGraph(data, population) {
  Object.keys(data).forEach((key) => {
    if (key === 'cases') {
      addDailyStatisticCases(key, data);
      addStatisticCountryPerOneHundredThousand(key, data, population);
    }

    if (key === 'deaths') {
      addDailyStatisticCases(key, data);
      addStatisticCountryPerOneHundredThousand(key, data, population);
    }

    if (key === 'recovered') {
      addDailyStatisticCases(key, data);
      addStatisticCountryPerOneHundredThousand(key, data, population);
    }
  });
}

export function sortData(data, key) {
  data.sort((a, b) => (a[key] < b[key] ? 1 : -1));
}

function changeKeyValue(statePeople, isPeriod, isValueAbsolute) {
  let keyValue = '';
  if (isPeriod && isValueAbsolute) {
    keyValue = `${statePeople}TodayPerOneHundredThousand`;
    stateCountryTable.keyView = 'TodayPerOneHundredThousand';
  }
  if (!isPeriod && !isValueAbsolute) {
    keyValue = `${statePeople}`;
    stateCountryTable.keyView = '';
  }
  if (isPeriod && !isValueAbsolute) {
    keyValue = `${statePeople}Today`;
    stateCountryTable.keyView = 'Today';
  }
  if (!isPeriod && isValueAbsolute) {
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
          <h2 class="global-title">TOTAL CASES</h2>
          <span class="total-count">${data}</span>
					<span class="total-data">${getDataToday()}</span>
			
  `;
}
