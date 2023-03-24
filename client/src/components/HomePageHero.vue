<script>
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { ContentPanel }
}
</script>

<template>
    <ContentPanel>
        <h1 class="display-5 fw-bold">Get started</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4 fs-3">
                Game Tracker allows you to search for your favourite games, add them to your already
                played list to get some statistics, to your backlog to help you decide what to play
                next or to your wishlist to remember about that game that piqued your interest.
            </p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#signup-dialog"
                    type="button"
                    class="btn btn-primary btn-lg px-4 gap-3 shadow"
                >
                    Sign Up
                </button>
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#login-dialog"
                    type="button"
                    class="btn btn-outline-primary btn-lg px-4"
                >
                    Login
                </button>
            </div>
        </div>
    </ContentPanel>
</template>
