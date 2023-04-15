<script>
import UserAvatar from '@/components/UserAvatar.vue'
import { mapStores, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useNotificationsStore } from '@/stores/notifications'

export default {
    components: { UserAvatar },
    computed: {
        ...mapStores(useUserStore),
        profilePath() {
            return `/profile/${this.userStore.user.id}`
        }
    },
    methods: {
        async logout() {
            try {
                const logoutResponse = await this.$axios.post(
                    `/auth/logout/${this.userStore.user.id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${this.userStore.accessToken}`
                        }
                    }
                )
                console.log(logoutResponse.data)
                this.userStore.$reset()
                this.createNotification({
                    type: 'success',
                    message: 'You have logged out successfully!'
                })
                this.$router.push('/').then(() => {
                    this.$router.go()
                })
            } catch (err) {
                console.log(err)
                this.createNotification({
                    type: 'danger',
                    message: 'An error occurred while logging out'
                })
            }
        },
        ...mapActions(useNotificationsStore, ['createNotification'])
    }
}
</script>

<template>
    <ul class="navbar-nav">
        <li class="nav-item dropdown">
            <a
                class="nav-link d-none d-lg-block"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <UserAvatar></UserAvatar>
            </a>
            <ul
                class="dropdown-menu dropdown-menu-end dropdown-menu-dark gap-1 p-2 rounded-3 shadow"
            >
                <li>
                    <h6 class="dropdown-header">
                        Welcome back, <br />
                        <b>{{ userStore.user.name }}</b>
                    </h6>
                </li>
                <li>
                    <RouterLink :to="profilePath" class="dropdown-item rounded-2"
                        >Profile</RouterLink
                    >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><button @click="logout" class="dropdown-item rounded-2">Logout</button></li>
            </ul>

            <!-- Mobile only version -->
            <ul
                class="dropdown-menu dropdown-menu-end dropdown-menu-dark gap-1 p-2 rounded-3 shadow d-grid d-lg-none"
            >
                <li class="d-flex justify-content-between">
                    <h6 class="dropdown-header">
                        Welcome back, <br />
                        <b>{{ userStore.user.name }}</b>
                    </h6>
                    <UserAvatar></UserAvatar>
                </li>
                <li>
                    <RouterLink :to="profilePath" class="dropdown-item rounded-2"
                        >Profile</RouterLink
                    >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><button @click="logout" class="dropdown-item rounded-2">Logout</button></li>
            </ul>
        </li>
    </ul>
</template>

<style scoped>
.dropdown-menu {
    --bs-dropdown-bg: var(--gt-color-main-darker);
    --bs-dropdown-link-active-bg: var(--gt-color-secondary);
    --bs-dropdown-divider-bg: var(--gt-color-main-lighter);
}
</style>
