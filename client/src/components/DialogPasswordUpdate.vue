<script>
import DialogModal from './DialogModal.vue'
import { mapActions } from 'pinia'
import { useNotificationsStore } from '@/stores/notifications'

export default {
    components: { DialogModal },
    data() {
        return {
            password: '',
            retypePassword: '',
            wasValidated: false
        }
    },
    mounted() {
        this.$refs.modalComponent.openModal()
    },
    methods: {
        async sendForm() {
            if (this.$refs.passwordUpdateForm.checkValidity()) {
                try {
                    const updateResponse = await this.$axios.patch('/auth/password/update', {
                        password: this.password,
                        confirm_password: this.retypePassword,
                        token: this.$route.query.token
                    })
                    console.log(updateResponse.data)
                    this.createNotification({
                        type: 'success',
                        message: 'Your password has been updated successfully.'
                    })
                    this.$refs.modalComponent.closeModal()
                } catch (err) {
                    console.log(err)
                    this.createNotification({
                        type: 'danger',
                        message: 'An error occurred while updating your password'
                    })
                }
            }
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
    <DialogModal form-id="password-update-dialog" title="Update Password" ref="modalComponent">
        <p>Choose a new password for your account.</p>
        <form
            ref="passwordUpdateForm"
            :class="[wasValidated ? 'was-validated' : 'needs-validation']"
            novalidate
        >
            <div class="form-floating mb-3">
                <input
                    v-model="password"
                    type="password"
                    class="form-control rounded-3"
                    id="password-input-update-password"
                    placeholder="Password"
                    required
                    minlength="8"
                    pattern="^\S+$"
                />
                <label for="password-input-update-password">Password</label>
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
                    id="retype-password-input-update-password"
                    placeholder="Password"
                    required
                />
                <label for="retype-password-input-update-password">Retype password</label>
                <div class="invalid-feedback">Passwords don't match.</div>
            </div>
            <button
                @click.prevent="sendForm"
                class="w-100 mb-3 btn btn-lg rounded-3 btn-primary shadow"
                type="submit"
            >
                Update password
            </button>
        </form>
    </DialogModal>
</template>
