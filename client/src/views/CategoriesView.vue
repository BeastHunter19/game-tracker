<script>
import GamesPanel from '@/components/GamesPanel.vue'

export default {
    components: { GamesPanel },
    data() {
        return {
            // this will contain an object for each category with a name and the game list
            categories: [
                {
                    name: 'Soulslike',
                    games: Array(20).fill({
                        title: 'Bloodborne',
                        release: '2015',
                        developer: 'From Software',
                        genres: ['Adventure', 'Role-playing (RPG)', 'Action', 'Souls-like'],
                        platforms: ['PlayStation 4', 'PC (magari)'],
                        image: 'https://assets.reedpopcdn.com/-1616688899670.jpg/BROK/thumbnail/1600x900/quality/100/-1616688899670.jpg',
                        added: true
                    })
                },
                {
                    name: 'Action',
                    games: Array(20).fill({
                        title: 'Bloodborne',
                        release: '2015',
                        developer: 'From Software',
                        genres: ['Adventure', 'Role-playing (RPG)', 'Action', 'Souls-like'],
                        platforms: ['PlayStation 4', 'PC (magari)'],
                        image: 'https://assets.reedpopcdn.com/-1616688899670.jpg/BROK/thumbnail/1600x900/quality/100/-1616688899670.jpg',
                        added: true
                    })
                }
            ]
        }
    }
}
</script>

<template>
    <main class="pt-4">
        <GamesPanel
            v-for="(category, index) in categories"
            :key="index"
            :title="category.name"
            :gameList="category.games"
            :extendedRoute="{ name: 'category', params: { categoryName: category.name } }"
        ></GamesPanel>
    </main>
</template>
