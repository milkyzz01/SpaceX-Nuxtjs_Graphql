// store/favorites.ts

export const useFavorites = defineStore('favorites', {
	state: () => ({
		favorites: [] as { rocketName: string; rocketId: string; launchId: string; mission: string }[],
	}),
	getters: {
		getFavorites: (state) => state.favorites,
	},
	actions: {
		addFavorite(favorite: { rocketName: string; rocketId: string; launchId: string; mission: string }) {
			if (
				!this.favorites.some(
					(fav) => fav.rocketId === favorite.rocketId && fav.launchId === favorite.launchId,
				)
			) {
				this.favorites.push(favorite)
			}
		},
		removeFavorite(launchId: string, rocketId: string) {
			// Remove the favorite by both launch_id and rocket_id
			this.favorites = this.favorites.filter(
				(fav) => fav.launchId !== launchId || fav.rocketId !== rocketId,
			)
		},
		toggleFavorite(favorite: {
			rocketName: string
			rocketId: string
			launchId: string
			mission: string
		}) {
			// If the combination of rocket_id and launch_id is in favorites, remove it, else add it
			const { rocketId, launchId } = favorite
			if (this.favorites.some((fav) => fav.rocketId === rocketId && fav.launchId === launchId)) {
				this.removeFavorite(launchId, rocketId)
			} else {
				this.addFavorite(favorite)
			}
		},
	},
})
