import Vue from 'vue'
import VueModalRouter from 'vue-modal-router'
import routes from './routes'

Vue.use(VueModalRouter)

const modalRouter = new VueModalRouter({
  model: 'show',
  delay: 300,
  routes
})

console.log('modal routes ->', routes)
export default modalRouter
