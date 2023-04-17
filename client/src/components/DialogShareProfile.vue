<script>
import DialogModal from '@/components/DialogModal.vue'

export default {
    components: { DialogModal },
    computed: {
        shareUrl() {
            return window.location.href
        },
        secureContext() {
            return window.isSecureContext
        }
    },
    methods: {
        copyUrl() {
            navigator.clipboard.writeText(this.shareUrl)
            this.createNotification({
                type: 'success',
                message: 'Copied to clipboard'
            })
        }
    }
}
</script>

<template>
    <DialogModal formId="share-profile-dialog" title="Share profile">
        <p>
            Share this link to let other people see your public profile. They will be able to see
            your name and the games in your lists.
        </p>
        <div class="input-group shadow">
            <input
                class="form-control"
                type="text"
                placeholder="Share"
                aria-label="Share"
                :value="shareUrl"
                readonly
            />
            <button
                v-if="secureContext"
                @click.prevent="copyUrl"
                class="btn btn-primary"
                type="button"
            >
                <i class="bi bi-clipboard2"></i>
            </button>
        </div>
    </DialogModal>
</template>
