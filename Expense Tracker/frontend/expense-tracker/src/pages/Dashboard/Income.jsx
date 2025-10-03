import React, { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-toastify";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch all income details
  const fetchIncomeDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      const data = response.data;
      const processedData = Array.isArray(data)
        ? data
        : data
        ? Object.values(data)
        : [];
      setIncomeData(processedData);
    } catch (error) {
      console.error("Failed to fetch income data:", error);
      toast.error("Failed to load income data");
      setIncomeData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle adding new income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source?.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount should be a valid number greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      const payload = {
        source: source.trim(),
        amount: Number(amount),
        date,
        icon: icon || null,
      };
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, payload);
      setIsAddIncomeModalOpen(false);
      toast.success("Income added successfully");
      await fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add income";
      toast.error(errorMessage);
    }
  };

  // Handle downloading income
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      );
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
      toast.error("Failed to download income details. Please try again.");
    }
  };

  // Handle deleting income
  const handleDeleteIncome = async (id) => {
    if (!id) return toast.error("Invalid income ID");

    try {
      const deleteUrl = `/api/income/${id}`;
      await axiosInstance.delete(deleteUrl);
      toast.success("Income deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      await fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete income";
      toast.error(errorMessage);
      setOpenDeleteAlert({ show: false, data: null });
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, [fetchIncomeDetails]);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setIsAddIncomeModalOpen(true)}
            loading={loading}
          />
        </div>

        {!loading && incomeData.length > 0 && (
          <div className="mt-6">
            <IncomeList
              transactions={incomeData}
              onDelete={(transactionId) =>
                transactionId
                  ? setOpenDeleteAlert({ show: true, data: transactionId })
                  : toast.error("Invalid income ID")
              }
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
        )}

        {loading && (
          <div className="mt-6 text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Loading income data...</p>
          </div>
        )}

        {/* Add Income Modal */}
        <Modal
          isOpen={isAddIncomeModalOpen}
          onClose={() => setIsAddIncomeModalOpen(false)}
          title="Add Income"
          className="max-w-md"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Confirmation Modal */}
        {openDeleteAlert.show && openDeleteAlert.data && (
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
            className="max-w-sm"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income detail?"
              onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
              onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
            />
          </Modal>
        )}

        {!loading && incomeData.length === 0 && (
          <div className="mt-6 text-center py-12">
            <p className="text-gray-500 mb-4">No income records found.</p>
            <button
              onClick={() => setIsAddIncomeModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Your First Income
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Income;
