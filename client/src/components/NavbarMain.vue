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
                <!-- Mobile Brand -->
                <a class="navbar-brand d-inline d-lg-none" href="#">Game Tracker</a>

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
                    <div
                        class="col my-2 my-lg-0 d-flex justify-content-center justify-content-lg-start"
                    >
                        <!-- Desktop Brand -->
                        <a class="navbar-brand d-none d-lg-inline" href="#">Game Tracker</a>

                        <ul class="navbar-nav nav-pills">
                            <li
                                v-for="(page, index) in appPages"
                                :key="index"
                                class="nav-item mx-xl-2 mb-2 mb-lg-0"
                            >
                                <RouterLink
                                    class="nav-link px-3"
                                    active-class="active aria-current shadow"
                                    :to="page.path"
                                >
                                    {{ page.name }}
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <!-- Search -->
                    <div class="col mx-5 mx-lg-0 mb-3 mb-lg-0 d-flex justify-content-center">
                        <form role="search" class="col">
                            <div class="input-group shadow">
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
                    </div>

                    <!-- Login buttons -->
                    <div class="col-xxl ms-2 ms-xxl-0 mb-2 mb-lg-0 d-flex justify-content-end">
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
