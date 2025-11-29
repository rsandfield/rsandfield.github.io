import { createRouter, createWebHistory }from 'vue-router';
import About from './components/About.vue';

const routes = [
    {path: '/', component: About },
    {path: '/about', component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
