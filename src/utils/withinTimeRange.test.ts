import { isCurrentTimeWithinTimeRange } from './withinTimeRange';

test('Horário atual está entre a faixa de horários', () => {
  const hours = { openHour: '11:00', closeHour: '13:00', currentHour: '12:00' }
  const result = isCurrentTimeWithinTimeRange(hours);
  expect(result).toBe(true);
})

test('Horário atual está entre a faixa de horários', () => {
  const hours = { openHour: '01:00', closeHour: '23:00', currentHour: '12:00' }
  const result = isCurrentTimeWithinTimeRange(hours);
  expect(result).toBe(true);
})

test('Horário atual está entre a faixa de horários', () => {
  const hours = { openHour: '01:00', closeHour: '03:00', currentHour: '02:00' }
  const result = isCurrentTimeWithinTimeRange(hours);
  expect(result).toBe(true);
})

test('Horário atual está entre a faixa de horários', () => {
  const hours = { openHour: '00:00', closeHour: '12:00', currentHour: '11:59' }
  const result = isCurrentTimeWithinTimeRange(hours);
  expect(result).toBe(true);
})