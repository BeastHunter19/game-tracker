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
            password: '',
            wasValidated: false
        }
    },
    methods: {
        async sendForm() {
            if (this.$refs.loginForm.checkValidity()) {
                const loginDetails = {
                    email: this.email,
                    password: this.password
                }
                try {
                    const loginResponse = await this.$axios.post('/auth/login', loginDetails)
                    console.log(loginResponse.data)
                    this.setUser(loginResponse.data)
                    this.$refs.modalComponent.closeModal()
                    this.createNotification({
                        type: 'success',
                        message: 'You have logged in successfully!'
                    })
                } catch (err) {
                    console.log(err)
                    if (err.response?.status === 401) {
                        this.createNotification({
                            type: 'warning',
                            message: 'The email and/or password provided are wrong. Try again.'
                        })
                    } else {
                        this.createNotification({
                            type: 'danger',
                            message: 'An error occurred while logging in'
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
    <DialogModal form-id="login-dialog" title="Login" ref="modalComponent">
        <form
            ref="loginForm"
            :class="[wasValidated ? 'was-validated' : 'needs-validation']"
            novalidate
        >
            <div class="form-floating mb-3">
                <input
                    v-model="email"
                    type="email"
                    class="form-control rounded-3"
                    id="email-input-login"
                    placeholder="name@example.com"
                    required
                />
                <label for="email-input-login">Email address</label>
                <div class="invalid-feedback">You must use a valid email address.</div>
            </div>
            <div class="form-floating mb-3">
                <input
                    v-model="password"
                    type="password"
                    class="form-control rounded-3"
                    id="password-input-login"
                    placeholder="Password"
                    required
                    pattern="^\S+$"
                />
                <label for="password-input-login">Password</label>
                <div class="invalid-feedback">You must enter a password.</div>
            </div>
            <button
                @click.prevent="sendForm"
                class="w-100 mb-3 btn btn-lg rounded-3 btn-primary shadow"
                type="submit"
            >
                Login
            </button>
            <small class="text-muted">
                Click
                <a href="#" data-bs-toggle="modal" data-bs-target="#reset-request-dialog">here</a>
                to recover your password.
            </small>
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">Or create a new account</h2>
            <button
                class="w-100 py-2 mb-2 btn rounded-3 btn-outline-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#signup-dialog"
            >
                Sign Up
            </button>
        </form>
    </DialogModal>
</template>
