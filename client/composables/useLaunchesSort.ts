import { ref, computed } from 'vue'
import type { launchesInterface } from '~/composables/useLaunchFilter'

export const useLaunchSort = (filteredLaunches: ComputedRef<launchesInterface[]>) => {
	// v model to selected sort order (asc or desc)
	const selectedSort = ref<'asc' | 'desc' | null>(null)

	// Computed property to sort the launches based on the selected sort order
	const sortedLaunches = computed(() => {
		const data = filteredLaunches.value

		if (!selectedSort.value) {
			return data
		}

		return [...data].sort((a, b) => {
			const dateA = new Date(a.launch_date_local).getTime()
			const dateB = new Date(b.launch_date_local).getTime()

			if (selectedSort.value === 'asc') {
				return dateA - dateB
			} else if (selectedSort.value === 'desc') {
				return dateB - dateA
			}
			return 0
		})
	})

	// Function to update the selected sort value when the user selects a new option
	const setSelectedSort = (sortOrder: 'asc' | 'desc' | null) => {
		selectedSort.value = sortOrder
	}

	return {
		selectedSort,
		sortedLaunches,
		setSelectedSort,
	}
}
