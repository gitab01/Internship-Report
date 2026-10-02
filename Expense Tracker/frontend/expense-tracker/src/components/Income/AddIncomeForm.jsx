import { useState } from "react";
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

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const saved = await onAddIncome?.({
        ...income,
        amount: Number(income.amount),
      });
      if (saved) setIncome({ source: "", amount: "", date: "", icon: "" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-1">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Source"
        placeholder="Salary, Freelance, Gift…"
        type="text"
        required
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount (ETB)"
        placeholder="0"
        type="number"
        min="0"
        step="0.01"
        required
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
        required
      />

      <button
        type="submit"
        disabled={saving}
        className="add-btn w-full justify-center mt-2 disabled:opacity-70"
      >
        {saving ? "Adding…" : "Add income"}
      </button>
    </form>
  );
};

export default AddIncomeForm;
