<script>
import { RouterView } from 'vue-router'
import NavbarMain from '@/components/NavbarMain.vue'
import DialogSignUp from '@/components/DialogSignUp.vue'
import DialogLogin from '@/components/DialogLogin.vue'

export default {
    components: {
        RouterView,
        NavbarMain,
        DialogSignUp,
        DialogLogin
    }
}
</script>

<template>
    <NavbarMain></NavbarMain>

    <RouterView />

    <!-- Login and Sign up modals -->
    <DialogSignUp></DialogSignUp>
    <DialogLogin></DialogLogin>
</template>

<style>
.btn-primary {
    --bs-btn-bg: var(--gt-color-secondary);
    --bs-btn-border-color: var(--gt-color-secondary);
    --bs-btn-hover-bg: var(--gt-color-secondary-hover);
    --bs-btn-hover-border-color: var(--gt-color-secondary);
    --bs-btn-active-bg: var(--gt-color-secondary-active);
    --bs-btn-active-border-color: var(--gt-color-secondary-active);
}

.form-control {
    border-color: var(--gt-color-secondary);
}

.form-control:focus {
    box-shadow: 0 0 0 0.25rem var(--gt-color-secondary-transparent);
}
</style>
