<script>
export default {
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        search() {
            const searchRoute = {
                name: 'search',
                query: { query: this.searchQuery }
            }
            if (this.$route.name === 'search') {
                this.$router.replace(searchRoute)
            } else {
                this.$router.push(searchRoute)
            }
        }
    }
}
</script>

<template>
    <form @submit.prevent="search" role="search" class="col">
        <div class="input-group shadow">
            <input
                v-model="searchQuery"
                class="form-control form-control-lg"
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
            <button class="btn btn-primary" type="submit">
                <i class="bi bi-search"></i>
            </button>
        </div>
    </form>
</template>

<style scoped>
form {
    max-width: 700px;
}
</style>
