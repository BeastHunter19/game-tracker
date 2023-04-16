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

input,
input:active,
input:focus {
    background-color: var(--gt-color-bg);
    color: var(--gt-color-text);
}

input::placeholder {
    color: var(--gt-color-text);
}

input::ms-input-placeholder {
    color: var(--gt-color-text);
}
</style>
