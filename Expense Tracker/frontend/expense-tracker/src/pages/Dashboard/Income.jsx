import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import { LuPlus } from "react-icons/lu";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchIncomeDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      const data = response.data;
      setIncomeData(Array.isArray(data) ? data : data ? Object.values(data) : []);
    } catch (error) {
      console.error("Failed to fetch income data:", error);
      toast.error("Failed to load income data");
      setIncomeData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncomeDetails();
  }, [fetchIncomeDetails]);

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source?.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount should be greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source: source.trim(),
        amount: Number(amount),
        date,
        icon: icon || null,
      });
      setIsAddOpen(false);
      toast.success("Income added");
      await fetchIncomeDetails();
      return true;
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to add income"
      );
    }
  };

  const handleDeleteIncome = async (id) => {
    if (!id) return toast.error("Invalid income ID");
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success("Income deleted");
      setDeleteTarget(null);
      await fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete income"
      );
      setDeleteTarget(null);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details");
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className="grid gap-4 sm:gap-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Income
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Every amount you received, by source.
            </p>
          </div>
          <button className="add-btn" onClick={() => setIsAddOpen(true)}>
            <LuPlus size={16} /> Add income
          </button>
        </div>

        <IncomeOverview transactions={incomeData} loading={loading} />

        <IncomeList
          transactions={incomeData}
          loading={loading}
          onDelete={(id) =>
            id ? setDeleteTarget(id) : toast.error("Invalid income ID")
          }
          onDownload={handleDownload}
        />
      </div>

      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add income"
        description="Record money you received."
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete income"
      >
        <DeleteAlert
          content="This income entry will be removed permanently."
          onDelete={() => handleDeleteIncome(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Income;
