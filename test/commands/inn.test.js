import { getInnMessage } from '../../src/commands/inn.js'

test('returns proper city when current hour matches', () => {
  const currentHour = 2
  const currentMinute = 0
  const expectedMessage = 'Inn buff is currently active in: **Aldebaran**!'
  const message = getInnMessage(currentHour, currentMinute)
  expect(message).toBe(expectedMessage)
})

test('returns correct next possible city', () => {
  const currentHour = 5
  const currentMinute = 0
  const expectedMessage = 'No inn buff right now. Next one is in **3 hours** in **Prontera (Left)/Alberta**!'
  const message = getInnMessage(currentHour, currentMinute)
  expect(message).toBe(expectedMessage)
})

test('returns correct hours and minutes for next possible city', () => {
  const currentHour = 5
  const currentMinute = 23
  const expectedMessage = 'No inn buff right now. Next one is in **2 hours** and **37 minutes** in **Prontera (Left)/Alberta**!'
  const message = getInnMessage(currentHour, currentMinute)
  expect(message).toBe(expectedMessage)
})