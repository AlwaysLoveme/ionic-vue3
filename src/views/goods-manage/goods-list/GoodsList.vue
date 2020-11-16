<template>
  <!--商品列表-->
  <ion-page>
    <custom-navbar title="商品列表"></custom-navbar>
    <custom-page-content refresh infinite @refresh="getGoodsData(false)" @infinite="getGoodsData(true)">
      <ion-list>
        <ion-item v-for="(item, index) of goodsData" :key="index" class="ion-margin-bottom ion-margin-top"
                  @click="router.push({path: '/login'})">
          <ion-avatar class="ion-margin-end">
            <img :src="item.main_image" alt="">
          </ion-avatar>
          <ion-label>
            <p>{{ item.goods_name }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </custom-page-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {getGoodsList} from "./goods";
import {useRouter} from "vue-router";
import { useBackButton } from '@ionic/vue';
// import {getInstance} from "@/utils/getInstance";

export default defineComponent({
  name: "GoodsList",
  setup() {
    useBackButton(10, () => {
      console.log('Another handler was called!');
    });
    const router = useRouter();
    const { getGoodsData, goodsState, goodsData} = getGoodsList();
    return {router, goodsData, goodsState, getGoodsData}
  }
})
</script>

<style scoped lang="scss">
</style>