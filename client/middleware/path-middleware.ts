// client/middleware/redirect-to-launches.ts

export default defineNuxtRouteMiddleware((to) => {
	console.log('Route info:', to.path)
	console.log('Matched route:', to.matched) // To see the matched routes or empty array

	// Check for invalid route (no matched routes)
	if (!to.path) {
		console.log('Redirecting to /content/launches due to invalid path:', to.path)
		return navigateTo('/content/launches')
	}

	// If there's a valid route, proceed normally
	console.log('Valid route, continuing...')
})
