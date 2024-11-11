<template>
	<v-container>
		<h1 class="text-center">Page Not Found 404</h1>
		<h2 class="text-center">Redirecting to Launches...</h2>
	</v-container>
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: 'path-middleware',
})

const router = useRouter()

onBeforeMount(() => {
	router.push('/')
})
</script>
