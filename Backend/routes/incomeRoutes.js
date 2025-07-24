const express = require("express");
const{
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");
const { Router } = require("react-router-dom");

const router = express.Router();
router.post("/add",protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/id",protect, deleteIncome);

module.exports = router;