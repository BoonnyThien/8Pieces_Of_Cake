import { onRequestOptions as __click_js_onRequestOptions } from "D:\\Clone Voice\\8Pieces_Of_Cake\\functions\\click.js"
import { onRequestPost as __click_js_onRequestPost } from "D:\\Clone Voice\\8Pieces_Of_Cake\\functions\\click.js"
import { onRequestGet as __stats_js_onRequestGet } from "D:\\Clone Voice\\8Pieces_Of_Cake\\functions\\stats.js"

export const routes = [
    {
      routePath: "/click",
      mountPath: "/",
      method: "OPTIONS",
      middlewares: [],
      modules: [__click_js_onRequestOptions],
    },
  {
      routePath: "/click",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__click_js_onRequestPost],
    },
  {
      routePath: "/stats",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__stats_js_onRequestGet],
    },
  ]