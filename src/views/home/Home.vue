<template>
  <!--首页-->
  <ion-page>
    <custom-navbar title="工作台" :bottom-border="false"></custom-navbar>
    <ion-content ref="content">
      <ion-button mode="md" size="large" @click="router.push({path: '/goods-list'})">Refresh an InfiniteScroll</ion-button>
      <ion-button mode="md" @click="file()">fileChoose</ion-button>
      <ion-button mode="md" @click="router.push({path: '/image-cropper'})">imageCropper</ion-button>
      <p>
        <ion-img :src="img" alt="" />
      </p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {useRouter} from 'vue-router';
import FileChoose from '@/utils/fileChoose';
import Emmiter from 'tiny-emitter/instance';
import {UploadResult} from "@/utils/fileChoose";
import {defineComponent, onMounted, ref} from "vue";


export default defineComponent({
  name: "Home",
  setup() {
    const img = ref('');
    const content = ref(null);
    onMounted(() => {
      // const el: any = content.value;
      // el.$el.scrollToBottom(100);
      Emmiter.on('image', (image: UploadResult) => {
        img.value = image.url;
      });
    })
    const router = useRouter();

    const file = async () => {
      await FileChoose.createAction('pic', 1, 'image');
    }
    return {router, file, content, img}
  }
})
</script>

<style scoped lang="scss">
ion-input {
  margin-top: 400px;
}
</style>