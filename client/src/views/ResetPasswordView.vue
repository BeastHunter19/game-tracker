<script>
import DialogPasswordUpdate from '@/components/DialogPasswordUpdate.vue'

export default {
    components: { DialogPasswordUpdate }
}
</script>

<template>
    <main class="h-100 d-flex flex-column justify-content-center align-items-center">
        <h2>Click down here to return to the homepage</h2>
        <RouterLink class="btn btn-primary shadow" to="/">Homepage</RouterLink>
    </main>

    <DialogPasswordUpdate></DialogPasswordUpdate>
</template>
