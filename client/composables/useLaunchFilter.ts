import { ref, computed } from 'vue'

// interfaces

export interface launchesInterface {
	id: string
	mission_name: string
	launch_date_local: string | number | Date
	launch_site: {
		site_name: string
	}
	rocket: {
		rocket_name: string
		rocket: {
			id: string
		}
	}
	details: string
}
export interface LaunchesResponse {
	launches: launchesInterface[]
}

export const useLaunchFilter = (data: launchesInterface[]) => {
	// this holds the v model value
	const selectedYear = ref<string | null>('All')

	// map the year on the date to be assign it in select input options
	const years = computed(() => {
		const allYears = data.map((launch: { launch_date_local: string | number | Date }) =>
			new Date(launch.launch_date_local).getFullYear(),
		)
		return ['All', ...new Set(allYears)].sort((a: any, b: any) => b + a)
	})

	const filteredLaunches = computed(() => {
		if (!selectedYear.value || selectedYear.value === 'All') {
			console.log(data)
			return data
		} else {
			const filteredData = data.filter(
				(launch) => new Date(launch.launch_date_local).getFullYear() === Number(selectedYear.value),
			)
			console.log(filteredData)
			return filteredData
		}
	})
	const setSelectedYear = (year: string | null) => {
		selectedYear.value = year
	}

	return {
		years,
		selectedYear,
		filteredLaunches,
		setSelectedYear,
	}
}
