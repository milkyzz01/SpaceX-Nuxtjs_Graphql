<template>
	<v-container class="index">
		<h1 class="text-white">
			Welcome to Space
			<span>X</span>
		</h1>
		<h2 class="subheader text-white mb-15">Exploring the Final Frontier, One Launch at a Time</h2>
		<v-btn class="launch-btn" color="secondary" large @click="goToLaunches">
			Launch Now
			<v-icon right>mdi-arrow-right</v-icon>
		</v-btn>
	</v-container>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'default',
	middleware: 'path-middleware',
})

const router = useRouter()

const goToLaunches = () => {
	router.push('/content/launches')
}
</script>

<style scoped>
.text-white {
	position: relative;
	z-index: 10;
	text-align: center;
	font-size: 4rem;
	font-weight: bolder !important;
	letter-spacing: 2px;
	text-shadow:
		0 0 10px rgb(255 255 255 / 80%),
		/* soft outer glow */ 0 0 20px rgb(255 255 255 / 60%); /* bigger soft glow */
}

span {
	color: red;
}

/* Subheader styling */
.subheader {
	position: relative;
	font-size: 1.2rem;
	font-weight: lighter;
	margin-top: 10px;
	text-shadow:
		0 0 10px rgb(255 255 255 / 80%),
		/* soft outer glow */ 0 0 20px rgb(255 255 255 / 60%); /* bigger soft glow */

	z-index: 10;
}

/* Layout Styling */
.index {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

/* Vuetify Button at the bottom */
.launch-btn {
	font-size: 1.2rem;
	text-transform: none;
	font-weight: bolder;
	display: flex;
	align-items: center;
	padding: 20px;
	cursor: pointer !important;
	z-index: 10; /* Ensure button is above the background layers */
}
</style>
