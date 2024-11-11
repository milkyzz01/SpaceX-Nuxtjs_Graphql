<template>
	<v-app>
		<!-- Background layers -->
		<div class="stars" />
		<div class="twinkling" />
		<div class="clouds" />

		<!-- Content Container with slot -->
		<div class="content-container">
			<!-- Page content will be rendered here -->
			<slot />
		</div>
	</v-app>
</template>

<style scoped>
/* Background layers */
.stars,
.twinkling,
.clouds {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	display: block;
	z-index: 0; /* Ensure backgrounds stay at the bottom */
}

.stars {
	background: #000 url('http://www.script-tutorials.com/demos/360/images/stars.png') repeat top center;
}

.twinkling {
	background: transparent url('http://www.script-tutorials.com/demos/360/images/twinkling.png') repeat top
		center;
	animation: move-twink-back 200s linear infinite;
}

.clouds {
	background: transparent url('http://www.script-tutorials.com/demos/360/images/clouds3.png') repeat top
		center;
	animation: move-clouds-back 200s linear infinite;
}

@keyframes move-twink-back {
	from {
		background-position: 0 0;
	}

	to {
		background-position: -10000px 5000px;
	}
}

@keyframes move-clouds-back {
	from {
		background-position: 0 0;
	}

	to {
		background-position: 10000px 0;
	}
}
</style>
