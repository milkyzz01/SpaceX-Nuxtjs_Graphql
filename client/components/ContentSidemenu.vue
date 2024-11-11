<template>
	<v-navigation-drawer expand-on-hover rail>
		<v-list>
			<v-list-item
				prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
				subtitle="admin@gmail.com"
				title="Admin"
			/>
		</v-list>

		<v-divider />

		<!-- Dynamically rendered list items -->
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
// Define the prop to receive menuItems from the parent
defineProps<{
	menuItems: Array<{
		title: string
		icon: string
		value: string
		path: string
	}>
}>()
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
