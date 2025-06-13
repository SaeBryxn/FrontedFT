import { createRouter, createWebHistory } from 'vue-router'

// Páginas de bienvenida y login
import WelcomePage from '@/pages/WelcomePage.vue'
import LoginClient from '@/pages/client/LoginClient.vue'
import LoginSupplier from '@/pages/supplier/LoginSupplier.vue'

// Dashboards principales
import DashboardClient from '@/pages/client/DashboardClient.vue'
import DashboardSupplier from '@/pages/supplier/DashboardSupplier.vue'

// Vistas organizadas (Client)
import OrdersList from '@/domains/client/orders/views/OrdersList.vue'
import AnalyticsDashboard from '@/domains/client/analytics/views/AnalyticsDashboard.vue'
import TerminalsDashboard from '@/domains/client/terminals/views/TerminalsDashboard.vue'
import ProviderDashboard from '@/domains/client/provider/views/ProviderDashboard.vue'
import WorkflowsDashboard from '@/domains/client/workflows/views/WorkflowsDashboard.vue'

// Vistas organizadas (Supplier)
import OrdersManagement from '@/domains/supplier/orders-management/views/OrdersManagement.vue'
import ConciliationsDashboard from '@/domains/supplier/conciliations/views/ConciliationsDashboard.vue'
import DispatchDashboard from '@/domains/supplier/dispatch/views/DispatchDashboard.vue'
import ProviderAnalytics from "@/domains/supplier/analytics/views/ProviderAnalytics.vue";
import PricesDashboard from "@/domains/supplier/prices/views/PricesDashboard.vue";
import ClientsDashboard from "@/domains/supplier/clients/views/ClientsDashboard.vue";

const routes = [
    // ✅ Página de bienvenida
    { path: '/', component: WelcomePage },

    // Login según rol
    { path: '/login-client', component: LoginClient },
    { path: '/login-supplier', component: LoginSupplier },

    // Dashboard CLIENTE
    {
        path: '/client',
        component: DashboardClient,
        children: [
            { path: 'orders', component: OrdersList },
            { path: 'analytics', component: AnalyticsDashboard },
            { path: 'terminals', component: TerminalsDashboard },
            { path: 'provider', component: ProviderDashboard },
            { path: 'workflows', component: WorkflowsDashboard },
            { path: 'admin', component: { template: '<h2>Admin View</h2>' } }
        ]
    },

    // Dashboard PROVEEDOR
    {
        path: '/supplier',
        component: DashboardSupplier,
        children: [
            { path: 'admin', component: { template: '<h2>Admin View</h2>' } },
            { path: 'orders', component: OrdersManagement },
            { path: 'conciliations', component: ConciliationsDashboard },
            { path: 'dispatch', component: DispatchDashboard },
            { path: 'analytics', component: ProviderAnalytics },
            { path: 'prices', component: PricesDashboard },
            { path: 'clients', component: ClientsDashboard }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
