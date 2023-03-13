<script>
import DialogModal from './DialogModal.vue'
export default {
    components: { DialogModal }
}
</script>

<template>
    <DialogModal form-id="login-dialog" title="Login">
        <form class="">
            <div class="form-floating mb-3">
                <input
                    type="email"
                    class="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                />
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input
                    type="password"
                    class="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 mb-3 btn btn-lg rounded-3 btn-primary shadow" type="submit">
                Login
            </button>
            <small class="text-muted"> Click <a href="#">here</a> to recover your password.</small>
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
