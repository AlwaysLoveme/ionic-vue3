<template>
  <!--首页-->
  <ion-page>
    <custom-navbar title="工作台" :bottom-border="false"></custom-navbar>
    <ion-content ref="content">
      <ion-button @click="router.push({path: '/goods-list'})">Refresh an InfiniteScroll</ion-button>
      <ion-button @click="file()">fileChoose</ion-button>
      <ion-button @click="router.push({path: '/image-cropper'})">imageCropper</ion-button>
      <p>
        <img :src="img" alt="">
      </p>
      <div class="ion-padding">
        <ion-input placeholder="enter something" v-keyboard-overlay></ion-input>
        <ion-input placeholder="enter psd" v-keyboard-overlay></ion-input>
        <ion-input placeholder="enter something" v-keyboard-overlay></ion-input>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import FileChoose from '@/utils/fileChoose';
import {defineComponent, onMounted, ref} from "vue";
import {useRouter} from 'vue-router';
import Emmiter from 'tiny-emitter/instance';
import {IonContent, IonPage, IonButton, IonInput} from '@ionic/vue';

export default defineComponent({
  name: "Home",
  components: {
    IonPage,
    IonButton,
    IonInput,
    IonContent,
  },
  setup() {
    const img = ref('');
    const content = ref(null);
    onMounted(() => {
      // const el: any = content.value;
      // el.$el.scrollToBottom(100);
    })
    const router = useRouter();

    const file = async () => {
      await FileChoose.createAction();
    }
    return {router, file, content, img}
  }
})
</script>

<style scoped lang="less">
ion-input {
  margin-top: 400px;
}
</style>