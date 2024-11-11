<template>
	<v-container>
		<v-btn color="secondary" @click="back()">
			<v-icon left>mdi-arrow-left</v-icon>
			Back
		</v-btn>

		<h2 class="mt-5">Rocket Details</h2>

		<div v-if="rocket && rocket.name">
			<v-btn class="bg-secondary" @click="generatePDF()">Download via PDF</v-btn>
			<h3>{{ rocket.name }}</h3>
			<div>
				<p>
					<strong>Description:</strong>
					{{ rocket.description }}
				</p>
				<p>
					<strong>First Flight:</strong>
					{{ rocket.first_flight }}
				</p>
				<p>
					<strong>Height:</strong>
					{{ rocket.height?.feet }} feet
				</p>
				<p>
					<strong>Diameter:</strong>
					{{ rocket.diameter?.meters }} meters
				</p>
				<p>
					<strong>Mass:</strong>
					{{ rocket.mass?.kg }} kg
				</p>
				<p>
					<strong>Number of Stages:</strong>
					{{ rocket.stages }}
				</p>
			</div>
		</div>
		<v-progress-circular v-else-if="!rocket && !error" indeterminate color="primary" size="50" />
		<div v-else-if="error" class="text-red-500">Error loading rocket details: {{ error.message }}</div>
	</v-container>
</template>

<script lang="ts" setup>
// imports
import { jsPDF } from 'jspdf'
import { goBack } from '~/composables/useBackButton'

definePageMeta({
	layout: 'content',
	middleware: 'path-middleware',
})

// interfaces
interface Rocket {
	id: string
	name: string
	description: string
	first_flight: string | Date
	height: {
		feet: number
	}
	diameter: {
		meters: number
	}
	mass: {
		kg: number
	}
	stages: number
}

interface RocketResponse {
	rocket: Rocket
}

const route = useRoute()
const launchId = route.params.id as string

const rocketDetails = gql`
	query getRocketDetails($id: ID!) {
		rocket(id: $id) {
			id
			name
			description
			first_flight
			height {
				feet
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
		}
	}
`

// Fetch rocket details based on the rocket id
const { data, error } = useAsyncQuery<RocketResponse>(rocketDetails, {
	id: launchId,
})

// handle response section
// Access the rocket data
const rocket = computed(() => data.value?.rocket ?? null)

// go back composable function
const { back } = goBack()

// hooks section
onMounted(() => {
	console.log('Rocket Data:', data.value?.rocket.id)
})

// DL PDF FUNCTION
const generatePDF = () => {
	const doc = new jsPDF()

	const rocketData = data.value?.rocket
	if (!rocketData) {
		// If rocket data is not available, show a message and exit
		doc.text('Rocket data is not available.', 10, 10)
		doc.save('No-rocket-details.pdf')
		return
	}

	doc.setFontSize(24)
	doc.text('Rocket Details', 80, 20)

	doc.setFontSize(12)
	doc.text(`Name: ${rocketData.name}`, 20, 30)

	const description = rocketData.description
	const wrappedDescription = doc.splitTextToSize(description, 180)

	doc.text('Description:', 20, 40)
	doc.text(wrappedDescription, 20, 47)
	doc.text(`First Flight: ${rocketData.first_flight}`, 20, 70)
	doc.text(`Height: ${rocketData.height?.feet} feet`, 20, 80)
	doc.text(`Diameter: ${rocketData.diameter?.meters} meters`, 20, 90)
	doc.text(`Mass: ${rocketData.mass?.kg} kg`, 20, 100)
	doc.text(`Number of Stages: ${rocketData.stages}`, 20, 110)

	// Save the PDF
	doc.save(`rocket-details-${rocketData.name}.pdf`)
}
</script>

<style scoped>
.v-btn {
	margin-bottom: 20px;
}

h2 {
	font-size: 2.5rem;
	font-weight: bold;
	text-align: center;
}

h3 {
	font-size: 2rem;
	margin-bottom: 10px;
}

p {
	font-size: 1.125rem;
	line-height: 1.5;
	margin-bottom: 10px;
}

.text-red-500 {
	color: #f44336;
}

.v-progress-circular {
	display: block;
	margin: 50px auto;
}

.v-container {
	max-width: 900px;
	margin-top: 40px;
}
</style>
