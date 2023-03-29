<script>
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { ContentPanel }
}
</script>

<template>
    <ContentPanel class="mb-4 mx-2 mx-md-4">
        <div class="container px-4 py-1">
            <div class="row g-5 py-2 row-cols-1 row-cols-lg-3">
                <div class="feature col">
                    <div
                        class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3"
                    >
                        <i class="bi bi-clock-history"></i>
                    </div>
                    <h3 class="fs-2">Backlog</h3>
                    <p>
                        Add the titles that you still haven't played to your backlog, so that you
                        will always know what to play next after you finish a game.
                    </p>
                </div>
                <div class="feature col">
                    <div
                        class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3"
                    >
                        <i class="bi bi-controller"></i>
                    </div>
                    <h3 class="fs-2">Already Played</h3>
                    <p>
                        Add games to your Already Played list to keep track of them and read
                        statistics about your playing habits, in addition to suggestions for games
                        that you may like.
                    </p>
                </div>
                <div class="feature col">
                    <div
                        class="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3"
                    >
                        <i class="bi bi-binoculars"></i>
                    </div>
                    <h3 class="fs-2">Watch List</h3>
                    <p>
                        Save the titles that you want to play in the future when someone gives you a
                        recommendation, so you won't forget about them. You can also save games that
                        have not released yet.
                    </p>
                </div>
            </div>
        </div>
    </ContentPanel>
</template>
