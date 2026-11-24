
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    CreditCard,
    ArrowRight,
    Send,
    History,
    Headphones,
    ShieldCheck,
    MoreHorizontal,
    CalendarDays,
    Activity,
} from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
} from "recharts";

import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

// Sample preview data. Replace with API response data later.
const monthlyData = [
    { month: "Jun", income: 45000, expenses: 18000 },
    { month: "Jul", income: 52000, expenses: 22000 },
    { month: "Aug", income: 48000, expenses: 25000 },
    { month: "Sep", income: 60000, expenses: 30000 },
    { month: "Oct", income: 55000, expenses: 27000 },
    { month: "Nov", income: 65000, expenses: 32000 },
];

const balanceData = [
    { date: "01 Nov", balance: 25000 },
    { date: "05 Nov", balance: 32000 },
    { date: "10 Nov", balance: 28000 },
    { date: "15 Nov", balance: 41000 },
    { date: "20 Nov", balance: 38000 },
    { date: "23 Nov", balance: 50000 },
];

const summaryCards = [
    {
        title: "Total Balance",
        amount: "₹ —",
        change: "Across all accounts",
        icon: Wallet,
        color: "blue",
    },
    {
        title: "Monthly Income",
        amount: "₹ —",
        change: "This month",
        icon: TrendingUp,
        color: "green",
    },
    {
        title: "Monthly Expenses",
        amount: "₹ —",
        change: "This month",
        icon: TrendingDown,
        color: "orange",
    },
    {
        title: "Total Accounts",
        amount: "—",
        change: "Active accounts",
        icon: CreditCard,
        color: "purple",
    },
];

const quickActions = [
    {
        title: "Transfer Money",
        description: "Send money securely",
        icon: Send,
        path: "/transfer",
        color: "blue",
    },
    {
        title: "My Accounts",
        description: "View account details",
        icon: Wallet,
        path: "/accounts",
        color: "green",
    },
    {
        title: "Transactions",
        description: "View transaction history",
        icon: History,
        path: "/transactions",
        color: "purple",
    },
    {
        title: "Get Support",
        description: "We're here to help",
        icon: Headphones,
        path: "/support",
        color: "orange",
    },
];

