import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShieldCheck,
  Bell,
  CreditCard,
  Clock3,
  LockKeyhole,
  ChartNoAxesCombined,
  CheckCircle2,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion, MotionConfig } from "motion/react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Home.module.css";
import Footer from "../../components/footer/Footer";

const services: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Wallet,
    title: "Smart Account Management",
    description:
      "View your account information, monitor balances and manage your banking activities from one place.",
  },
  {
    icon: ArrowUpRight,
    title: "Easy Money Transfers",
    description:
      "Move money with a simple and convenient digital transfer experience.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Transaction Tracking",
    description:
      "Keep track of deposits, withdrawals and transfers with organized transaction history.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Stay informed about account activities and important transaction updates.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const features = [
  "Simple digital banking experience",
  "Convenient account management",
  "Transaction activity tracking",
  "Timely account notifications",
];

const previewAccounts = [
  {
    type: "Savings Account",
    number: "1234",
    balance: "₹1,00,000.00",
    icon: Wallet,
    tone: "savings",
  },
  {
    type: "Current Account",
    number: "5678",
    balance: "₹75,000.00",
    icon: CreditCard,
    tone: "current",
  },
  {
    type: "Savings Account",
    number: "9012",
    balance: "₹25,000.00",
    icon: Wallet,
    tone: "savings",
  },
];

