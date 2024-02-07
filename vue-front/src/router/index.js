import { createRouter, createWebHistory } from "vue-router";
import PageHome from "@/views/PageHome";
import BoardList from "@/views/board/BoardList"
import BoardDetail from "@/views/board/BoardDetail"

const routes = [
    {
        path: '/',
        name: 'PageHome',
        component: PageHome
    },
    {
        path: '/board/list',
        name: 'BoardList',
        component: BoardList
    },
    {
        path: '/board/detail',
        name: 'BoardDetail',
        component: BoardDetail
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router