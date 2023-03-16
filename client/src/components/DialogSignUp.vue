<script>
import DialogModal from './DialogModal.vue'
export default {
    components: { DialogModal }
}
</script>

<template>
    <DialogModal form-id="signup-dialog" title="Sign Up">
        <form class="">
            <div class="form-floating mb-3">
                <input
                    type="text"
                    class="form-control rounded-3"
                    id="name-input-signup"
                    placeholder="Your name"
                />
                <label for="name-input-signup">Name</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    type="email"
                    class="form-control rounded-3"
                    id="email-input-signup"
                    placeholder="name@example.com"
                />
                <label for="email-input-signup">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    type="password"
                    class="form-control rounded-3"
                    id="password-input-signup"
                    placeholder="Password"
                />
                <label for="password-input-signup">Password</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    type="password"
                    class="form-control rounded-3"
                    id="retype-password-input-signup"
                    placeholder="Password"
                />
                <label for="retype-password-input-signup">Retype password</label>
            </div>
            <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary shadow" type="submit">
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
