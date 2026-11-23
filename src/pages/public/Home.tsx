import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock3,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Wallet,
  ChartNoAxesCombined,
  type LucideIcon,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion, MotionConfig, type Variants } from "motion/react";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import styles from "./Home.module.css";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type PreviewAccount = {
  type: string;
  number: string;
  balance: string;
  icon: LucideIcon;
  tone: "savings" | "current";
};

const services: Service[] = [
  {
    icon: Wallet,
    title: "Account management",
    description:
      "View your account information, check balances and keep your banking activities organized in one place.",
  },
  {
    icon: ArrowUpRight,
    title: "Simple money transfers",
    description:
      "Move money through a straightforward digital transfer experience designed for everyday banking.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Transaction history",
    description:
      "Review deposits, withdrawals and transfers with a clear view of your recent account activity.",
  },
  {
    icon: Bell,
    title: "Timely notifications",
    description:
      "Stay informed with updates about important account activities and transaction events.",
  },
];

const benefits = [
  "A clear view of your financial activities",
  "Convenient access to everyday banking",
  "Organized account and transaction information",
  "Timely updates about important activities",
];

const previewAccounts: PreviewAccount[] = [
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

const securityFeatures = [
  {
    icon: LockKeyhole,
    title: "Secure authentication",
    description:
      "Authenticated sessions help protect access to customer accounts.",
  },
  {
    icon: ShieldCheck,
    title: "Account protection",
    description:
      "Account access and important actions are handled through controlled flows.",
  },
  {
    icon: Bell,
    title: "Activity notifications",
    description:
      "Stay aware of important account and transaction updates.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardAnimation: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.homePage}>
        <Navbar />

        <main>
          {/* HERO */}
          <section className={styles.hero} id="home">
            <div className={styles.heroContainer}>
              <motion.div
                className={styles.heroContent}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.div className={styles.heroBadge} variants={fadeUp}>
                  <span className={styles.badgeDot} />
                  DIGITAL BANKING, MADE CLEARER
                </motion.div>

                <motion.h1 variants={fadeUp}>
                  Banking that moves
                  <br />
                  <span>with your life.</span>
                </motion.h1>

                <motion.p
                  className={styles.heroDescription}
                  variants={fadeUp}
                >
                  A simpler way to stay connected to your money. View your
                  accounts, manage transfers and keep track of your financial
                  activity through one convenient digital banking experience.
                </motion.p>

                <motion.div className={styles.heroActions} variants={fadeUp}>
                  <Link to="/register" className={styles.primaryBtn}>
                    Open an account
                    <ArrowRight size={18} />
                  </Link>

                  <Link to="/login" className={styles.secondaryBtn}>
                    Sign in
                  </Link>
                </motion.div>

                <motion.div className={styles.heroTrust} variants={fadeUp}>
                  <div className={styles.trustItem}>
                    <ShieldCheck size={18} />
                    <span>Security-conscious access</span>
                  </div>
                  <div className={styles.trustItem}>
                    <Clock3 size={18} />
                    <span>Banking at your convenience</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Product preview: illustrative data only */}
              <motion.div
                className={styles.heroVisual}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
              >
                <div className={styles.visualGlow} aria-hidden="true" />

                <motion.div
                  className={`${styles.floatingLabel} ${styles.labelTop}`}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.45 }}
                >
                  <div className={styles.floatingIcon}>
                    <ArrowDownLeft size={19} />
                  </div>
                  <div>
                    <strong>Money received</strong>
                    <span>Illustrative transaction</span>
                  </div>
                  <CheckCircle2 className={styles.successIcon} size={19} />
                </motion.div>

                <div className={styles.previewDashboard}>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewBrand}>
                      <img
                        src="/favicon.png"
                        className={styles.previewLogo}
                        alt=""
                        aria-hidden="true"
                      />
                      <strong>OrvexaBank</strong>
                    </div>
                    <div
                      className={styles.previewNotification}
                      aria-label="Sample notifications"
                    >
                      <Bell size={17} />
                      <span />
                    </div>
                  </div>

                  <div className={styles.previewGreeting}>
                    <span>ILLUSTRATIVE DASHBOARD</span>
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
                      <span>Across 3 sample accounts</span>
                      <span className={styles.demoTag}>DEMO</span>
                    </div>
                  </div>

                  <div className={styles.previewAccounts}>
                    <div className={styles.previewSectionHeading}>
                      <strong>My accounts</strong>
                      <span>3 SAMPLE</span>
                    </div>

                    <div className={styles.previewAccountList}>
                      {previewAccounts.map((account) => {
                        const AccountIcon = account.icon;

                        return (
                          <div
                            className={styles.previewAccount}
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
                              <span>•••• {account.number}</span>
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
                          <ArrowDownLeft size={19} />
                        </div>
                        <span>Receive</span>
                      </div>
                      <div>
                        <div className={styles.actionIcon}>
                          <ArrowUpRight size={19} />
                        </div>
                        <span>Transfer</span>
                      </div>
                      <div>
                        <div className={styles.actionIcon}>
                          <CreditCard size={19} />
                        </div>
                        <span>Accounts</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.previewActivity}>
                    <div className={styles.activityHeading}>
                      <strong>Recent activity</strong>
                      <span>Sample data</span>
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
                        className={`${styles.activityIcon} ${styles.expense}`}
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
                  className={`${styles.floatingLabel} ${styles.labelBottom}`}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.6 }}
                >
                  <div
                    className={`${styles.floatingIcon} ${styles.securityFloating}`}
                  >
                    <ShieldCheck size={21} />
                  </div>
                  <div>
                    <strong>Security matters</strong>
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
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className={styles.sectionEyebrow}>BANKING SERVICES</span>
                <h2 id="services-heading">
                  Everyday banking.
                  <br />
                  <span>All in one place.</span>
                </h2>
                <p>
                  The essential tools to help you manage your accounts and
                  follow your financial activity with confidence.
                </p>
              </motion.div>

              <motion.div
                className={styles.serviceGrid}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
              >
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <motion.article
                      className={styles.serviceCard}
                      key={service.title}
                      variants={cardAnimation}
                      whileHover={{ y: -6 }}
                    >
                      <div className={styles.serviceIcon} aria-hidden="true">
                        <Icon size={25} />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <Link to="/login" className={styles.serviceLink}>
                        Sign in to explore
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
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.whyOrb} aria-hidden="true" />

                <div className={styles.whyCard}>
                  <div className={styles.whyCardTop}>
                    <div className={styles.whyBrand}>
                      <img src="/favicon.png" alt="" aria-hidden="true" />
                      <span>ORVEXABANK</span>
                    </div>
                    <ShieldCheck size={21} />
                  </div>

                  <div className={styles.whyCardContent}>
                    <span>YOUR FINANCES</span>
                    <div className={styles.whyCardTitle}>
                      Clarity for your
                      <br />
                      everyday banking.
                    </div>
                    <div className={styles.whyCardLine} />
                  </div>

                  <div className={styles.whyCardBottom}>
                    <span>Digital banking experience</span>
                    <span className={styles.whyCardDots}>•••• 2026</span>
                  </div>
                </div>

                <div className={styles.whyStat}>
                  <div className={styles.whyStatIcon}>
                    <LockKeyhole size={20} />
                  </div>
                  <div>
                    <strong>Security focused</strong>
                    <span>Designed with account protection in mind</span>
                  </div>
                  <CheckCircle2 size={18} className={styles.whyStatCheck} />
                </div>

                <div className={styles.whyMiniCard}>
                  <div className={styles.whyMiniIcon}>
                    <ChartNoAxesCombined size={18} />
                  </div>
                  <div>
                    <strong>Stay informed</strong>
                    <span>Account activity at a glance</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={styles.whyContent}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
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
                  convenient experience. OrvexaBank brings everyday banking
                  essentials together in one place.
                </motion.p>

                <motion.div
                  className={styles.featureList}
                  variants={staggerContainer}
                >
                  {benefits.map((benefit) => (
                    <motion.div
                      className={styles.featureItem}
                      key={benefit}
                      variants={fadeUp}
                    >
                      <CheckCircle2 size={19} />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Link to="/register" className={styles.primaryBtn}>
                    Get started
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* SECURITY */}
          <section
            className={styles.securitySection}
            aria-labelledby="security-heading"
          >
            <div className={styles.securityContainer}>
              <motion.div
                className={styles.securityHeading}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className={styles.securityIcon}>
                  <ShieldCheck size={32} />
                </div>
                <span className={styles.sectionEyebrow}>
                  SECURITY AND CONTROL
                </span>
                <h2 id="security-heading">
                  Your banking experience deserves protection.
                </h2>
                <p>
                  Access your account through authenticated sessions and stay
                  informed about important account activities.
                </p>
              </motion.div>

              <motion.div
                className={styles.securityGrid}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {securityFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <motion.article
                      className={styles.securityCard}
                      key={feature.title}
                      variants={cardAnimation}
                      whileHover={{ y: -5 }}
                    >
                      <div className={styles.securityCardIcon}>
                        <Icon size={23} />
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </motion.article>
                  );
                })}
              </motion.div>

              <p className={styles.securityNote}>
                Security features depend on the services and controls enabled
                in your account.
              </p>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaGlow} aria-hidden="true" />
            <motion.div
              className={styles.ctaContent}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
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
                Get started with OrvexaBank and explore a more convenient way
                to manage your finances.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link to="/register" className={styles.ctaButton}>
                  Open your account
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
