<script>
import DialogModal from './DialogModal.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { mapActions } from 'pinia'

export default {
    components: { DialogModal },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            retypePassword: '',
            wasValidated: false
        }
    },
    methods: {
        async sendForm() {
            this.validatePassword()
            if (this.$refs.signupForm.checkValidity()) {
                const userData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    confirm_password: this.retypePassword
                }
                try {
                    const signupResponse = await this.$axios.post('/signup/user', userData)
                    console.log(signupResponse.data)
                    // status code 200 means email already taken
                    if (signupResponse.status === 200) {
                        this.createNotification({
                            type: 'warning',
                            message:
                                'The provided email was already used for an existing account. Please try with another one or login'
                        })
                    } else {
                        this.$refs.modalComponent.closeModal()
                        this.createNotification({
                            type: 'success',
                            message:
                                'Account created successfully! A verification email has been sent to the address you provided.'
                        })
                    }
                } catch (err) {
                    console.log(err)
                    this.createNotification({
                        type: 'danger',
                        message: 'An error occurred during account creation. Please try again.'
                    })
                }
            }
            // this will add class was-validated to the form and start giving visual feedback to the user
            this.wasValidated = true
        },
        //custom retype password validation
        validatePassword() {
            if (this.password !== '' && this.password === this.retypePassword) {
                // setting to empty string means that the input is valid
                this.$refs.retypePasswordInput.setCustomValidity('')
            } else {
                this.$refs.retypePasswordInput.setCustomValidity(`Passwords don't match`)
            }
        },
        ...mapActions(useNotificationsStore, ['createNotification'])
    }
}
</script>

<template>
    <DialogModal form-id="signup-dialog" title="Sign Up" ref="modalComponent">
        <form
            ref="signupForm"
            :class="[wasValidated ? 'was-validated' : 'needs-validation']"
            novalidate
        >
            <div class="form-floating mb-3">
                <input
                    v-model="name"
                    type="text"
                    class="form-control rounded-3"
                    id="name-input-signup"
                    placeholder="Your name"
                    required
                />
                <label for="name-input-signup">Name</label>
                <div class="invalid-feedback">You must provide a name.</div>
            </div>
            <div class="form-floating mb-3">
                <input
                    v-model="email"
                    type="email"
                    class="form-control rounded-3"
                    id="email-input-signup"
                    placeholder="name@example.com"
                    required
                />
                <label for="email-input-signup">Email address</label>
                <div class="invalid-feedback">You must use a valid email address.</div>
            </div>
            <div class="form-floating mb-3">
                <input
                    v-model="password"
                    type="password"
                    class="form-control rounded-3"
                    id="password-input-signup"
                    placeholder="Password"
                    required
                    minlength="8"
                    pattern="^\S+$"
                />
                <label for="password-input-signup">Password</label>
                <div class="invalid-feedback">
                    Your password must be at least 8 characters long and contain no whitespaces.
                </div>
            </div>
            <div class="form-floating mb-3">
                <input
                    @keyup="validatePassword"
                    ref="retypePasswordInput"
                    v-model="retypePassword"
                    type="password"
                    class="form-control rounded-3"
                    id="retype-password-input-signup"
                    placeholder="Password"
                    required
                />
                <label for="retype-password-input-signup">Retype password</label>
                <div class="invalid-feedback">Passwords don't match.</div>
            </div>
            <button
                @click.prevent="sendForm"
                class="w-100 mb-2 btn btn-lg rounded-3 btn-primary shadow"
                type="submit"
            >
                Sign up
            </button>
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">Or login with an existing account</h2>
            <button
                class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#login-dialog"
            >
                Login
            </button>
        </form>
    </DialogModal>
</template>
