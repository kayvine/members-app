import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * @typedef {{
 * nrn?: string,
 * email?: string,
 * firstName?: string,
 * lastName?: string,
 * completedSteps: number[],
 * }} Subscription
 */

const stored = browser && window.sessionStorage.getItem('subscription');
const parsed = stored && JSON.parse(stored);

// Create a store and update it when necessary...
/** @type {import('svelte/store').Writable<Subscription>} */
export const subscription = writable(parsed);

subscription.subscribe((value) => {
  if (browser) {
    window.sessionStorage.setItem('subscription', JSON.stringify(value));
  }
});
