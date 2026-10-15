import test from 'node:test';
import assert from 'node:assert/strict';
import { diagnoseProblem } from './aiServiceEngine.ts';

test('diagnoseProblem correctly classifies plumbing leak problem', () => {
  const diagnosis = diagnoseProblem('My kitchen tap is leaking water continuously');
  assert.equal(diagnosis.matchedCategory, 'plumbing');
  assert.ok(diagnosis.confidence > 70);
  assert.ok(diagnosis.clarifyingQuestions.length >= 2);
  assert.ok(diagnosis.estimatedCostRange.min >= 200);
});

test('diagnoseProblem flags electrical emergency with high urgency', () => {
  const diagnosis = diagnoseProblem('There are sparks and smoke coming from my main bedroom switchboard!');
  assert.equal(diagnosis.matchedCategory, 'electrical');
  assert.equal(diagnosis.urgency, 'high');
  assert.ok(diagnosis.preVisitTips.some((tip) => tip.includes('SAFETY') || tip.includes('MCB')));
});

test('diagnoseProblem identifies AC repair issues', () => {
  const diagnosis = diagnoseProblem('AC is blowing warm air and making a rattling sound');
  assert.equal(diagnosis.matchedCategory, 'ac_repair');
  assert.equal(diagnosis.categoryTitle, 'AC Repair & Servicing');
});

test('diagnoseProblem handles empty queries gracefully', () => {
  const diagnosis = diagnoseProblem('');
  assert.ok(diagnosis.recommendedService);
  assert.equal(diagnosis.urgency, 'standard');
});
