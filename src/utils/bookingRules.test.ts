import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePricing,
  canCancelBooking,
  getNextStatus,
  validateBookingForm,
  generateBookingReference,
} from './bookingRules.ts';

test('calculatePricing computes base price and 18% GST correctly', () => {
  const result = calculatePricing(500, false, false);
  assert.equal(result.basePrice, 500);
  assert.equal(result.emergencyFee, 0);
  assert.equal(result.platformDiscount, 0);
  assert.equal(result.taxAmount, 90); // 18% of 500
  assert.equal(result.totalPrice, 590);
});

test('calculatePricing factors in emergency fee and promo discount', () => {
  const result = calculatePricing(1000, true, true);
  assert.equal(result.basePrice, 1000);
  assert.equal(result.emergencyFee, 150);
  assert.equal(result.platformDiscount, 100);
  // Subtotal = 1000 + 150 - 100 = 1050
  // Tax = 1050 * 0.18 = 189
  assert.equal(result.taxAmount, 189);
  assert.equal(result.totalPrice, 1239);
});

test('canCancelBooking allows cancellation only for pending and accepted statuses', () => {
  assert.equal(canCancelBooking('pending').allowed, true);
  assert.equal(canCancelBooking('accepted').allowed, true);
  assert.equal(canCancelBooking('in_progress').allowed, false);
  assert.equal(canCancelBooking('completed').allowed, false);
  assert.equal(canCancelBooking('cancelled').allowed, false);
});

test('getNextStatus progresses through standard service lifecycle', () => {
  assert.equal(getNextStatus('pending'), 'accepted');
  assert.equal(getNextStatus('accepted'), 'on_the_way');
  assert.equal(getNextStatus('on_the_way'), 'in_progress');
  assert.equal(getNextStatus('in_progress'), 'completed');
  assert.equal(getNextStatus('completed'), null);
});

test('validateBookingForm validates Indian phone numbers and PIN codes', () => {
  const invalid = validateBookingForm({
    customerName: 'A',
    customerPhone: '12345',
    address: 'Short',
    pinCode: 'abc',
    serviceId: '',
    date: '',
    timeSlot: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.customerName);
  assert.ok(invalid.errors.customerPhone);
  assert.ok(invalid.errors.pinCode);
  assert.ok(invalid.errors.address);

  const valid = validateBookingForm({
    customerName: 'Karthik Subramanian',
    customerPhone: '9840123456',
    address: 'Flat 4B, Emerald Towers, 4th Cross Road',
    pinCode: '600017',
    serviceId: 'srv-1',
    date: '2026-10-18',
    timeSlot: '10:00 AM - 12:00 PM',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateBookingReference formats with HAK prefix', () => {
  const ref = generateBookingReference();
  assert.match(ref, /^HAK-[0-9A-Z]{5}$/);
});
