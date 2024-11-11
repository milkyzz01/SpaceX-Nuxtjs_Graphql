<template>
	<v-container>
		<h1 class="mt-1 mb-2">SpaceX Launches</h1>

		<!-- Loading Spinner -->
		<v-progress-circular v-if="pending" indeterminate color="primary" size="64" class="mx-auto" />
		<div v-else-if="!tableLaunches.length">
			Refreshing the page... Sometimes the query is slow and cannot get the launches, please wait.
		</div>
		<div v-else>
			<div class="custom-input">
				<!-- Select input for filtering by year -->
				<div>
					<v-select
						v-model="selectedYear"
						:items="years"
						label="Filter by Year"
						class="custom-select"
						@change="setSelectedYear"
					/>
				</div>
				<!-- Select input for sorting by launch date -->
				<div>
					<v-select
						v-model="selectedSort"
						:items="['asc', 'desc']"
						label="Sort by Launch Date"
						class="custom-select"
						@change="setSelectedSort"
					/>
				</div>
			</div>

			<!-- Launch table -->
			<v-table fixed-header elevation="5">
				<thead>
					<tr class="bg-dark">
						<th class="text-center bg-secondary">Mission Name</th>
						<th class="text-center bg-secondary">Launch Date</th>
						<th class="text-center bg-secondary">Launch Site</th>
						<th class="text-center bg-secondary">Rocket</th>
						<th class="text-center bg-secondary">Launch Details</th>
						<th class="text-center bg-secondary">Rocket Details</th>
						<th class="text-center bg-secondary">Favorites</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="launch in paginatedLaunches" :key="launch.mission_name">
						<td class="text-center">{{ launch.mission_name }}</td>
						<td class="text-center">{{ launch.launch_date_local }}</td>
						<td class="text-center">{{ launch.launch_site?.site_name ?? 'None' }}</td>
						<td class="text-center">{{ launch.rocket.rocket_name }}</td>
						<td class="text-center">{{ launch.details ?? 'Not Available' }}</td>
						<td>
							<nuxt-link :to="`/content/rocket-details/${launch.rocket.rocket.id}`" class="ha">
								View Details
							</nuxt-link>
						</td>
						<td class="text-center">
							<div>
								<!-- Favorite Button with Dynamic Star Icon -->
								<button @click="toggleFavorite(launch)">
									<v-icon
										:class="isFavorite(launch) ? 'mdi-star' : 'mdi-star-outline'"
										color="yellow"
										size="24"
									>
										mdi-star
									</v-icon>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</v-table>

			<!-- Pagination controls -->
			<v-pagination
				v-model="currentPage"
				:length="totalPages"
				:items-per-page="itemsPerPage"
				class="mt-4"
				elevation="2"
				@input="onPageChange"
			/>
		</div>
	</v-container>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useLaunchFilter, type LaunchesResponse, type launchesInterface } from '~/composables/useLaunchFilter'
import { useLaunchSort } from '~/composables/useLaunchesSort'

definePageMeta({
	layout: 'content',
	middleware: 'path-middleware',
})

// query for getting launches
const getLaunches = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_date_local
			launch_site {
				site_name
			}
			rocket {
				rocket_name
				rocket {
					id
				}
			}
			details
		}
	}
`

// query and fetch the data
const { data, pending, refresh } = useAsyncQuery<LaunchesResponse>(getLaunches)

// handle response
const launches = computed(() => data.value?.launches ?? [])

// Pass the launches data to the filter composable and use returned data
const { years, selectedYear, filteredLaunches, setSelectedYear } = useLaunchFilter(launches.value)

// Pass the filtered data to sorting composables as computed reactive
const { selectedSort, sortedLaunches, setSelectedSort } = useLaunchSort(filteredLaunches)

// set the tbl data to sorted data from filtered
const tableLaunches = computed(() => sortedLaunches.value)

// Pagination section
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(5)
const totalPages = computed(() => Math.ceil(tableLaunches.value.length / itemsPerPage.value))

const paginatedLaunches = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	const end = start + itemsPerPage.value
	return tableLaunches.value.slice(start, end)
})
const onPageChange = (page: number) => {
	currentPage.value = page
}

// Try to refresh is there's a case of tablelaunches length is 0
const refreshPage = () => {
	if (!tableLaunches.value.length) {
		window.location.reload()
	}
}
const route = useRoute()
watch(route, () => {
	refresh()
})
onMounted(() => {
	refresh()
	refreshPage()
})

// Access the favorites store
const favoritesStore = useFavorites()

// Toggle the favorite state
const toggleFavorite = (launch: launchesInterface) => {
	const favorite = {
		rocketName: launch.rocket.rocket_name,
		rocketId: launch.rocket.rocket.id,
		launchId: launch.id,
		mission: launch.mission_name,
	}
	favoritesStore.toggleFavorite(favorite)
}

// Check if a rocket-launch combination is in favorites
const isFavorite = (launch: launchesInterface) => {
	return favoritesStore.getFavorites.some(
		(fav: any) => fav.rocketId === launch.rocket.rocket.id && fav.launchId === launch.id,
	)
}
</script>

<style scoped>
.custom-select {
	width: 200px;
}

.custom-input {
	display: flex;
	gap: 50px;
}

.ha {
	text-decoration: none;
	color: inherit;
}

.ha:hover {
	text-decoration: underline;
}
</style>
