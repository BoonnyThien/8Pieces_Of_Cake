import { onRequestOptions as __api_click_js_onRequestOptions } from "D:\\Clone Voice\\OctaTastenis\\functions\\api\\click.js"
import { onRequestPost as __api_click_js_onRequestPost } from "D:\\Clone Voice\\OctaTastenis\\functions\\api\\click.js"
import { onRequestOptions as __api_logs_js_onRequestOptions } from "D:\\Clone Voice\\OctaTastenis\\functions\\api\\logs.js"
import { onRequestPost as __api_logs_js_onRequestPost } from "D:\\Clone Voice\\OctaTastenis\\functions\\api\\logs.js"
import { onRequestGet as __stats_js_onRequestGet } from "D:\\Clone Voice\\OctaTastenis\\functions\\stats.js"

export const routes = [
    {
      routePath: "/api/click",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_click_js_onRequestOptions],
    },
  {
      routePath: "/api/click",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_click_js_onRequestPost],
    },
  {
      routePath: "/api/logs",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_logs_js_onRequestOptions],
    },
  {
      routePath: "/api/logs",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_logs_js_onRequestPost],
    },
  {
      routePath: "/stats",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__stats_js_onRequestGet],
    },
  ]