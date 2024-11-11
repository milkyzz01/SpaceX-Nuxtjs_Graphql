<!-- layouts/default.vue -->
<template>
	<v-app>
		<ContentHeader :menu-items="menuItems" :header-title="headerTitle" />
		<!-- Use the custom Header component here -->
		<!-- Navigation panel -->
		<ContentSidemenu :menu-items="menuItems" />

		<v-main>
			<!-- This will dynamically render the page based on the route -->
			<NuxtPage />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
// Import the custom Header component

// to be exported to components
const menuItems = [
	{
		title: 'Launches',
		icon: 'mdi-rocket',
		value: 'launches',
		path: '/content/launches',
	},
	{
		title: 'Favorites',
		icon: 'mdi-star',
		value: 'favorites',
		path: '/content/favorites',
	},
	{
		title: 'Main Page',
		icon: 'mdi-logout',
		value: 'main-page',
		path: '/',
	},
]

const headerTitle = 'SpaceX'
</script>

<style scoped>
/* Optional styles for the layout */
</style>
