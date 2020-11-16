<template>
  <!--navbar 二次封装-->
  <ion-header :class="{'ion-no-border': !bottomBorder}" v-overlay>
    <ion-toolbar :color="color">
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <slot name="end"></slot>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {isPlatform} from '@ionic/vue';

export default defineComponent({
  name: "CustomNavbar",
  props: {
    title: String,
    color: {
      type: String,
      default: 'primary'
    },
    bottomBorder: {
      type: Boolean,
      default: false,
    }
  },
  // 沉浸式状态栏Header需要加入padding-top以此使内容能够正常显示
  directives: {
    overlay: {
      async mounted(el: HTMLElement) {
        if (isPlatform('android')) {
          const nextElement: HTMLElement = el.firstChild as HTMLElement;
          (nextElement.nextSibling as HTMLElement).style.paddingTop = '30px';
        }
      }
    }
  },
})
</script>