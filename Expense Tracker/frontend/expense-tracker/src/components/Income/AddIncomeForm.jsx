import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!income.source || !income.amount || !income.date) {
      alert("Please fill in all required fields.");
      return;
    }

    if (onAddIncome && typeof onAddIncome === "function") {
      onAddIncome({
        ...income,
        amount: Number(income.amount), // Ensure numeric amount
      });

      // Reset form after submission
      setIncome({ source: "", amount: "", date: "", icon: "" });
    }
  };

  return (
    <div>
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Income Source */}
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      {/* Amount */}
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount (ETB)"
        placeholder="Enter amount"
        type="number"
      />

      {/* Date */}
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder="Select date"
        type="date"
      />

      {/* Submit button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
