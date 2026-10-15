import test from 'node:test';
import assert from 'node:assert/strict';
import { pushHistory, popHistory, getBackLabel } from './navigationHistory.ts';

test('pushHistory appends previous page when navigating to a new page', () => {
  const h1 = pushHistory([], 'services', 'home');
  assert.deepEqual(h1, ['home']);

  const h2 = pushHistory(h1, 'profile', 'services');
  assert.deepEqual(h2, ['home', 'services']);
});

test('pushHistory ignores identical page navigation', () => {
  const h1 = ['home', 'services'];
  const h2 = pushHistory(h1, 'services', 'services');
  assert.deepEqual(h2, ['home', 'services']);
});

test('popHistory returns fallback when history is empty', () => {
  const res = popHistory([], 'home');
  assert.equal(res.previousPage, 'home');
  assert.deepEqual(res.nextHistory, []);
});

test('popHistory pops previous page and returns trimmed history', () => {
  const res = popHistory(['home', 'services', 'profile']);
  assert.equal(res.previousPage, 'profile');
  assert.deepEqual(res.nextHistory, ['home', 'services']);
});

test('getBackLabel returns user-friendly label', () => {
  assert.equal(getBackLabel('home'), 'Back to Home');
  assert.equal(getBackLabel('services'), 'Back to Specialists');
  assert.equal(getBackLabel('my-bookings'), 'Back to Appointments');
  assert.equal(getBackLabel('unknown'), 'Back');
});
