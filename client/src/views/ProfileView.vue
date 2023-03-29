<script>
import MainGamesPanel from '@/components/MainGamesPanel.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { MainGamesPanel, UserAvatar, ContentPanel },
    data() {
        return {
            testArray: Array(20).fill({
                title: 'Bloodborne',
                release: '2015',
                developer: 'From Software',
                genres: ['Adventure', 'Role-playing (RPG)', 'Action', 'Souls-like'],
                platforms: ['PlayStation 4', 'PC (magari)'],
                image: 'https://assets.reedpopcdn.com/-1616688899670.jpg/BROK/thumbnail/1600x900/quality/100/-1616688899670.jpg',
                added: true
            })
        }
    }
}
</script>

<template>
    <main class="w-100 mw-100">
        <div class="container-fluid p-0 m-0 mt-4">
            <div class="row mw-100 g-0 mb-4">
                <div class="mw-100">
                    <ContentPanel class="col mx-2 mx-md-4">
                        <UserAvatar size="100px"></UserAvatar>
                    </ContentPanel>
                </div>
            </div>
            <div class="row g-0 justify-content-around row-cols-auto row-cols-lg-3 mw-100">
                <MainGamesPanel class="col mx-lg-4 py-lg-4 px-lg-2"></MainGamesPanel>
            </div>
        </div>
    </main>
</template>
