// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				firstName?: string,
				lastName?: string,
				email?: string,
				nrn?: string,
				token?: string,
				verified?: boolean,
			} | null,
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
