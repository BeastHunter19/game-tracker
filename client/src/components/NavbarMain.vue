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
            <div class="container-fluid d-flex">
                <!-- Brand -->
                <a class="navbar-brand" href="#">Game Tracker</a>

                <!-- Toggler -->
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Collapsible area -->
                <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
                    <!-- Navigation -->
                    <!-- TODO: turn navigation into dropdown at smaller breakpoints -->
                    <ul class="col navbar-nav nav-pills my-2 my-lg-0">
                        <li
                            v-for="(page, index) in appPages"
                            :key="index"
                            class="nav-item mx-5 mx-lg-0 mx-xl-2 mb-2 mb-lg-0"
                        >
                            <RouterLink
                                class="nav-link"
                                active-class="active aria-current shadow"
                                :to="page.path"
                            >
                                {{ page.name }}
                            </RouterLink>
                        </li>
                    </ul>

                    <!-- Search -->
                    <form
                        role="search"
                        class="col mx-5 mb-3 mb-lg-0 shadow align-seld-center text-center"
                    >
                        <div class="input-group">
                            <input
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

                    <!-- Login buttons -->
                    <div class="col mb-2 mb-lg-0 d-flex justify-content-end">
                        <button type="button" class="btn btn-primary shadow me-2">Login</button>
                        <button type="button" class="btn btn-primary shadow">Sign in</button>
                    </div>
                </div>
            </div>
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

.navbar form {
    max-width: 600px;
}
</style>
