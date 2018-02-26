<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <tab></tab>
  </div>
</template>

<script>
import vHeader from 'components/v-header/v-header'
import Tab from 'components/tab/tab'

export default {
  name: 'App',
  components: {
    vHeader, Tab
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/variable"

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $color-background;
  color: $color-text;
  font-size: $font-size-14;
</style>
