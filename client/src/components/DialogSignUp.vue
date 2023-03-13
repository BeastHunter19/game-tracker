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
            <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary shadow" type="submit">
                Sign up
            </button>
            <small class="text-muted">By clicking Sign up, you agree to the terms of use.</small>
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
            <button class="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" type="submit">
                <svg class="bi me-1" width="16" height="16">
                    <use xlink:href="#twitter" />
                </svg>
                Sign up with Twitter
            </button>
            <button class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                <svg class="bi me-1" width="16" height="16">
                    <use xlink:href="#facebook" />
                </svg>
                Sign up with Facebook
            </button>
            <button class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                <svg class="bi me-1" width="16" height="16">
                    <use xlink:href="#github" />
                </svg>
                Sign up with GitHub
            </button>
        </form>
    </DialogModal>
</template>
