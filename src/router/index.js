import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../views/Index.vue"
import Select from "../views/Select.vue"
// import Result from "../views/Result.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/about",
    name: "Select",
    component: Select,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
