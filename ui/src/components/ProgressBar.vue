<!-- borrowed from Nuxt! -->

<template>
  <div class="progress" :style="{
    'width': percent+'%',
    'height': height,
    'background-color': canSuccess? color : failedColor,
    'opacity': show ? 1 : 0
  }"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
class ProgressBar extends Vue {
  private timer: number;

  private cut: number;

  private percent = 0;

  private show = false;

  private canSuccess = true;

  private duration = 3000;

  private height = '4px';

  private color = '#96FFE0';

  private failedColor = '#ff0000';

  get isActive(): boolean {
    return this.show;
  }

  start(): ProgressBar {
    this.show = true;
    this.canSuccess = true;
    if (this.timer) {
      window.clearInterval(this.timer);
      this.percent = 0;
    }
    this.cut = 10000 / Math.floor(this.duration);

    this.timer = window.setInterval(() => {
      this.increase(this.cut * Math.random());
      if (this.percent > 95) {
        this.pause();
      }
    }, 100);

    return this;
  }

  pause(): ProgressBar {
    clearInterval(this.timer);
    return this;
  }

  finish(): ProgressBar {
    this.percent = 100;
    this.hide();
    return this;
  }

  fail(): ProgressBar {
    this.canSuccess = false;
    return this;
  }

  private set(num: number) {
    this.show = true;
    this.canSuccess = true;
    this.percent = Math.floor(num);
    return this;
  }

  private get() {
    return Math.floor(this.percent);
  }

  private increase(num: number) {
    this.percent += Math.floor(num);
    return this;
  }

  private decrease(num: number) {
    this.percent -= Math.floor(num);
    return this;
  }

  private hide() {
    clearInterval(this.timer);
    this.timer = null;
    setTimeout(() => {
      this.show = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.percent = 0;
        }, 200);
      });
    }, 500);
    return this;
  }
}

export default ProgressBar;
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: #96FFE0;
  z-index: 999999;
}
</style>
