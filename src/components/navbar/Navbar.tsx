
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

import styles from "./Navbar.module.css";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
];

function scrollToSection(sectionId: string) {
    const target = document.getElementById(sectionId);
    if (!target) {
        return;
    }

    window.requestAnimationFrame(() => {
        const scrollContainer = document.scrollingElement;
        if (!scrollContainer) {
            target.scrollIntoView({ block: "start" });
            return;
        }

        const sectionOffset =
            Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) ||
            0;
        const top =
            target.getBoundingClientRect().top +
            scrollContainer.scrollTop -
            sectionOffset;

        scrollContainer.scrollTo({
            top: Math.max(0, top),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
        });
    });
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/") {
            return;
        }

        const sections = navLinks
            .map((link) => document.getElementById(link.href.substring(1)))
            .filter((section): section is HTMLElement => section !== null);

        if (sections.length === 0) {
            return;
        }

        const updateActiveSection = () => {
            const activationPoint = window.innerHeight * 0.35;
            let currentSection = sections[0].id;

            for (const section of sections) {
                if (section.getBoundingClientRect().top > activationPoint) {
                    break;
                }

                currentSection = section.id;
            }

            const isAtPageBottom =
                window.scrollY + window.innerHeight >=
                document.documentElement.scrollHeight - 1;

            if (isAtPageBottom) {
                currentSection = sections[sections.length - 1].id;
            }

            setActiveSection(currentSection);
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, {
            passive: true,
        });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === "/" && window.location.hash) {
            scrollToSection(window.location.hash.substring(1));
        }

        const handleHashChange = () => {
            if (location.pathname === "/" && window.location.hash) {
                scrollToSection(window.location.hash.substring(1));
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const closeOnWideScreen = () => {
            if (window.innerWidth > 760) {
                setMenuOpen(false);
            }
        };

        const closeOnEscape = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", closeOnWideScreen);
        window.addEventListener("keydown", closeOnEscape);

        return () => {
            window.removeEventListener("resize", closeOnWideScreen);
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, []);

    // Close mobile menu
    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleMobileSectionClick = (href: string) => {
        if (location.pathname !== "/") {
            closeMenu();
            return;
        }

        const target = document.getElementById(href.substring(1));
        if (!target) {
            closeMenu();
            return;
        }

        if (window.location.hash === href) {
            scrollToSection(target.id);
        }

        setActiveSection(target.id);
        window.requestAnimationFrame(closeMenu);
    };

    // Navigation URL
    const getSectionUrl = (href: string) => {
        return location.pathname === "/" ? href : `/${href}`;
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>

                {/* LOGO */}
                <Link
                    to="/"
                    className={styles.logo}
                    onClick={closeMenu}
                >
                    <img
                        src="/OrvexaBank%20Navy%20Gradient%20Logo.png"
                        alt="OrvexaBank"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className={styles.navLinks}>
                    {navLinks.map((link) => {
                        const sectionId = link.href.substring(1);

                        return (
                            <a
                                key={link.label}
                                href={getSectionUrl(link.href)}
                                onClick={() =>
                                    handleMobileSectionClick(link.href)
                                }
                                aria-current={
                                    location.pathname === "/" &&
                                    activeSection === sectionId
                                        ? "location"
                                        : undefined
                                }
                                className={
                                    location.pathname === "/" &&
                                    activeSection === sectionId
                                        ? styles.active
                                        : ""
                                }
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </div>

                {/* DESKTOP BUTTONS */}
                <div className={styles.navButtons}>
                    <Link
                        to="/login"
                        className={styles.loginBtn}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className={styles.registerBtn}
                    >
                        Open Account
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    type="button"
                    className={styles.mobileMenuBtn}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                >
                    {menuOpen ? (
                        <X size={25} />
                    ) : (
                        <Menu size={25} />
                    )}
                </button>
            </div>

            {/* MOBILE NAVIGATION */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        className={styles.mobileNavigation}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.mobileNavLinks}>
                            {navLinks.map((link) => {
                                const sectionId = link.href.substring(1);

                                return (
                                    <a
                                        key={link.label}
                                        href={getSectionUrl(link.href)}
                                        onClick={closeMenu}
                                        aria-current={
                                            location.pathname === "/" &&
                                            activeSection === sectionId
                                                ? "location"
                                                : undefined
                                        }
                                        className={
                                            location.pathname === "/" &&
                                            activeSection === sectionId
                                                ? styles.active
                                                : ""
                                        }
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </div>

                        {/* MOBILE BUTTONS */}
                        <div className={styles.mobileNavButtons}>
                            <Link
                                to="/login"
                                className={styles.mobileLoginBtn}
                                onClick={closeMenu}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className={styles.mobileRegisterBtn}
                                onClick={closeMenu}
                            >
                                Open Account
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
