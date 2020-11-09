<template>
  <!--登录-->
  <ion-page>
    <custom-navbar title="登录"></custom-navbar>
    <ion-content>
      <ion-button @click="$router.back()">返回</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onUnmounted} from "vue";
import {useRouter} from 'vue-router';
import {IonContent, IonPage,IonButton} from '@ionic/vue';
import Emmiter from 'tiny-emitter/instance';
export default defineComponent({
  name: "Login",
  components: {
    IonPage,
    IonButton,
    IonContent,
  },
  setup() {
    const router = useRouter();
    onUnmounted(() => {
      Emmiter.emit('getList');
    })
    return { router}
  }
})
</script>

<style scoped lang="less">

</style>