<template>
	<v-container>
		<h1 class="mb-5">Favorite Rockets Lists</h1>
		<!-- Display a message if there are no favorite rockets -->
		<v-row dense>
			<v-col v-if="!Favrockets.length" cols="12">
				<!-- Display "No Favorites" message if theres no added rockets -->
				<h3>No Favorites</h3>
			</v-col>

			<!-- Iterate over the list of favorite rockets -->
			<v-col v-for="rocket in Favrockets" :key="rocket.rocketId" cols="12" sm="3">
				<!-- Card displaying each rocket's name -->
				<v-card class="mx-auto" color="surface-variant" max-width="300">
					<v-card-title>{{ rocket.rocketName }}</v-card-title>
					<v-card-subtitle>Mission Used: {{ rocket.mission }}</v-card-subtitle>
					<v-card-actions>
						<nuxt-link :to="`/content/rocket-details/${rocket.rocketId}`" class="ha">
							<v-btn>View Details</v-btn>
						</nuxt-link>
						<v-btn @click="removeRocket(rocket.launchId, rocket.rocketId)">Remove</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'content',
	middleware: 'path-middleware',
})

// Use the favorites store
const favoritesStore = useFavorites()

// function  to remove from list
const removeRocket = (launchID: string, rocketID: string) => {
	favoritesStore.removeFavorite(launchID, rocketID)
}

// Variables
const Favrockets = computed(() => favoritesStore.getFavorites) // Get the favorite rockets list
</script>

<style scoped>
.ha {
	text-decoration: none;
	color: inherit;
}
</style>
