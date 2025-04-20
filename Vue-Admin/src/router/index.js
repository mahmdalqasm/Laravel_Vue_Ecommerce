import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AppLayout from "../components/AppLayout.vue";
import Products from "../views/Products.vue";
import Users from "../views/Users.vue";
import Report from "../views/Report.vue";
import { useAuth } from "../stores/Auth.js";
import NotFound from "../views/NotFound.vue";

const routes = [
    {
        path: "/app",
        name: "app",
        component: AppLayout,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "dashboard",
                name: "app-dashboard",
                component: Dashboard,
            },
            {
                path: "products",
                name: "app-products",
                component: Products,
            },
            {
                path: "users",
                name: "app-users",
                component: Users,
            },
            {
                path: "report",
                name: "app-report",
                component: Report,
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/request-password",
        name: "requestPassword",
        component: RequestPassword,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/reset-password/:token",
        name: "resetPassword",
        component: ResetPassword,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/:pathMatch(.*)",
        name: "notFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = useAuth();
    if (to.meta.requiresAuth && !auth.user.token) {
        console.log("object");
        next({ name: "login" });
    } else if (to.meta.requiresGuest && auth.user.token) {
        next({name: "app-dashboard"});
    } else {
        next();
    }
});

export default router;
