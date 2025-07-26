const mongoos = require("mongoose");

const ExpenseSchema = new mongoos.Schema({
    userId: { type: mongoos.Schema.Types.ObjectId, ref: "User", require:true},
    icon: { type: String},
    category:{ type: String, required: true },
    amount: { type: Number, required: true},
    date: { type: Date, default: Date.now},
}, { timestamps: true});

module.exports = mongoos.model("Expense", ExpenseSchema);