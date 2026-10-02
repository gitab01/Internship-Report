import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) =>
    setExpense((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const saved = await onAddExpense?.({
        ...expense,
        amount: Number(expense.amount),
      });
      if (saved) setExpense({ category: "", amount: "", date: "", icon: "" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-1">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, Transport…"
        type="text"
        required
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount (ETB)"
        placeholder="0"
        type="number"
        min="0"
        step="0.01"
        required
      />

      <Input
        value={expense.date}
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
        {saving ? "Adding…" : "Add expense"}
      </button>
    </form>
  );
};

export default AddExpenseForm;
