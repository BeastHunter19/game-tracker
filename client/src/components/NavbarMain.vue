<script>
import { RouterLink } from 'vue-router'

export default {
    data() {
        return {
            appPages: this.$router.getRoutes()
        }
    },
    components: {
        RouterLink
    }
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark shadow justify-content-between">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Game Tracker</a>
                <div class="collapse navbar-collapse" id="navbarToggler">
                    <ul class="navbar-nav nav-pills me-auto mb-2 mb-lg-0">
                        <li v-for="(page, index) in appPages" :key="index" class="nav-item">
                            <RouterLink class="nav-link" active-class="active" :to="page.path">{{ page.name }}</RouterLink>
                        </li>
                    </ul>
                </div>

                <form class="d-flex mx-auto" role="search">
                    <div class="input-group">
                        <input class="form-control form-control-lg" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-primary" type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </form>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
                    aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </header>
</template>

<style>
.btn-primary {
    --bs-btn-bg: var(--gt-color-main);
    --bs-btn-border-color: var(--gt-color-main);
    --bs-btn-hover-bg: var(--gt-color-main-hover);
    --bs-btn-hover-border-color: var(--gt-color-main);
    --bs-btn-active-bg: var(--gt-color-main-active);
    --bs-btn-active-border-color: var(--gt-color-main-active);
}

.navbar {
    background-color: var(--bs-indigo);
    --bs-navbar-nav-link-padding-x: 1rem;
    text-transform: capitalize;
}

.nav-pills {
    --bs-nav-pills-link-active-bg: var(--gt-color-main);
}

.navbar .form-control {
    border-color: var(--gt-color-main);
}

.navbar .form-control:focus {
    box-shadow: 0 0 0 0.25rem var(--gt-color-main-transparent);
}
</style>