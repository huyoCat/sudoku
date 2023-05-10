import { createSSRApp } from "vue";
import App from "./App.vue";
// import '@/common/CSS/logical.less'
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
