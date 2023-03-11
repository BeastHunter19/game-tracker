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
            <div class="container-fluid text-center">
                <div class="row flex-grow-1">
                    <!-- Main section -->
                    <div
                        class="collapse navbar-collapse multi-collapse col-lg-4"
                        id="navigation-panel"
                    >
                        <!-- Brand -->
                        <a class="navbar-brand ms-3" href="#">Game Tracker</a>

                        <!-- Navigation -->
                        <ul class="navbar-nav nav-pills me-auto mb-2 mb-lg-0">
                            <li
                                v-for="(page, index) in appPages"
                                :key="index"
                                class="nav-item mx-2"
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
                    </div>

                    <!-- Search bar -->
                    <div class="col-lg-4 me-4 me-lg-0">
                        <form role="search">
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
                    </div>

                    <!-- Login buttons -->
                    <div
                        class="collapse navbar-collapse multi-collapse col-lg-4 justify-content-end"
                        id="login-panel"
                    >
                        <button type="button" class="btn btn-primary shadow me-2">Login</button>
                        <button type="button" class="btn btn-primary shadow">Sign in</button>
                    </div>
                </div>

                <!-- Toggler -->
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target=".multi-collapse"
                    aria-controls="navigation-panel login-panel"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
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
</style>
