
import { Bell, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

type HeaderProps = {
    onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className={styles.dashboardHeader}>
            <button
                type="button"
                className={styles.menuButton}
                onClick={onMenuClick}
                aria-label="Open navigation"
                aria-controls="dashboard-sidebar"
            >
                <Menu size={21} />
            </button>

            {/* Search */}
            <div className={styles.headerSearch}>
                <Search size={19} />
                <input
                    type="search"
                    placeholder="Search anything..."
                    aria-label="Search"
                />
            </div>

            {/* Header Actions */}
            <div className={styles.headerActions}>
                {/* Notifications */}
                <Link
                    to="/notifications"
                    className={styles.notificationButton}
                    aria-label="Notifications"
                >
                    <Bell size={21} />
                </Link>

                {/* User Profile */}
                <div className={styles.headerProfile}>
                    <div className={styles.profileAvatar}>
                        V
                    </div>

                    <div className={styles.profileInfo}>
                        <span className={styles.profileName}>
                            Customer
                        </span>

                        <span className={styles.profileRole}>
                            Personal Account
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
