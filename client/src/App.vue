<script>
import { RouterView } from 'vue-router'
import NavbarMain from '@/components/NavbarMain.vue'
import DialogSignUp from '@/components/DialogSignUp.vue'
import DialogLogin from '@/components/DialogLogin.vue'
import DialogPasswordReset from '@/components/DialogPasswordReset.vue'
import NotificationList from '@/components/NotificationList.vue'
import { mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useNotificationsStore } from '@/stores/notifications'

export default {
    components: {
        RouterView,
        NavbarMain,
        DialogSignUp,
        DialogLogin,
        DialogPasswordReset,
        NotificationList
    },
    methods: {
        ...mapActions(useUserStore, ['setUser']),
        ...mapActions(useNotificationsStore, ['createNotification']),
        async tryAutomaticLogin() {
            try {
                // try to login using stored refresh token
                const loginResponse = await this.$axios.post('/auth/tokens/refresh', {})
                console.log(loginResponse.data)
                this.setUser(loginResponse.data)

                // start a timer to refresh the access token before it expires
                const waitTime = Math.max(loginResponse.data.expires_in - 10_000, 10_000) // times in milliseconds
                setTimeout(this.tryAutomaticLogin, waitTime)
            } catch (err) {
                if (err.response?.status === 401) {
                    console.log(err.response.data)
                } else {
                    console.log(err)
                    this.createNotification({
                        type: 'danger',
                        message: 'An error occurred while trying to login. Please do a manual login'
                    })
                }
            }
        }
    },
    async mounted() {
        await this.tryAutomaticLogin()
    }
}
</script>

<template>
    <div class="d-flex flex-column h-100">
        <NavbarMain></NavbarMain>

        <RouterView class="overflow-auto" />
    </div>

    <!-- Notification panel-->
    <NotificationList></NotificationList>

    <!-- Login and Sign up modals -->
    <DialogSignUp></DialogSignUp>
    <DialogLogin></DialogLogin>
    <DialogPasswordReset></DialogPasswordReset>
</template>

<style>
.btn-primary {
    --bs-btn-bg: var(--gt-color-secondary);
}

.btn-primary,
.btn-outline-primary {
    --bs-btn-border-color: var(--gt-color-secondary);
    --bs-btn-hover-bg: var(--gt-color-secondary-hover);
    --bs-btn-hover-border-color: var(--gt-color-secondary);
    --bs-btn-active-bg: var(--gt-color-secondary-active);
    --bs-btn-active-border-color: var(--gt-color-secondary-active);
}

.form-control {
    border-color: var(--gt-color-secondary);
}

.form-control:focus {
    box-shadow: 0 0 0 0.25rem var(--gt-color-secondary-transparent);
}
</style>
