<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import Jpush from "@/utils/jpush";
import Splash from '@/utils/splash';
import { defineComponent } from 'vue';
import Statusbar from '@/utils/statusbar';
import BackButton from '@/utils/backButton';

export default defineComponent({
  name: 'App',
  setup() {
    document.addEventListener('deviceready', function () {
      new Jpush();
    }, false);
    BackButton.subscribe();
    Statusbar.setStatusBarStyle('dark');
    Statusbar.setOverlaysWebview(true);
    Splash.hide();
  }
});
</script>