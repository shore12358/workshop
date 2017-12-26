import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../pages/dashboard/Dashboard'
import Task from '../pages/task/Task'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    }
  ]
})
