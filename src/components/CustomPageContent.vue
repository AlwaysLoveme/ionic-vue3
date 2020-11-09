<template>
  <!--二次封装 ion-content 供需要刷新、分页加载的列表页 -->
  <ion-content>
    <template v-if="refresh">
      <ion-refresher mode="md" slot="fixed" pull-min="100" pull-max="600" @ionRefresh="$emit('refresh')">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </template>

    <slot></slot>

    <template v-if="infinite">
      <ion-infinite-scroll mode="md" threshold="100px" @ionInfinite="$emit('infinite')">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </template>
  </ion-content>
</template>

<script lang="ts">
import {defineComponent} from "vue";
// import { emit } from '@vue/reactivity';
import {
  IonContent,
  IonRefresher,
  IonInfiniteScroll,
  IonRefresherContent,
  IonInfiniteScrollContent
} from '@ionic/vue';

export default defineComponent({
  name: "CustomPageContent",
  props: {
    // 开启下拉刷新，默认关闭
    refresh: {
      type: Boolean,
      default: false,
    },
    // 开启上拉加载，默认关闭
    infinite: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    IonContent,
    IonRefresher,
    IonInfiniteScroll,
    IonRefresherContent,
    IonInfiniteScrollContent
  },
  methods: {

  }
})
</script>

<style scoped>

</style>