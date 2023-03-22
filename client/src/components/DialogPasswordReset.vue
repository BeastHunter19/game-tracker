<script>
import DialogModal from './DialogModal.vue'
import { mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useNotificationsStore } from '@/stores/notifications'

export default {
    components: { DialogModal },
    data() {
        return {
            email: '',
            wasValidated: false
        }
    },
    methods: {
        async sendForm() {
            if (this.$refs.resetRequestForm.checkValidity()) {
                try {
                    const loginResponse = await this.$axios.post('/auth/password/reset', {
                        email: this.email
                    })
                    console.log(loginResponse.data)
                    this.createNotification({
                        type: 'success',
                        message: 'A password reset email has been sent successfully.'
                    })
                    this.$refs.modalComponent.closeModal()
                } catch (err) {
                    console.log(err)
                    if (err.response?.status === 404) {
                        this.createNotification({
                            type: 'warning',
                            message:
                                'The specified email is not associated with an existing account.'
                        })
                    } else {
                        this.createNotification({
                            type: 'danger',
                            message: 'An error occurred while sending the email'
                        })
                    }
                }
            }
            this.wasValidated = true
        },
        ...mapActions(useUserStore, ['setUser']),
        ...mapActions(useNotificationsStore, ['createNotification'])
    }
}
</script>

<template>
    <DialogModal form-id="reset-request-dialog" title="Reset Password" ref="modalComponent">
        <p>
            Type your email address down here. If it is associated with an existing account you will
            receive an email with a password reset link.
        </p>
        <form
            ref="resetRequestForm"
            :class="[wasValidated ? 'was-validated' : 'needs-validation']"
            novalidate
        >
            <div class="form-floating mb-3">
                <input
                    v-model="email"
                    type="email"
                    class="form-control rounded-3"
                    id="email-input-reset-request"
                    placeholder="name@example.com"
                    required
                />
                <label for="email-input-reset-request">Email address</label>
                <div class="invalid-feedback">You must use a valid email address.</div>
            </div>
            <button
                @click.prevent="sendForm"
                class="w-100 mb-3 btn btn-lg rounded-3 btn-primary shadow"
                type="submit"
            >
                Send email
            </button>
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">Or try to login again</h2>
            <button
                class="w-100 py-2 mb-2 btn rounded-3 btn-outline-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#login-dialog"
            >
                Login
            </button>
        </form>
    </DialogModal>
</template>
