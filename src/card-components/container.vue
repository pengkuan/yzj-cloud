<template>
    <iframe :src="src" frameborder="0"></iframe>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: 'iframe'
        }
    }
}
</script>
