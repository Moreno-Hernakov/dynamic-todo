<template>
  <div class="home-template">
    <div class="bg-primary" style="padding-top: 72px;"></div>
    <div class="container p-3">

      <h1>home</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-template',
  created() {
    () => window.location.hash = "reload";
  },
}
</script>