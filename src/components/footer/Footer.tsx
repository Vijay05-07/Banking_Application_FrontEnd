
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import {
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

const socialLinks = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/",
        icon: FaLinkedinIn,
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/",
        icon: FaInstagram,
    },
    {
        name: "X",
        url: "https://x.com/",
        icon: FaXTwitter,
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/",
        icon: FaYoutube,
    },
];

const footerVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: "easeOut" as const,
        },
    },
};

function Footer() {
    const shouldReduceMotion = useReducedMotion();

    const animation = shouldReduceMotion
        ? {}
        : {
              initial: "hidden" as const,
              whileInView: "visible" as const,
              viewport: { once: false, amount: 0.15 },
              variants: footerVariants,
          };

    return (
        <footer className={styles.footer} id="contact">
            <div className={styles.footerContainer}>

                <motion.div
                    className={styles.footerMain}
                    {...animation}
                >
                    {/* Brand Section */}
                    <div className={styles.footerBrand}>

                        <Link to="/" className={styles.footerLogo}>
                            {/* <span className={styles.footerLogoIcon}>O</span> */}
                            <img src="public/favicon.png" className={styles.footerLogoIcon} alt="OrvexaBank Logo" />
                            <span>OrvexaBank</span>
                        </Link>

                        <p>
                            Banking made simple, secure and convenient.
                            Manage your finances with confidence through
                            a smarter digital banking experience.
                        </p>

                        <div className={styles.footerSecurity}>
                            <ShieldCheck size={17} />
                            <span>Your security matters</span>
                        </div>

                        {/* Social Media Links */}
                        <div className={styles.socialLinks}>
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <motion.a
                                        key={item.name}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.name}
                                        className={styles.socialLink}
                                        whileHover={
                                            shouldReduceMotion
                                                ? undefined
                                                : {
                                                      y: -5,
                                                      scale: 1.08,
                                                  }
                                        }
                                        whileTap={
                                            shouldReduceMotion
                                                ? undefined
                                                : { scale: 0.94 }
                                        }
                                    >
                                        <Icon size={17} />
                                    </motion.a>
                                );
                            })}
                        </div>

                    </div>

                    {/* Footer Navigation */}
                    <nav
                        className={styles.footerLinks}
                        aria-label="Footer navigation"
                    >

                        <div className={styles.footerColumn}>
                            <h3>Explore</h3>
                            <a href="/#home">Home</a>
                            <a href="/#services">Services</a>
                            <a href="/#about">About Us</a>
                            <a href="/#contact">Contact</a>
                        </div>

                        <div className={styles.footerColumn}>
                            <h3>Account</h3>
                            <Link to="/login">Sign In</Link>
                            <Link to="/register">Open an Account</Link>
                        </div>

                        <div className={styles.footerColumn}>
                            <h3>Our Services</h3>
                            <a href="/#services">Account Management</a>
                            <a href="/#services">Money Transfers</a>
                            <a href="/#services">Transaction Tracking</a>
                        </div>

                    </nav>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    className={styles.footerBottom}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                    whileInView={
                        shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >

                    <p>
                        © {new Date().getFullYear()} OrvexaBank.
                        All rights reserved.
                    </p>

                    <a href="/#home" className={styles.footerBackTop}>
                        Back to top
                        <ArrowUpRight size={16} />
                    </a>

                </motion.div>

            </div>
        </footer>
    );
}

export default Footer;
