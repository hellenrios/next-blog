// src/nprogress.d.ts
declare module 'nprogress' {
    interface NProgress {
      start: () => NProgress;
      done: (force?: boolean) => NProgress;
      configure: (options: Partial<NProgressOptions>) => NProgress;
      status: number | null;
      set: (n: number) => NProgress;
      isStarted: () => boolean;
      trickle: () => NProgress;
      inc: (amount?: number) => NProgress;
    }
  
    interface NProgressOptions {
      minimum: number;
      easing: string;
      positionUsing: string;
      speed: number;
      trickle: boolean;
      trickleSpeed: number;
      showSpinner: boolean;
      barSelector: string;
      spinnerSelector: string;
      parent: string;
      template: string;
    }
  
    const nprogress: NProgress;
    export default nprogress;
  }
  