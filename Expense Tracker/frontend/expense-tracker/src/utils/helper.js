import moment from "moment";

/**
 * Utility functions for validation, formatting, and chart preparation
 */

/** Validate email */
export const validateEmail = (email) => {
  if (typeof email !== "string" || !email.trim()) return false;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
};

/** Generate initials (first 2 words) */
export const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
};

/** Add thousands separator */
export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined || num === "") return "";
  const numberValue = typeof num === "string" ? parseFloat(num) : num;
  if (isNaN(numberValue)) return "";

  const isNegative = numberValue < 0;
  const [intPart, fracPart] = Math.abs(numberValue).toString().split(".");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const result = fracPart ? `${formattedInt}.${fracPart}` : formattedInt;
  return isNegative ? `-${result}` : result;
};

/** Format an amount as Ethiopian Birr, e.g. 12,450 -> "ETB 12,450" */
export const formatMoney = (amount) => {
  const n = typeof amount === "string" ? parseFloat(amount) : Number(amount);
  const safe = Number.isFinite(n) ? n : 0;
  const hasCents = Math.abs(safe % 1) > 0;
  return `ETB ${safe.toLocaleString("en-US", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
};

/** Format as currency */
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  const numberValue = typeof amount === "string" ? parseFloat(amount) : amount;
  const safeValue = !isNaN(numberValue) ? numberValue : 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeValue);
};

/** Prepare expense bar chart data, aggregated by category */
export const prepareExpenseBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  const categoryTotals = {};
  data.forEach((item) => {
    if (!item || typeof item !== "object") return;
    const amount = Number(item.amount);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const category =
      (typeof item.category === "string" && item.category.trim()) ||
      (typeof item.name === "string" && item.name.trim()) ||
      "Other";
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  return Object.entries(categoryTotals)
    .map(([category, amount], index) => ({
      category,
      amount,
      color: getChartColor(index, "expense"),
    }))
    .sort((a, b) => b.amount - a.amount);
};

/** Prepare income bar/timeline chart data */
export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data)) return { labels: [], datasets: [] };

  const validData = data
    .filter((item) => {
      const dateField = item?.date || item?.createdAt || item?.transactionDate;
      return (
        dateField && moment(dateField).isValid() && Number(item?.amount) > 0
      );
    })
    .sort(
      (a, b) =>
        moment(a.date || a.createdAt || a.transactionDate) -
        moment(b.date || b.createdAt || b.transactionDate)
    );

  if (validData.length === 0) return { labels: [], datasets: [] };

  const monthlyTotals = {};
  validData.forEach((item) => {
    const date = moment(item.date || item.createdAt || item.transactionDate);
    const key = date.format("MMM YYYY");
    monthlyTotals[key] = (monthlyTotals[key] || 0) + Number(item.amount);
  });

  const labels = Object.keys(monthlyTotals).sort(
    (a, b) => moment(a, "MMM YYYY") - moment(b, "MMM YYYY")
  );

  return {
    labels,
    datasets: [
      {
        label: "Income",
        data: labels.map((m) => monthlyTotals[m]),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };
};

/** Prepare income pie chart data */
export const prepareIncomePieChartData = (data = [], totalIncome = 0) => {
  if (!Array.isArray(data)) return [];

  const sourceTotals = {};
  data.forEach((item) => {
    const source = item?.source || item?.category || "Other";
    const amount = Math.max(0, Number(item?.amount) || 0);
    sourceTotals[source] = (sourceTotals[source] || 0) + amount;
  });

  return Object.entries(sourceTotals)
    .map(([source, amount], index) => ({
      name: source,
      amount,
      percentage:
        totalIncome > 0 ? ((amount / totalIncome) * 100).toFixed(1) : 0,
      color: getChartColor(index, "income"),
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);
};

/** Chart color generator */
const getChartColor = (index, type = "default") => {
  const schemes = {
    expense: ["#e11d48", "#fb7185", "#fda4af", "#fecdd3", "#ffe4e6"],
    income: ["#059669", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"],
    default: ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1"],
  };
  const colors = schemes[type] || schemes.default;
  return colors[index % colors.length];
};

/** Format date */
export const formatDate = (date, format = "MMM DD, YYYY") => {
  const d = moment(date);
  return d.isValid() ? d.format(format) : "—";
};

/** Calculate total from array */
export const calculateTotal = (items = [], amountKey = "amount") =>
  Array.isArray(items)
    ? items.reduce(
        (sum, i) => sum + Math.max(0, Number(i?.[amountKey]) || 0),
        0
      )
    : 0;

/** Truncate text */
export const truncateText = (text, maxLength = 50, ellipsis = "...") =>
  typeof text === "string" && text.length > maxLength
    ? text.substring(0, maxLength - ellipsis.length) + ellipsis
    : text || "";

/** Prepare expense line chart data */
export const prepareExpenseLineChartData = (data = []) => {
  if (!Array.isArray(data)) return { labels: [], datasets: [] };

  const validData = data
    .filter((item) => {
      const dateField = item?.date || item?.createdAt || item?.transactionDate;
      return (
        dateField && moment(dateField).isValid() && Number(item?.amount) !== 0 // Allow negative amounts for expenses
      );
    })
    .sort(
      (a, b) =>
        moment(a.date || a.createdAt || a.transactionDate) -
        moment(b.date || b.createdAt || b.transactionDate)
    );

  if (validData.length === 0) return { labels: [], datasets: [] };

  const dailyTotals = {};
  validData.forEach((item) => {
    const date = moment(item.date || item.createdAt || item.transactionDate);
    const key = date.format("DD MMM"); // e.g., "02 Jan"
    dailyTotals[key] = (dailyTotals[key] || 0) + Number(item.amount);
  });

  const labels = Object.keys(dailyTotals).sort(
    (a, b) => moment(a, "DD MMM") - moment(b, "DD MMM")
  );

  return {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: labels.map((d) => dailyTotals[d]),
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};