function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.homePage}>
        <Navbar />

        <main>
          {/* HERO SECTION */}

          <section className={styles.hero} id="home">
            <div className={styles.heroContainer}>
              <motion.div
                className={styles.heroContent}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div className={styles.heroBadge} variants={fadeUp}>
                  <span className={styles.badgeDot} />
                  YOUR BANKING, REIMAGINED
                </motion.div>

                <motion.h1 variants={fadeUp}>
                  Banking that moves
                  <br />
                  <span>with your life.</span>
                </motion.h1>

                <motion.p className={styles.heroDescription} variants={fadeUp}>
                  Experience a smarter way to manage your money. Access your
                  accounts, make transfers and stay connected to your finances
                  through one simple digital banking experience.
                </motion.p>

                <motion.div className={styles.heroActions} variants={fadeUp}>
                  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/register" className={styles.primaryBtn}>
                      Open an Account
                      <ArrowRight size={18} />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/login" className={styles.secondaryBtn}>
                      Sign In
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div className={styles.heroTrust} variants={fadeUp}>
                  <div className={styles.trustItem}>
                    <ShieldCheck size={19} />
                    <span>Security-conscious banking</span>
                  </div>

                  <div className={styles.trustItem}>
                    <Clock3 size={19} />
                    <span>Banking at your convenience</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* BANKING DASHBOARD PREVIEW */}

              <motion.div
                className={styles.heroVisual}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              >
                <div className={styles.visualGlow} />

                <motion.div
                  className={`${styles.floatingLabel} ${styles.labelTop}`}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className={styles.floatingIcon}>
                    <ArrowDownLeft size={19} />
                  </div>
                  <div>
                    <strong>Money received</strong>
                    <span>Transaction update</span>
                  </div>
                  <CheckCircle2 className={styles.successIcon} size={19} />
                </motion.div>

                <div className={styles.previewDashboard}>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewBrand}>
                      {/* <div className={styles.previewLogo}>O</div> */}
                      <img
                        src="public/favicon.png"
                        className={styles.previewLogo}
                        alt="OrvexaBank Logo"
                      />
                      <strong>OrvexaBank</strong>
                    </div>
                    <div className={styles.previewNotification}>
                      <Bell size={17} />
                      <span />
                    </div>
                  </div>

                  <div className={styles.previewGreeting}>
                    <span>SAMPLE DASHBOARD</span>
                    <div className={styles.previewGreetingTitle}>
                      Your finances, at a glance.
                    </div>
                  </div>

                  <div className={styles.previewBalance}>
                    <div className={styles.previewBalanceHeading}>
                      <span>TOTAL AVAILABLE BALANCE</span>
                      <div className={styles.balanceWallet}>
                        <Wallet size={19} />
                      </div>
                    </div>
                    <div className={styles.previewBalanceAmount}>
                      ₹2,00,000.00
                    </div>
                    <div className={styles.balanceFooter}>
                      <span>Across 3 active accounts</span>
                    </div>
                  </div>

                  <div className={styles.previewAccounts}>
                    <div className={styles.previewSectionHeading}>
                      <strong>My Accounts</strong>
                      <span>3 ACTIVE</span>
                    </div>

                    <div className={styles.previewAccountList}>
                      {previewAccounts.map((account) => {
                        const AccountIcon = account.icon;

                        return (
                          <div
                            className={`${styles.previewAccount} ${
                              account.tone === "current" ? styles.current : ""
                            }`}
                            key={account.number}
                          >
                            <div
                              className={`${styles.accountTypeIcon} ${
                                account.tone === "current"
                                  ? styles.current
                                  : styles.savings
                              }`}
                            >
                              <AccountIcon size={16} />
                            </div>
                            <div className={styles.previewAccountDetails}>
                              <strong>{account.type}</strong>
                              <span>**** {account.number}</span>
                            </div>
                            <div className={styles.previewAccountBalance}>
                              <strong>{account.balance}</strong>
                              <span className={styles.activeStatus}>
                                <span />
                                Active
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.previewQuickActions}>
                    <div className={styles.previewSectionHeading}>
                      <strong>Quick actions</strong>
                    </div>

                    <div className={styles.previewActions}>
                      <div>
                        <div className={styles.actionIcon}>
                          <ArrowDownLeft />
                        </div>
                        <span>Receive</span>
                      </div>

                      <div>
                        <div className={styles.actionIcon}>
                          <ArrowUpRight />
                        </div>
                        <span>Transfer</span>
                      </div>

                      <div>
                        <div className={styles.actionIcon}>
                          <CreditCard />
                        </div>
                        <span>Accounts</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.previewActivity}>
                    <div className={styles.activityHeading}>
                      <strong>Recent activity</strong>
                      <span>Sample</span>
                    </div>

                    <div className={styles.activityRow}>
                      <div
                        className={`${styles.activityIcon} ${styles.income}`}
                      >
                        <ArrowDownLeft size={17} />
                      </div>
                      <div className={styles.activityDetails}>
                        <strong>Money received</strong>
                        <span>Today · 10:30 AM</span>
                      </div>
                      <strong className={styles.incomeAmount}>+₹5,000</strong>
                    </div>

                    <div className={styles.activityRow}>
                      <div
                        className={styles.activityIcon + " " + styles.expense}
                      >
                        <ArrowUpRight size={17} />
                      </div>
                      <div className={styles.activityDetails}>
                        <strong>Online payment</strong>
                        <span>Yesterday · 04:15 PM</span>
                      </div>
                      <strong className={styles.expenseAmount}>-₹1,200</strong>
                    </div>
                  </div>
                </div>

                <motion.div
                  className={styles.floatingLabel + " " + styles.labelBottom}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 1 }}
                >
                  <div
                    className={
                      styles.floatingIcon + " " + styles.securityFloating
                    }
                  >
                    <ShieldCheck size={21} />
                  </div>
                  <div>
                    <strong>Your security matters</strong>
                    <span>Protected account access</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SERVICES */}

          <section
            className={styles.servicesSection}
            id="services"
            aria-labelledby="services-heading"
          >
            <div className={styles.sectionContainer}>
              <motion.div
                className={styles.sectionHeading}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                <span className={styles.sectionEyebrow}>BANKING SERVICES</span>
                <h2 id="services-heading">
                  Everything you need.
                  <br />
                  <span>All in one place.</span>
                </h2>
                <p>
                  Manage your everyday banking activities with convenient
                  digital tools designed around you.
                </p>
              </motion.div>

              <motion.div
                className={styles.serviceGrid}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
              >
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <motion.article
                      className={styles.serviceCard}
                      key={service.title}
                      variants={cardAnimation}
                      whileHover={{
                        y: -8,
                        transition: {
                          duration: 0.25,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <div className={styles.serviceIcon} aria-hidden="true">
                        <Icon size={25} />
                      </div>

                      <h3>{service.title}</h3>

                      <p>{service.description}</p>

                      <Link to="/login" className={styles.serviceLink}>
                        Explore banking
                        <ArrowRight size={16} />
                      </Link>
                    </motion.article>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* WHY ORVEXABANK */}

          <section className={styles.whySection} id="about">
            <div className={styles.whyContainer}>
              <motion.div
                className={styles.whyVisual}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={fadeUp}
              >
                <div className={styles.whyCard}>
                  <div className={styles.whyCardTop}>
                    <div className={styles.previewLogo}>N</div>
                    <span>ORVEXABANK</span>
                  </div>

                  <div className={styles.whyCardContent}>
                    <span>YOUR FINANCES</span>
                    <div className={styles.whyCardTitle}>
                      One experience.
                      <br />
                      More possibilities.
                    </div>
                  </div>

                  <div className={styles.whyCardBottom}>
                    <span>Digital Banking</span>
                    <ShieldCheck size={23} />
                  </div>
                </div>

                <div className={styles.whyStat}>
                  <LockKeyhole size={21} />
                  <div>
                    <strong>Security focused</strong>
                    <span>Designed with account protection in mind</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={styles.whyContent}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.span
                  className={styles.sectionEyebrow}
                  variants={fadeUp}
                >
                  WHY ORVEXABANK
                </motion.span>

                <motion.h2 variants={fadeUp}>
                  Banking should feel
                  <span> effortless.</span>
                </motion.h2>

                <motion.p variants={fadeUp}>
                  Your financial activities deserve a simple, transparent and
                  convenient experience. Orvexabank brings your everyday banking
                  essentials together in one place.
                </motion.p>

                <motion.div
                  className={styles.featureList}
                  variants={staggerContainer}
                >
                  {features.map((feature) => (
                    <motion.div
                      className={styles.featureItem}
                      key={feature}
                      variants={fadeUp}
                    >
                      <CheckCircle2 size={19} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Link to="/register" className={styles.primaryBtn}>
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECURITY SECTION */}

          <section className={styles.securitySection}>
            <motion.div
              className={styles.securityContainer}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div className={styles.securityIcon} variants={fadeUp}>
                <ShieldCheck size={34} />
              </motion.div>

              <motion.div variants={fadeUp}>
                <span className={styles.sectionEyebrow}>
                  SECURITY AND CONTROL
                </span>
                <h2>Your banking experience deserves protection.</h2>
                <p>
                  Access your account through authenticated sessions and stay
                  informed about important account activities.
                </p>
              </motion.div>

              <motion.div className={styles.securityFeatures} variants={fadeUp}>
                <div>
                  <LockKeyhole />
                  <span>Secure authentication</span>
                </div>
                <div>
                  <Bell />
                  <span>Account activity updates</span>
                </div>
                <div>
                  <Smartphone />
                  <span>Convenient digital access</span>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* FINAL CTA */}

          <section className={styles.ctaSection}>
            <motion.div
              className={styles.ctaContent}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
            >
              <motion.span variants={fadeUp}>
                YOUR NEXT CHAPTER STARTS HERE
              </motion.span>

              <motion.h2 variants={fadeUp}>
                Ready for a better
                <br />
                banking experience?
              </motion.h2>

              <motion.p variants={fadeUp}>
                Get started with Orvexabank and explore a more convenient way to
                manage your finances.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link to="/register" className={styles.ctaButton}>
                  Open Your Account
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default Home;
