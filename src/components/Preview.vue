<template lang="pug">
  div.markdown-body(v-html="html")
</template>

<script>
export default {
  name: 'Preview',
  computed: {
    html() {
      return this.$store.getters.textHtml
    },
  },
}
</script>

<style src='github-markdown-css/github-markdown.css'>
</style>

<style lang="sass">
.markdown-body
  @apply tw-p-4

  ul
    list-style: disc
</style>
