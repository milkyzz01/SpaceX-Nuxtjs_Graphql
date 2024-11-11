<template>
	<v-app-bar color="secondary" density="compact" prominent>
		<!-- Only show the nav icon (drawer toggle) if the screen size is less than 1280px -->
		<v-app-bar-nav-icon v-if="$vuetify.display.mdAndDown" variant="text" @click.stop="drawer = !drawer" />

		<v-toolbar-title>{{ headerTitle }}</v-toolbar-title>

		<v-spacer />

		<v-btn icon="mdi-dots-vertical" variant="text" />
	</v-app-bar>

	<v-navigation-drawer
		v-model="drawer"
		:location="$vuetify.display.mobile ? 'bottom' : undefined"
		temporary
	>
		<v-list nav>
			<v-list-item v-for="item in menuItems" :key="item.value">
				<!-- Use NuxtLink to navigate to the specified route -->
				<nuxt-link :to="item.path" class="ha">
					<v-list-item-content>
						<v-list-item-title>
							<v-icon>{{ item.icon }}</v-icon>
							{{ item.title }}
						</v-list-item-title>
					</v-list-item-content>
				</nuxt-link>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts" setup>
// variables
const drawer = ref<boolean>(false)
const group = ref<any>(null)

// props
defineProps<{
	menuItems: Array<{
		title: string
		icon: string
		value: string
		path: string
	}>
	headerTitle: string
}>()

// Watcher to close the drawer when group changes
watch(group, () => {
	drawer.value = false
})
</script>

<style scoped>
.ha {
	text-decoration: none;
	color: inherit;
}

.ha:hover {
	text-decoration: underline;
}
</style>
