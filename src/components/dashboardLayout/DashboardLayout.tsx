
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

import styles from "./DashboardLayout.module.css";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            {isSidebarOpen && (
                <button
                    type="button"
                    className={styles.overlay}
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close navigation"
                />
            )}

            <div className={styles.dashboardMain}>
                <Header
                    onMenuClick={() =>
                        setIsSidebarOpen((isOpen) => !isOpen)
                    }
                />
                <main className={styles.dashboardContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
