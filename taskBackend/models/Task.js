const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    dueDate: {
        type: Date,
        default: function() {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + 3); // Adding 3 days
          return currentDate;
        }
      },
    status:{
        type:String,
        enum:["Pending" , "Completed"],
        default:"Pending"        
    },
    assignedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})

module.exports = mongoose.model("Task" , taskSchema);