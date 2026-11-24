
import { NavLink,useNavigate } from "react-router-dom";


import {
    LayoutDashboard,
    Wallet,
    ArrowLeftRight,
    Send,
    Bell,
    UserRound,
    Settings,
    Landmark,
    LogOut,
    X,
} from "lucide-react";

import styles from "./Sidebar.module.css";
import { authService } from "../../services/authservice";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const navigationItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Transactions",
        path: "/transactions",
        icon: ArrowLeftRight,
    },
    {
        name: "Accounts",
        path: "/accounts",
        icon: Wallet,
    },
    {
        name: "Transfers",
        path: "/transfers",
        icon: Send,
    },
    {
        name: "Notifications",
        path: "/notifications",
        icon: Bell,
    },
    {
        name: "My Profile",
        path: "/profile",
        icon: UserRound,
    },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const navigate = useNavigate();
      async function handleLogout() {
    try {
        await authService.logout();
    } catch (error) {
        console.error("Logout failed:", error);
    }
    finally{
         navigate("/login", { replace: true });
    }
}
    return (
        <aside
            id="dashboard-sidebar"
            className={`${styles.dashboardSidebar} ${
                isOpen ? styles.dashboardSidebarOpen : ""
            }`}
            aria-label="Customer navigation"
        >
            {/* Brand */}
            <div className={styles.sidebarBrand}>
                <div className={styles.brandIcon}>
                    <Landmark size={23} />
                </div>

                <span>NovaBank</span>

                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close navigation"
                >
                    <X size={21} />
                </button>
            </div>

            {/* Navigation */}
            <nav className={styles.sidebarNavigation}>
                <p className={styles.sidebarLabel}>MENU</p>

                {navigationItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/dashboard"}
                            className={({ isActive }) =>
                                `${styles.sidebarNavLink} ${
                                    isActive
                                        ? styles.sidebarNavLinkActive
                                        : ""
                                }`
                            }
                                onClick={onClose}
                                title={item.name}
                        >
                            <Icon size={19} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom Navigation */}
            <div className={styles.sidebarBottom}>
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `${styles.sidebarNavLink} ${
                            isActive ? styles.sidebarNavLinkActive : ""
                        }`
                    }
                    onClick={onClose}
                    title="Settings"
                >
                    <Settings size={19} />
                    <span>Settings</span>
                </NavLink>

                <div className={styles.sidebarDivider} />

                <button
                    type="button"
                    className={styles.sidebarLogout}
                    title="Logout"
                    onClick={() => {
                       handleLogout()
                    }}
                >
                    <LogOut size={19} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
