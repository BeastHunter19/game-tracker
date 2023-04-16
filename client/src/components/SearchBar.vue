<script>
export default {
    data() {
        return {
            searchQuery: '',
            searchTimer: null
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
    },
    watch: {
        searchQuery() {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer)
            }
            this.searchTimer = setTimeout(this.search, 1000)
        }
    }
}
</script>

<template>
    <form @submit.prevent="search" role="search" class="col">
        <div class="input-group shadow">
            <input
                v-model="searchQuery"
                class="form-control form-control-lg rounded-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
            <button class="btn btn-primary rounded-5" type="submit">
                <i class="bi bi-search"></i>
            </button>
        </div>
    </form>
</template>

<style scoped>
form {
    max-width: 700px;
}

.form-control {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.btn {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}
</style>
