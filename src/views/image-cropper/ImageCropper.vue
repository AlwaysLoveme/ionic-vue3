<template>
  <!--图片裁剪-->
  <ion-page>
    <custom-navbar title="裁剪图片" id="cropper-nav"></custom-navbar>
    <ion-content>
      <div class="image-cropper" :style="{height: `calc(100vh - ${height}px)`}">
        <img :src="imageSrc" alt="" ref="imageElement">
      </div>
      <ion-footer id="cropper-footer" class="ion-no-border">
        <ion-toolbar class="ion-flex ion-justify-content-end">
          <ion-button @click="uploadCropperImage" mode="md" expand="block">确定</ion-button>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {cropperImage} from "./cropper";

export default defineComponent({
  name: "Login",
  setup() {
    const {imageSrc, cropper, imageElement, height, uploadCropperImage} = cropperImage();
    return {cropper, imageElement, imageSrc, height, uploadCropperImage}
  }
})
</script>

<style scoped lang="scss">
@import "~cropperjs/dist/cropper.min.css";

.image-cropper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;

  img {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    min-width: 100%;
  }

  .cropper {

    .cropper-bg {
      background-image: none;
    }
  }
}
</style>