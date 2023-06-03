import { writable } from 'svelte/store';

/**
 * @typedef {{
 * sender?: string,
 * date?: Date,
 * message?: string,
 * meta?: object,
 * }} Notification
 */

/** @type {import('svelte/store').Writable<Notification[]>} */
export const notifications = writable([]);
