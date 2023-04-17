<script>
import MainGamesPanel from '@/components/MainGamesPanel.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import ContentPanel from '@/components/ContentPanel.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import DialogModal from '@/components/DialogModal.vue'
import { useUserStore } from '@/stores/user'
import { useGamesStore } from '@/stores/games'
import { useNotificationsStore } from '@/stores/notifications'
import { mapStores, mapActions } from 'pinia'

export default {
    components: { MainGamesPanel, UserAvatar, ContentPanel, LoadingSpinner, DialogModal },
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
        },
        shareUrl() {
            return window.location.href
        },
        secureContext() {
            return window.isSecureContext
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
        copyUrl() {
            navigator.clipboard.writeText(this.shareUrl)
            this.createNotification({
                type: 'success',
                message: 'Copied to clipboard'
            })
        },
        ...mapActions(useNotificationsStore, ['createNotification'])
    }
}
</script>

<template>
    <main class="w-100 mw-100 h-100">
        <LoadingSpinner v-if="gamesStore.loading"></LoadingSpinner>
        <div v-else class="container-fluid p-0 m-0 mt-4">
            <div class="row g-0 justify-content-around row-cols-1 row-cols-lg-2 mw-100 ms-lg-4">
                <div class="col mw-100 mb-4">
                    <ContentPanel
                        class="mx-2 mx-md-4 ms-lg-0 me-lg-4 py-lg-4 px-lg-2 h-100 d-flex justify-content-center align-items-center gap-4 flex-wrap"
                    >
                        <UserAvatar :name="userName" size="100px" textSize="2"></UserAvatar>
                        <p class="fs-5">
                            {{ userName }}
                            <br />
                            <span v-if="userStore.isOwner">{{ userStore.user.email }}</span>
                            <span v-if="userVerified" class="badge bg-primary"> Verified </span>
                            <span v-if="!userVerified" class="badge bg-danger"> Not verified </span>
                            <br />
                            <button
                                @click="resendVerificationEmail"
                                v-if="!userVerified && userStore.isOwner"
                                class="btn btn-primary mt-3 me-3"
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
                                class="btn btn-primary mt-3"
                                data-bs-toggle="modal"
                                data-bs-target="#share-profile-dialog"
                            >
                                Share profile
                                <i class="bi bi-share"></i>
                            </button>
                        </p>
                    </ContentPanel>
                </div>
                <div class="col mw-100">
                    <ContentPanel
                        class="mb-4 mx-2 mx-md-4 ms-lg-0 me-lg-4 py-lg-4 px-lg-2 d-flex justify-content-center"
                    >
                        <div class="fs-5 mx-4 mw-50">
                            <div class="row mb-2">
                                <h3 class="col-12 text-start">
                                    <i class="bi bi-bar-chart-line"></i> Statistics
                                </h3>
                            </div>
                            <ul class="row g-4 mb-3 text-start text-nowrap">
                                <li class="col col-sm-8">Completed: {{ completedGames }}</li>
                                <li class="col col-sm-4">Watched: {{ watchedGames }}</li>
                                <li class="col col-sm-8">Played: {{ playedGames }}</li>
                                <li class="col col-sm-4">Backlog: {{ backlogGames }}</li>
                            </ul>
                            <div class="row">
                                <span class="col-12 mb-2 text-start">Completed games:</span>
                            </div>
                            <div class="row px-2">
                                <div class="col-12 progress p-0 shadow" style="height: 20px">
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
                        </div>
                    </ContentPanel>
                </div>
            </div>
            <div class="row g-0 justify-content-stretch row-cols-lg-3 mw-100 ms-lg-4">
                <MainGamesPanel class="col ms-lg-0 me-lg-4 py-lg-4 px-lg-2"></MainGamesPanel>
            </div>
        </div>
        <DialogModal formId="share-profile-dialog" title="Share profile">
            <p>
                Share this link to let other people see your public profile. They will be able to
                see your name and the games in your lists.
            </p>
            <div class="input-group shadow">
                <input
                    class="form-control"
                    type="text"
                    placeholder="Share"
                    aria-label="Share"
                    :value="shareUrl"
                    readonly
                />
                <button
                    v-if="secureContext"
                    @click.prevent="copyUrl"
                    class="btn btn-primary"
                    type="button"
                >
                    <i class="bi bi-clipboard2"></i>
                </button>
            </div>
        </DialogModal>
    </main>
</template>

<style scoped>
.progress {
    --bs-progress-bar-bg: var(--gt-color-secondary);
}
</style>
