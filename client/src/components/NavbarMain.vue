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
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark shadow">

            <!--Navigation-->
            <div class="d-flex justify-content-between container-fluid">
                <!--Brand-->
                <a class="navbar-brand ms-3" href="#">Game Tracker</a>

                <div class="collapse navbar-collapse multi-collapse w-auto" id="navbarTogglerLeft">
                    <ul class="navbar-nav nav-pills me-auto mb-2 mb-lg-0">
                        <li v-for="(page, index) in appPages" :key="index" class="nav-item mx-2">
                            <RouterLink class="nav-link" active-class="active shadow" :to="page.path">
                                {{ page.name }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>

                <form role="search">
                    <div class="input-group">
                        <input class="form-control form-control-lg" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-primary" type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </form>

                <span class="collapse navbar-collapse multi-collapse w-auto" id="navbarTogglerRight">
                    <button type="button" class="btn btn-primary shadow me-2">Login</button>
                    <button type="button" class="btn btn-primary shadow">Sign in</button>
                </span>
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse"
                aria-controls="navbarTogglerLeft navbarTogglerLeft" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
    </header>
</template>

<style scoped>
.btn-primary {
    --bs-btn-bg: var(--gt-color-secondary);
    --bs-btn-border-color: var(--gt-color-secondary);
    --bs-btn-hover-bg: var(--gt-color-secondary-hover);
    --bs-btn-hover-border-color: var(--gt-color-secondary);
    --bs-btn-active-bg: var(--gt-color-secondary-active);
    --bs-btn-active-border-color: var(--gt-color-secondary-active);
}

.navbar {
    background-color: var(--gt-color-main);
    --bs-navbar-nav-link-padding-x: 1rem;
    text-transform: capitalize;
}

.nav-pills {
    --bs-nav-pills-link-active-bg: var(--gt-color-secondary);
}

.navbar .form-control {
    border-color: var(--gt-color-secondary);
}

.navbar .form-control:focus {
    box-shadow: 0 0 0 0.25rem var(--gt-color-secondary-transparent);
}
</style>