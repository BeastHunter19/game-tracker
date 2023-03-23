<script>
import UserAvatar from '@/components/UserAvatar.vue'

export default {
    components: { UserAvatar }
}
</script>

<template>
    <ul class="navbar-nav">
        <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <UserAvatar></UserAvatar>
            </a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                <li>
                    <h6 class="dropdown-header">
                        Welcome back, <br />
                        <b>Francesco Coppola</b>
                    </h6>
                </li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
        </li>
    </ul>
</template>

<style scoped>
.dropdown-menu {
    --bs-dropdown-bg: var(--gt-color-main-darker);
    --bs-dropdown-link-active-bg: var(--gt-color-secondary);
    --bs-dropdown-divider-bg: var(--gt-color-main-lighter);
}
</style>
