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
import {IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton} from '@ionic/vue';

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
  components: {
    IonTitle,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton
  },
})
</script>

<style scoped lang="less">

</style>