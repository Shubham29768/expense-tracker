import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeSources from "../../components/Income/IncomeSources";
import AddIncomeModal from "../../components/layouts/Modal";
import DeleteConfirmationModal from "../../components/layouts/DeleteConfirmationModal";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState(null);

  // ✅ Correctly wrapped async code
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (incomeData) => {
    try {
      const response = await axiosInstance.post(
        `${API_PATHS.INCOME.ADD_INCOME}`,
        incomeData
      );

      if (response.data) {
        // Refresh the income data
        fetchIncomeDetails();
      }
    } catch (error) {
      console.log("Error adding income:", error);
    }
  };

  // Handle delete income click
  const handleDeleteClick = (income) => {
    console.log("Delete clicked for income:", income);
    setIncomeToDelete(income);
    setOpenDeleteModal(true);
  };

  // Delete Income
  const deleteIncome = async () => {
    if (!incomeToDelete) {
      console.log("No income to delete");
      return;
    }
    
    // Use _id if available, otherwise fall back to id
    const incomeId = incomeToDelete._id || incomeToDelete.id;
    
    console.log("Deleting income:", incomeToDelete);
    console.log("Income ID:", incomeId);
    console.log("API URL:", API_PATHS.INCOME.DELETE_INCOME(incomeId));
    
    try {
      const response = await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId));
      console.log("Delete response:", response);
      
      if (response.status === 200) {
        console.log("Income deleted successfully");
        // Refresh the income data
        await fetchIncomeDetails();
        setIncomeToDelete(null);
      } else {
        console.log("Unexpected response status:", response.status);
        alert("Failed to delete income. Please try again.");
      }
    } catch (error) {
      console.log("Error deleting income:", error);
      console.log("Error response:", error.response);
      alert(`Failed to delete income: ${error.response?.data?.message || error.message}`);
    }
  };

  // Handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.DOWNLOAD_INCOME}`,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("Error downloading income details:", error);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* Income Overview Section */}
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          {/* Income Sources Section */}
          <div>
            <IncomeSources
              incomeData={incomeData}
              onDeleteIncome={handleDeleteClick}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
        </div>
      </div>

      {/* Add Income Modal */}
      <AddIncomeModal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        onAddIncome={handleAddIncome}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setIncomeToDelete(null);
        }}
        onConfirm={deleteIncome}
        title="Delete Income"
        message="Are you sure you want to delete this income detail?"
      />
    </DashboardLayout>
  );
};

export default Income;
