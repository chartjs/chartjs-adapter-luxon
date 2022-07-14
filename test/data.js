export const formatData = [
  {
    locale: 'en-US',
    value: 1559056227321,
    adapter: 'Jan 1, 1970, 6:00:00 AM',
    units: {
      default: '5/28/2019',
      datetime: 'May 28, 2019, 3:10:27 PM',
      millisecond: '3:10:27.321 PM',
      second: '3:10:27 PM',
      minute: '3:10 PM',
      hour: '3 PM',
      day: 'May 28',
      week: 'May 28, 2019',
      month: 'May 2019',
      quarter: 'Q2 - 2019',
      year: '2019'
    }
  },
  {
    locale: 'en-GB',
    value: 1559056227321,
    adapter: 'Jan 1, 1970, 6:00:00 am',
    units: {
      default: '28/05/2019',
      datetime: '28 May 2019, 15:10:27',
      millisecond: '3:10:27.321 pm',
      second: '15:10:27',
      minute: '15:10',
      hour: '15',
      day: '28 May',
      week: '28 May 2019',
      month: 'May 2019',
      quarter: 'Q2 - 2019',
      year: '2019'
    }
  },
  {
    locale: 'de-DE',
    value: 1559056227321,
    adapter: 'Jan. 1, 1970, 6:00:00 AM',
    units: {
      default: '28.5.2019',
      datetime: '28. Mai 2019, 15:10:27',
      millisecond: '3:10:27.321 PM',
      second: '15:10:27',
      minute: '15:10',
      hour: '15 Uhr',
      day: '28. Mai',
      week: '28. Mai 2019',
      month: 'Mai 2019',
      quarter: 'Q2 - 2019',
      year: '2019'
    }
  }
];

export const parseData = [
  {
    locale: 'en-US',
    units: {
      iso: {
        value: '2019-05-28T15:10:27.321Z',
        result: 1559056227321
      },
      day: {
        value: '28 May 2019',
        format: 'dd MMM yyyy',
        result: 1559001600000
      },
      month: {
        value: 'May 2019',
        format: 'MMM yyyy',
        result: 1556668800000
      },
      year: {
        value: '2019',
        format: 'yyyy',
        result: 1546300800000
      }
    }
  },
  {
    locale: 'de-DE',
    units: {
      iso: {
        value: '2019-05-28T15:10:27.321',
        result: 1559056227321
      },
      day: {
        value: '28 Mai 2019',
        format: 'dd MMM yyyy',
        result: 1559001600000
      },
      month: {
        value: 'Mai 2019',
        format: 'MMM yyyy',
        result: 1556668800000
      },
      year: {
        value: '2019',
        format: 'yyyy',
        result: 1546300800000
      }
    }
  }
];
