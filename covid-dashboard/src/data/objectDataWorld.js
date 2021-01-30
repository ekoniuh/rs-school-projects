const objectDataWorld = {
  cases: {
    date: [],
    value: [],
  },
  deaths: {
    date: [],
    value: [],
  },
  recovered: {
    date: [],
    value: [],
  },
  casesToday: {
    date: [],
    value: [],
  },
  deathsToday: {
    date: [],
    value: [],
  },
  recoveredToday: {
    date: [],
    value: [],
  },
  casesTodayPerOneHundredThousand: {
    date: [],
    value: [],
  },
  deathsTodayPerOneHundredThousand: {
    date: [],
    value: [],
  },
  recoveredTodayPerOneHundredThousand: {
    date: [],
    value: [],
  },
  casesPerOneHundredThousand: {
    date: [],
    value: [],
  },
  deathsPerOneHundredThousand: {
    date: [],
    value: [],
  },
  recoveredPerOneHundredThousand: {
    date: [],
    value: [],
  },
};

const styleData = {
  type: 'bar',
  data: {
    datasets: [
      {
        data: [],
        backgroundColor: '#5bfff7',
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
  },
};

export { objectDataWorld, styleData };
