<template lang="pug">
  .preview-wrapper
    .markdown-body(v-html="html")
</template>

<script>
export default {
  name: 'Preview',
  computed: {
    html() {
      return this.$store.getters['note/textHtml']
    },
  },
}
</script>

<style src='github-markdown-css/github-markdown.css'>
</style>

<style lang="sass">
.preview-wrapper

.markdown-body
  @apply tw-p-6 tw-mx-auto
  max-width: 800px

  ul
    list-style: disc

  ol
    list-style: decimal
</style>
