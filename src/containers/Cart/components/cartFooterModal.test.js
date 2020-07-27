import {
  createHourLine,
  createHoursList,
  createTitleWithHoursList,
  createHTMLTitle,
} from './cartFooterModal';

const hourRegex = '\\d\\d:\\d\\d';
const hoursRangeRegex = new RegExp(`${hourRegex} às ${hourRegex}`);

const testHoursRangeRegex = text => hoursRangeRegex.test(text);
const createHourRange = hour => ({ openHour: hour, closeHour: hour });

const hours = [
  createHourRange('12:00'),
  createHourRange('12:00'),
  createHourRange('12:00'),
];

test('Retorna a faixa de horário', () => {
  const hour = createHourRange('12:00');
  const result = createHourLine(hour);
  expect(testHoursRangeRegex(result)).toBe(true);
});

test('Retorna uma lista de faixas de horário', () => {
  const result = createHoursList(hours);

  expect(testHoursRangeRegex(result[0])).toBe(true);
  expect(testHoursRangeRegex(result[1])).toBe(true);
  expect(testHoursRangeRegex(result[2])).toBe(true);
});

test('Retorna texto com os horários que a loja abre', () => {
  const result = createTitleWithHoursList(hours);
  expect(/Esta loja abre entre:/.test(result)).toBe(true);
});

test('Retorna título em HTML', () => {
  const today = { hours, closed: true };
  const result = createHTMLTitle(today);
  const htmlTagRegex = /<(\w|\s)+(\W|\w)+">\s+.+\s+<\/(\w|\s)+>/;
  expect(htmlTagRegex.test(result)).toBe(true);
});
