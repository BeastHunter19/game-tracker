<script>
export default {
    props: {
        message: {
            type: String,
            required: false
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column align-items-center justify-content-center h-100">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p v-if="message">{{ message }}</p>
    </div>
</template>
