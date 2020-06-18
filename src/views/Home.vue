<template>
  <div class="home">
     <navbar></navbar>
     <div class="wrap" ref="wrap">
       <div class="top"></div>
       <div class="top"></div>
     </div>
  </div>
</template>

<script>
import navbar from '../components/navbar.vue'
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  mounted() {
    this.initStyle();
  },
  components: {
    navbar,
  },
  methods: {
    initStyle() {
      const windowHeight =document.documentElement.clientHeight || document.body.clientHeight;
      this.$refs.wrap.style.height = windowHeight - 56 + 'px';
    }
  },
}
</script>
<style lang="less" scoped>
  .home {
    .wrap {
      background-color: rgb(244, 246, 250);
    }
  }
</style>
<style lang="less">
  .home {

  }
</style>
