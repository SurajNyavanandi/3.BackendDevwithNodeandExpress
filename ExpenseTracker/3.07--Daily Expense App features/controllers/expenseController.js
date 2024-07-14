const expenseMod=require('../models/expenseModel');

exports.createExpense=async(req,res)=>{
    try {
         const exp=await expenseMod.create(req.body);
         res.status(201).json(exp);
    } catch (error) {
        res.status(500).json({Error:"Posting the expense details"});
    }
}
exports.getExpenses=async(req,res)=>{
    try {
        const gexp=await expenseMod.findAll();
        res.status(200).json(gexp);
    } catch (error) {
        res.status(500).json({Error:"Getting the expense details"}); 
    }
}

exports.deleteExpense=async(req,res)=>{
    try {
        const expId=req.params.id;
        await expenseMod.destroy({where:{id:expId}});
        res.status(204).json();
    } catch (error) {
        res.status(500).json({Error:"Posting the expense details"});
    }
}