<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
    computed: {
        ...mapState(useUserStore, ['user', 'accessToken'])
    },
    methods: {
        async resendVerificationEmail() {
            try {
                await this.$axios.post(
                    '/auth/verify/resend/' + this.user.id,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${this.accessToken}`
                        }
                    }
                )
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<template>
    <main>
        <button
            @click.prevent="resendVerificationEmail"
            type="button"
            class="btn btn-primary shadow"
        >
            Resend verification email
        </button>
    </main>
</template>