const Dashboard = () => {
    const currentDate = new Date();

    const greeting =
        currentDate.getHours() < 12
            ? "Good morning"
            : currentDate.getHours() < 17
              ? "Good afternoon"
              : "Good evening";

    const formattedDate = currentDate.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <main className={styles.dashboard}>
            {/* Welcome Section */}
            <section className={styles.welcomeSection}>
                <div>
                    <p className={styles.welcomeLabel}>{greeting},</p>
                    <h1>Welcome to NovaBank</h1>
                    <p className={styles.welcomeDescription}>
                        Here's an overview of your financial activity.
                    </p>
                </div>

                <div className={styles.dateContainer}>
                    <CalendarDays size={17} />
                    <span>{formattedDate}</span>
                </div>
            </section>

            {/* Financial Summary */}
            <section className={styles.summaryGrid}>
                {summaryCards.map((item) => {
                    const Icon = item.icon;

                    return (
                        <article
                            className={styles.summaryCard}
                            key={item.title}
                        >
                            <div className={styles.summaryTop}>
                                <div
                                    className={`${styles.summaryIcon} ${styles[item.color]}`}
                                >
                                    <Icon size={21} />
                                </div>
                                <button
                                    className={styles.moreButton}
                                    type="button"
                                    aria-label={`More about ${item.title}`}
                                    disabled
                                >
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            <p className={styles.summaryTitle}>{item.title}</p>
                            <h2 className={styles.summaryAmount}>
                                {item.amount}
                            </h2>
                            <p className={styles.summaryDescription}>
                                {item.change}
                            </p>
                        </article>
                    );
                })}
            </section>

            {/* Quick Actions */}
            <section className={styles.section}>
                <div className={styles.sectionHeading}>
                    <div>
                        <h2>Quick Actions</h2>
                        <p>Manage your banking activities easily.</p>
                    </div>
                </div>

                <div className={styles.quickActionsGrid}>
                    {quickActions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <Link
                                to={action.path}
                                className={styles.actionCard}
                                key={action.title}
                            >
                                <div
                                    className={`${styles.actionIcon} ${styles[action.color]}`}
                                >
                                    <Icon size={21} />
                                </div>

                                <div className={styles.actionContent}>
                                    <h3>{action.title}</h3>
                                    <p>{action.description}</p>
                                </div>

                                <ArrowRight
                                    size={18}
                                    className={styles.actionArrow}
                                />
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Financial Charts */}
            <section className={styles.chartsGrid}>
                <article className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <div>
                            <h2>Income vs. Expenses</h2>
                            <p>Your monthly financial overview</p>
                        </div>

                        <span className={styles.chartPeriod}>Last 6 months</span>
                    </div>

                    <div className={styles.chartLegend}>
                        <span>
                            <i className={styles.incomeDot} />
                            Income
                        </span>
                        <span>
                            <i className={styles.expenseDot} />
                            Expenses
                        </span>
                    </div>

                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={monthlyData}
                                margin={{
                                    top: 10,
                                    right: 8,
                                    left: -15,
                                    bottom: 0,
                                }}
                                barGap={8}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#edf0f5"
                                />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#8792a5", fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#8792a5", fontSize: 11 }}
                                    tickFormatter={(value) =>
                                        `₹${value / 1000}k`
                                    }
                                />
                                <Tooltip
                                    formatter={(value) => [
                                        `₹${Number(value).toLocaleString("en-IN")}`,
                                    ]}
                                    contentStyle={{
                                        borderRadius: 10,
                                        border: "1px solid #edf0f5",
                                    }}
                                />
                                <Bar
                                    dataKey="income"
                                    name="Income"
                                    fill="#3978e8"
                                    radius={[5, 5, 0, 0]}
                                    maxBarSize={22}
                                />
                                <Bar
                                    dataKey="expenses"
                                    name="Expenses"
                                    fill="#f3a34b"
                                    radius={[5, 5, 0, 0]}
                                    maxBarSize={22}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <p className={styles.sampleNote}>
                        Sample chart data for UI preview
                    </p>
                </article>

                <article className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <div>
                            <h2>Balance Trend</h2>
                            <p>Track your account balance over time</p>
                        </div>

                        <span className={styles.chartPeriod}>This month</span>
                    </div>

                    <div className={styles.balanceHighlight}>
                        <div>
                            <span>Current balance preview</span>
                            <h3>₹50,000</h3>
                        </div>
                        <div className={styles.balanceTrendIcon}>
                            <Activity size={19} />
                        </div>
                    </div>

                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={balanceData}
                                margin={{
                                    top: 10,
                                    right: 8,
                                    left: -15,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="balanceGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#3978e8"
                                            stopOpacity={0.22}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#3978e8"
                                            stopOpacity={0.01}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#edf0f5"
                                />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#8792a5", fontSize: 11 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#8792a5", fontSize: 11 }}
                                    tickFormatter={(value) =>
                                        `₹${value / 1000}k`
                                    }
                                />
                                <Tooltip
                                    formatter={(value) => [
                                        `₹${Number(value).toLocaleString("en-IN")}`,
                                        "Balance",
                                    ]}
                                    contentStyle={{
                                        borderRadius: 10,
                                        border: "1px solid #edf0f5",
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="balance"
                                    stroke="#3978e8"
                                    strokeWidth={2.5}
                                    fill="url(#balanceGradient)"
                                    activeDot={{ r: 5 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <p className={styles.sampleNote}>
                        Sample chart data for UI preview
                    </p>
                </article>
            </section>

            {/* Accounts and Recent Transactions */}
            <section className={styles.bottomGrid}>
                <article className={styles.accountsCard}>
                    <div className={styles.sectionCardHeader}>
                        <div>
                            <h2>My Accounts</h2>
                            <p>Your banking accounts at a glance.</p>
                        </div>

                        <Link to="/accounts" className={styles.viewAllLink}>
                            View all <ArrowRight size={15} />
                        </Link>
                    </div>

                    <div className={styles.bankCard}>
                        <div className={styles.bankCardTop}>
                            <span className={styles.bankCardName}>
                                NOVABANK
                            </span>
                            <CreditCard size={25} />
                        </div>

                        <div className={styles.bankCardChip}>
                            <div />
                        </div>

                        <div className={styles.bankCardBottom}>
                            <div>
                                <span>Account Number</span>
                                <strong>•••• •••• ••••</strong>
                            </div>
                            <div className={styles.bankCardBalance}>
                                <span>Available Balance</span>
                                <strong>₹ —</strong>
                            </div>
                        </div>
                    </div>

                    <div className={styles.accountFooter}>
                        <div className={styles.accountStatus}>
                            <span className={styles.statusDot} />
                            Account information will appear here
                        </div>

                        <Link to="/accounts" className={styles.accountLink}>
                            Manage accounts <ArrowRight size={15} />
                        </Link>
                    </div>
                </article>

                <article className={styles.transactionsCard}>
                    <div className={styles.sectionCardHeader}>
                        <div>
                            <h2>Recent Transactions</h2>
                            <p>Your latest account activity.</p>
                        </div>

                        <Link
                            to="/transactions"
                            className={styles.viewAllLink}
                        >
                            View all <ArrowRight size={15} />
                        </Link>
                    </div>

                    <div className={styles.emptyTransactions}>
                        <div className={styles.emptyIcon}>
                            <History size={25} />
                        </div>

                        <h3>No transactions yet</h3>
                        <p>
                            Your recent transactions will appear here once
                            you start using your account.
                        </p>

                        <Link
                            to="/transactions"
                            className={styles.emptyAction}
                        >
                            View transaction history
                        </Link>
                    </div>
                </article>
            </section>

            {/* Security Section */}
            <section className={styles.securityBanner}>
                <div className={styles.securityIcon}>
                    <ShieldCheck size={25} />
                </div>

                <div className={styles.securityContent}>
                    <h3>Your security matters to us</h3>
                    <p>
                        Keep your login credentials private and never share
                        your OTP or password with anyone.
                    </p>
                </div>

                <Link to="/security" className={styles.securityLink}>
                    Security settings <ArrowRight size={16} />
                </Link>
            </section>
        </main>
    );
};

export default Dashboard;
