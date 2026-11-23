
import styles from "./Footer.module.css";

import { Link } from "react-router-dom";
import {
    ArrowUpRight,
    ShieldCheck,
} from "lucide-react";

import { motion, useReducedMotion } from "motion/react";

const footerVariants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const,
        },
    },
};

function Footer() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <footer className={styles.footer} id="contact">
            <div className={styles.footerContainer}>

                {/* MAIN FOOTER */}
                <motion.div
                    className={styles.footerMain}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={
                        shouldReduceMotion ? undefined : "visible"
                    }
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                    variants={footerVariants}
                >

                    {/* BRAND SECTION */}
                    <div className={styles.footerBrand}>

                        <Link
                            to="/"
                            className={styles.footerLogo}
                            aria-label="OrvexaBank home"
                        >
                            <img
                                src="/favicon.png"
                                className={styles.footerLogoIcon}
                                alt=""
                                aria-hidden="true"
                            />

                            <span>OrvexaBank</span>
                        </Link>

                        <p>
                            Banking made simple, secure and convenient.
                            Manage your finances with confidence through
                            a smarter digital banking experience.
                        </p>

                        <div className={styles.footerSecurity}>
                            <ShieldCheck size={18} />

                            <span>
                                Your security matters
                            </span>
                        </div>

                    </div>

                    {/* FOOTER NAVIGATION */}
                    <nav
                        className={styles.footerLinks}
                        aria-label="Footer navigation"
                    >

                        {/* EXPLORE */}
                        <div className={styles.footerColumn}>
                            <h3>Explore</h3>

                            <Link to="/#home">
                                Home
                            </Link>

                            <Link to="/#services">
                                Services
                            </Link>

                            <Link to="/#about">
                                About Us
                            </Link>

                            <Link to="/#contact">
                                Contact
                            </Link>
                        </div>

                        {/* ACCOUNT */}
                        <div className={styles.footerColumn}>
                            <h3>Account</h3>

                            <Link to="/login">
                                Sign In
                            </Link>

                            <Link to="/register">
                                Open an Account
                            </Link>
                        </div>

                        {/* SERVICES */}
                        <div className={styles.footerColumn}>
                            <h3>Our Services</h3>

                            <Link to="/#services">
                                Account Management
                            </Link>

                            <Link to="/#services">
                                Money Transfers
                            </Link>

                            <Link to="/#services">
                                Transaction History
                            </Link>

                            <Link to="/#services">
                                Notifications
                            </Link>
                        </div>

                    </nav>

                </motion.div>

                {/* FOOTER BOTTOM */}
                <motion.div
                    className={styles.footerBottom}
                    initial={
                        shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 15,
                            }
                    }
                    whileInView={
                        shouldReduceMotion
                            ? undefined
                            : {
                                opacity: 1,
                                y: 0,
                            }
                    }
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.1,
                    }}
                >

                    <p>
                        © {new Date().getFullYear()} OrvexaBank.
                        All rights reserved.
                    </p>

                    <Link
                        to="/#home"
                        className={styles.footerBackTop}
                    >
                        Back to top
                        <ArrowUpRight size={16} />
                    </Link>

                </motion.div>

            </div>
        </footer>
    );
}

export default Footer;
