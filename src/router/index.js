import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../views/Index.vue"
import Select from "../views/Select.vue"
import Result from "../views/Result.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/select/:id",
    name: "Select",
    component: Select,
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
