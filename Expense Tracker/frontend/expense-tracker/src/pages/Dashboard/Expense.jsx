import { useEffect, useState, useCallback } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { toast } from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import DeleteAlert from "../../components/DeleteAlert";
import { LuPlus } from "react-icons/lu";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchExpenseDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      const data = response.data;
      setExpenseData(
        Array.isArray(data) ? data : data ? Object.values(data) : []
      );
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenseDetails();
  }, [fetchExpenseDetails]);

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon = "" } = expense;

    if (!category?.trim()) return toast.error("Category is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount should be greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category: category.trim(),
        amount: Number(amount),
        date,
        icon,
      });
      setIsAddOpen(false);
      toast.success("Expense added");
      fetchExpenseDetails();
      return true;
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error(
        error.response?.data?.message || "Failed to add expense"
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setDeleteTarget(null);
      toast.success("Expense deleted");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
      setDeleteTarget(null);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details");
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="grid gap-4 sm:gap-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Expenses
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              What you spent, and where it went.
            </p>
          </div>
          <button className="add-btn" onClick={() => setIsAddOpen(true)}>
            <LuPlus size={16} /> Add expense
          </button>
        </div>

        <ExpenseOverview transactions={expenseData} loading={loading} />

        <ExpenseList
          transactions={expenseData}
          loading={loading}
          onDelete={(id) => setDeleteTarget(id)}
          onDownload={handleDownload}
        />
      </div>

      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add expense"
        description="Record something you spent."
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete expense"
      >
        <DeleteAlert
          content="This expense entry will be removed permanently."
          onDelete={() => deleteExpense(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Expense;
