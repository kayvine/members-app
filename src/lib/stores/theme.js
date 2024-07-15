import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * @typedef {{
 * current: 'light'|'dark',
 * preference: 'light'|'dark'|'system',
 * }} AppTheme
 */

export const MEDIA = '(prefers-color-scheme: dark)';

const stored = browser ? window.localStorage.getItem('members:theme') : null;
const parsed = stored && JSON.parse(stored);
const initial = {
  preference: 'system',
  current: browser && (window.matchMedia(MEDIA).matches ? 'dark' : 'light'),
}

// Create a store and update it when necessary...
/** @type {import('svelte/store').Writable<AppTheme>} */
export const themeStore = writable(parsed || initial);

themeStore.subscribe((value) => {
  if (browser && value) {
    try {
      window.localStorage.setItem('members:theme', JSON.stringify(value));
    } catch { /* not supported */ }
  }
});
