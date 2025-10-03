const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String, // ✅ fixed
    },
    source: {
      type: String, // ✅ fixed
      required: true, // Example: Salary, Freelance, etc.
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date, // ✅ fixed typo
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
