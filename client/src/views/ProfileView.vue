<script>
import MainGamesPanel from '@/components/MainGamesPanel.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import ContentPanel from '@/components/ContentPanel.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import DialogShareProfile from '@/components/DialogShareProfile.vue'
import { useUserStore } from '@/stores/user'
import { useGamesStore } from '@/stores/games'
import { useNotificationsStore } from '@/stores/notifications'
import { mapStores, mapActions } from 'pinia'

export default {
    components: { MainGamesPanel, UserAvatar, ContentPanel, LoadingSpinner, DialogShareProfile },
    data() {
        return {
            sendingEmail: false,
            publicUser: {}
        }
    },
    watch: {
        '$route.params': {
            async handler(newValue, oldValue) {
                // this is true even when leaving the route
                if (newValue?.userID !== oldValue?.userID) {
                    if (!this.userStore.isOwner && this.$route.params?.userID) {
                        try {
                            const id = this.$route.params.userID
                            const response = await this.$axios.get('/auth/public/' + id)
                            // this extra check manages the case where the automatic login happens
                            // during the request execution
                            if (!this.userStore.isOwner) {
                                this.publicUser = response.data
                                this.gamesStore.fetchAll(id)
                            }
                        } catch (err) {
                            console.log(err)
                            this.createNotification({
                                type: 'danger',
                                message: 'Could not retrieve user public information'
                            })
                        }
                    } else if (Object.keys(this.publicUser).length > 0) {
                        this.gamesStore.fetchAll()
                        this.publicUser = {}
                    }
                }
            },
            immediate: true
        },
        'userStore.loggedIn': {
            handler(newValue, oldValue) {
                if (oldValue === false && newValue === true && this.userStore.isOwner) {
                    this.publicUser = {}
                }
            }
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
        completedGames() {
            let count = 0
            this.gamesStore.played.forEach((value) => {
                if (value.completed === true) {
                    count++
                }
            })
            return count
        },
        backlogGames() {
            return this.gamesStore.backlog.length
        },
        completedPercentage() {
            if (this.ownedGames === 0) {
                return 0
            } else {
                return (this.completedGames / this.ownedGames) * 100
            }
        },
        userName() {
            return Object.keys(this.publicUser).length > 0
                ? this.publicUser.name
                : this.userStore.user?.name ?? ''
        },
        userVerified() {
            return Object.keys(this.publicUser).length > 0
                ? this.publicUser.verified
                : this.userStore.user.verified
        }
    },
    methods: {
        async resendVerificationEmail() {
            try {
                this.sendingEmail = true
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
            } finally {
                this.sendingEmail = false
            }
        },
        ...mapActions(useNotificationsStore, ['createNotification'])
    }
}
</script>

<template>
    <main class="w-100 mw-100 h-100">
        <LoadingSpinner v-if="gamesStore.loading"></LoadingSpinner>
        <div v-else class="container-fluid p-0 m-0 mt-4">
            <div class="row g-0 justify-content-around mw-100 ms-lg-4">
                <div class="col-12 col-lg-8 col-xl-9 mw-100 mb-4 order-last order-lg-first">
                    <MainGamesPanel></MainGamesPanel>
                </div>

                <div
                    class="col-12 col-lg-4 col-xl-3 mw-100 mb-4 order-first order-lg-last px-3 ps-lg-0"
                >
                    <div
                        class="position-sticky w-100 user-panel rounded-5 shadow py-4 py-lg-0"
                        style="top: 1rem"
                    >
                        <ContentPanel
                            class="mx-2 mx-md-4 py-lg-4 px-lg-2 d-flex justify-content-center align-items-center gap-4 flex-column"
                        >
                            <UserAvatar :name="userName" size="100px" textSize="2"></UserAvatar>
                            <p class="fs-5">
                                {{ userName }}
                                <br />
                                <span v-if="userStore.isOwner" class="me-2">{{
                                    userStore.user.email
                                }}</span>
                                <span v-if="userVerified" class="badge bg-primary"> Verified </span>
                                <span v-if="!userVerified" class="badge bg-danger">
                                    Not verified
                                </span>
                                <br />
                                <button
                                    @click="resendVerificationEmail"
                                    v-if="!userVerified && userStore.isOwner"
                                    class="btn btn-primary mt-3 me-3 shadow"
                                    :disabled="sendingEmail"
                                >
                                    <span
                                        v-show="sendingEmail"
                                        class="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Verify email
                                </button>
                                <button
                                    v-if="userStore.isOwner"
                                    class="btn btn-primary mt-3 shadow"
                                    data-bs-toggle="modal"
                                    data-bs-target="#share-profile-dialog"
                                >
                                    Share profile
                                    <i class="bi bi-share"></i>
                                </button>
                            </p>
                        </ContentPanel>

                        <ContentPanel class="mb-4 mx-2 mx-md-4 py-lg-4 px-lg-2">
                            <div class="fs-5 px-1">
                                <h3><i class="bi bi-bar-chart-line"></i> Statistics</h3>
                                <ul
                                    class="my-3 text-nowrap list-unstyled d-flex flex-wrap justify-content-center gap-3"
                                >
                                    <li class="stat-item rounded-3 shadow p-3">
                                        Owned: {{ ownedGames }}
                                    </li>
                                    <li class="stat-item rounded-3 shadow p-3">
                                        Backlog: {{ backlogGames }}
                                    </li>
                                    <li class="stat-item rounded-3 shadow p-3">
                                        Played: {{ playedGames }}
                                    </li>
                                    <li class="stat-item rounded-3 shadow p-3">
                                        Completed: {{ completedGames }}
                                    </li>
                                    <li class="stat-item rounded-3 shadow p-3">
                                        Watched: {{ watchedGames }}
                                    </li>
                                </ul>
                                <div class="mb-2">Completed games:</div>
                                <div
                                    class="progress p-0 shadow mx-auto"
                                    style="height: 20px; max-width: 20rem"
                                >
                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        aria-label="Percentage of played games over total owned"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        :style="`width: ${completedPercentage}%`"
                                        :aria-valuenow="completedPercentage"
                                    ></div>
                                </div>
                            </div>
                        </ContentPanel>
                    </div>
                </div>
            </div>
        </div>

        <DialogShareProfile></DialogShareProfile>
    </main>
</template>

<style scoped>
.progress {
    --bs-progress-bar-bg: var(--gt-color-secondary);
}

.stat-item {
    background-color: var(--gt-color-main);
    height: 3rem;
    line-height: 0.8;
}

.user-panel {
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
