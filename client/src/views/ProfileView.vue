<script>
import MainGamesPanel from '@/components/MainGamesPanel.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import ContentPanel from '@/components/ContentPanel.vue'
import { useUserStore } from '@/stores/user'
import { useGamesStore } from '@/stores/games'
import { useNotificationsStore } from '@/stores/notifications'
import { mapStores, mapActions } from 'pinia'

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
    },
    computed: {
        ...mapStores(useGamesStore, useUserStore),
        ownedGames() {
            return this.gamesStore.played.length + this.gamesStore.backlog.length
        },
        watchedGames() {
            return this.gamesStore.watchlist.length
        },
        playedGames() {
            return this.gamesStore.played.length
        },
        backlogGames() {
            return this.gamesStore.backlog.length
        },
        playedPercentage() {
            if (this.ownedGames === 0) {
                return 0
            } else {
                return (this.playedGames / this.ownedGames) * 100
            }
        }
    },
    methods: {
        async resendVerificationEmail() {
            try {
                const resendResponse = await this.$axios.post(
                    `/auth/verify/resend/${this.userStore.user.id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${this.userStore.accessToken}`
                        }
                    }
                )
                console.log(resendResponse.data)
                this.createNotification({
                    type: 'success',
                    message: 'Verification email sent successfully!'
                })
            } catch (err) {
                console.log(err)
                this.createNotification({
                    type: 'danger',
                    message: 'An error occurred while sending the verification email'
                })
            }
        },
        ...mapActions(useNotificationsStore, ['createNotification'])
    }
}
</script>

<template>
    <main class="w-100 mw-100">
        <div class="container-fluid p-0 m-0 mt-4">
            <div class="row mw-100 g-0 mb-4">
                <div class="mw-100">
                    <ContentPanel class="col mx-2 mx-md-4">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center gap-4">
                                <UserAvatar size="100px" textSize="2"></UserAvatar>
                                <p class="fs-5">
                                    {{ userStore.user.name }}
                                    <br />
                                    {{ userStore.user.email }}
                                    <span v-if="userStore.user.verified" class="badge bg-primary">
                                        Verified
                                    </span>
                                    <span v-if="!userStore.user.verified" class="badge bg-danger">
                                        Not verified
                                    </span>
                                    <br />
                                    <button
                                        @click="resendVerificationEmail"
                                        v-if="!userStore.user.verified"
                                        class="btn btn-primary mt-3"
                                    >
                                        Verify email
                                    </button>
                                </p>
                            </div>
                            <div class="fs-5">
                                <div class="row">
                                    <h3 class="col-12 text-start">Statistics</h3>
                                </div>
                                <div class="row g-5 text-nowrap">
                                    <span class="col-6">Owned: {{ ownedGames }}</span>
                                    <span class="col-6">Watched: {{ watchedGames }}</span>
                                </div>
                                <div class="row g-5 mb-2 text-nowrap">
                                    <span class="col-6">Played: {{ playedGames }}</span>
                                    <span class="col-6">Backlog: {{ backlogGames }}</span>
                                </div>
                                <div class="row">
                                    <span class="col-12 mb-2 text-start">Completed games:</span>
                                </div>
                                <div class="row px-2">
                                    <div class="col-12 progress p-0" style="height: 20px">
                                        <div
                                            class="progress-bar"
                                            role="progressbar"
                                            aria-label="Percentage of played games over total owned"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            :style="`width: ${playedPercentage}%`"
                                            :aria-valuenow="playedPercentage"
                                        >
                                            {{ Math.round(playedPercentage) }}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentPanel>
                </div>
            </div>
            <div class="row g-0 justify-content-around row-cols-auto row-cols-lg-3 mw-100 ms-lg-4">
                <MainGamesPanel class="col ms-lg-0 me-lg-4 py-lg-4 px-lg-2"></MainGamesPanel>
            </div>
        </div>
    </main>
</template>
