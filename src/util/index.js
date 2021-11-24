import { defineAsyncComponent, h } from "vue";
import Error from "../components/ErrorComponent.vue";
import Loading from "../components/LoadingComponent.vue";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
NProgress.configure({
  trickleSpeed: 50,
  showSpinner: false,
});

export function delay(duration) {
  if (!duration) {
    duration = random(1000, 5000);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 得到一个异步页面
export function getAsyncPage(path) {
  return defineAsyncComponent({
    loader: async () => {
      NProgress.start();
      await delay();
      const comp = await import(path);
      NProgress.done();
      return comp;
    },
    loadingComponent: Loading, // 当promise在pending状态时，将显示这里的组件
  });
}

// 得到一个异步组件
export function getAsyncComponent(path) {
  return defineAsyncComponent({
    loader: async () => {
      await delay();
      if (Math.random() < 0.5) {
        throw new TypeError();
      }
      return import(path);
    },
    loadingComponent: Loading, // 当promise在pending状态时，将显示这里的组件
    errorComponent: {
      render() {
        return h(Error, "出错了！！！");
      },
    },
  });
}