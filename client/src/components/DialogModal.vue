<script>
import { Modal } from 'bootstrap'
export default {
    props: {
        formId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModal() {
            const bsModalInstance = Modal.getOrCreateInstance(this.$refs.modalRoot)
            bsModalInstance.hide()
        },
        openModal() {
            const bsModalInstance = Modal.getOrCreateInstance(this.$refs.modalRoot)
            bsModalInstance.show()
        }
    },
    expose: ['closeModal', 'openModal']
}
</script>

<template>
    <div
        class="modal fade py-5"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        :id="formId"
        tabindex="-1"
        role="dialog"
        ref="modalRoot"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow-lg">
                <div class="modal-header px-2 px-md-5 pt-5 pb-4 border-bottom-0">
                    <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
                    <h1 class="fw-bold mb-0 fs-2">{{ title }}</h1>
                    <button
                        type="button"
                        class="btn-close btn-close-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>

                <div class="modal-body px-2 px-md-5 pt-0 pb-5">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    --bs-modal-bg: var(--gt-color-main-lighter);
    --bs-modal-color: var(--gt-color-text);
}
</style>
