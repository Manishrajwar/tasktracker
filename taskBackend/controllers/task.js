const User = require("../models/User");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

//! create the task
exports.createTask = async (req, res) => {
  try {
    // fech the data -> here assignedUser will be email
    const { title, description, dueDate, assignedUser } = req.body;

    // validation
    if (!title || !description || !dueDate || !assignedUser) {
      return res.status(403).json({
        success: false,
        message: "please send all required details ",
      });
    }

    //! validation on dueDate

    const currentDate = new Date();

    // Remove the time portion
    currentDate.setHours(0, 0, 0, 0);
    

    // Convert both dates to milliseconds
    const currentDateTime = currentDate.getTime();

    const dueDateTime = new Date(dueDate).getTime();

    // Compare the due date with the current date
    if (dueDateTime < currentDateTime) {
        console.log("inside the fuction 12");
      return res.status(403).json({
        success: false,
        message: "the due date is passed away , send valid duedate",
      });
    }

    const assignedUserDetails = await User.findOne({ email: assignedUser } ,{email:true , _id:true , type:true});

if(!assignedUserDetails){
  return res.status(404).json({
    success:false,
    message:"the user you want to assign do not exist"
  })
}

if(assignedUserDetails.type === 'Admin'){
    return res.status(403).json({
        success:false,
        messsage:"user cannot give task to admin"
    })
}

    //   if not exist
    if (!assignedUserDetails) {
      return res.status(404).json({
        success: false,
        message: `assigned user email is not valid`,
      });
    }

    // email is valid
    const assignedUserId = assignedUserDetails._id;

    // create task
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      assignedUser: assignedUserId,
    });

    // update in asssignUser model in task
    const updatedUserTask = await User.findByIdAndUpdate(
      { _id: assignedUserId },
      { $push:{
        task:newTask._id,
      } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `task is created successfully`,
      newTask,
      updatedUserTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `error in creating a task  , please try again`,
    });
  }
};

// ! delete task
exports.deleteTask = async (req, res) => {
  try {
    // fetch the task id
    const  taskId  = req.params.taskId;

    if (!taskId) {
      return res.status(403).json({
        success: false,
        message: `please send the taskId `,
      });
    }

    const taskDetails = await Task.findOne({_id:taskId})

    if (!taskDetails) {
      return res.status(404).json({
        success: false,
        message: `task is not found with this id `,
      });
    }

    // find the task
    await Task.findByIdAndDelete({ _id: taskId });
 const user  = await User.findOneAndUpdate({task:taskId},{$pull:{
    task:taskId,
 }},{new:true})
    

    return res.status(200).json({
      success: true,
      message: `successfuly deleted the task `,
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `error in deleting a task  , please try again`,
    });
  }
};




//! get all own tasks
exports.getAllOwnTask = async(req,res)=>{
    try {
        const token = req.cookies.token || req.get('Authorization').replace('Bearer ', '');
    
        try {
          const payload = jwt.decode(token);
          
          const currentUserId = payload.id;
    
          const allTasks = await Task.find({assignedUser:currentUserId });

          return res.status(200).json({
            
              success: true,
              message: "all task are fetch",
              data: allTasks,
          });
        
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: `there is an error in get all task`,
        });
      }
}

//! get task by user 
exports.getTaskByUser = async(req , res)=>{
    try{
        const userEmail = req.params.userEmail;

        if(!userEmail){
            return res.status(403).json({
                success:false,
                message:`please send the UserEmail `
            })
        }

        // check userEmail
        const userDetails = await User.findOne({email:userEmail});

        if(!userDetails){
            return res.json({
                success:false,
                message:`userDETAILS do not exist `
            })
        }

        if(userDetails.type === 'Admin'){
            return res.json({
                success:false,
                message:"admin has no tasks"
            })
        }

        const currentUserId  = userDetails._id;
        const allTasks = await Task.find({assignedUser:currentUserId });

        return res.status(200).json({
            success:true,
            message:"successfuly fetch the user tasks",
            
            data:allTasks
            
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
          success: false,
          message: `there is an error in get all task`,
        });
    }
}

// ! get all user email 
exports.getAllUserEmail = async(req ,res)=>{
  try{
    const allUserEmail = await User.find({type:'User'},{email:true});

    return res.status(200).json({
      success:true,
      allUserEmail
    })

  } catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"problem in fetching the email of users"
    })
  }
}


//! get all own completed task
exports.getAllCompletedTask = async(req,res)=>{
  try {
      const token = req.cookies.token || req.get('Authorization').replace('Bearer ', '');
  
      try {
        const payload = jwt.decode(token);
        
        const currentUserId = payload.id;
  
        const allTasks = await Task.find({assignedUser:currentUserId , status:'Completed'} );

        return res.status(200).json({
          
            success: true,
            message: "all task are fetch",
            data: allTasks,
        });
      
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `there is an error in get all completed tassk`,
      });
    }
}

// ! get all user Task 
exports.getAllTask = async(req ,res)=>{
  try{

    const allTask = await Task.find({});

    if(!allTask){
      return res.json({
        success:false,
        message:"yet no task is provided"
      })
    }

    return res.status(200).json({
      success:true,
      message:"all task are fetch",
      allTask
    })

  } catch(error){
    console.log(error);
    return res.status(500).json({
     success:false,
     message:"error in all task feetch"
    })
  }
}

// ! get all pending task
exports.getPendingTask = async(req ,res)=>{
  try{
        
    const allTask =await Task.find({status:'Pending'} , {title:true , description:true, status:true ,dueDate:true});
    if(!allTask){
      return res.json({
        success:false,
        message:"no task is pending"
      })
    }
     return res.status(200).json({
      success:true,
      message:"all pending task are fetch",
      allTask
     })
  } catch(error){
     console.log(error);
     return res.status(500).json({
      success:false,
      message:"error in pending task"
     })
  }
}

// ! getAllCompleteTask
exports.getAllCompleteTask = async(req,res)=>{
  try{
      const allTask = await Task.find({status:'Completed'} , {title:true , description:true, status:true ,dueDate:true});

      if(!allTask){
        return res.json({
          success:false,
          message:"no task is completed "
        })
      }
      return res.status(200).json({
        success:true,
        message:"all completed task are fetch ",
        allTask
      })
  } catch(error){
    console.log(error);
    return res.status(500).json({
     success:false,
     message:"error in all complete task feetch"
    })
  }
}



//! get task by user 
exports.getTaskById = async(req , res)=>{
  try{
      const taskId = req.params.taskId;

      if(!taskId){
          return res.status(403).json({
              success:false,
              message:`please send the taskId `
          })
      }

      // check userEmail
      const  taskDetails= await Task.findOne({_id:taskId});

      if(!taskDetails){
          return res.json({
              success:false,
              message:`taskdetails  do not exist `
          })
      }

   

      return res.status(200).json({
          success:true,
          message:"successfuly fetch the  tasks details",
          
          data:taskDetails
          
      })

  } catch(error){
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `there is an error in get  task details`,
      });
  }
}


// ! update task 
exports.updateTask =async(req ,res)=>{
  try{
    const {status , taskId} = req.body;
    if(!status || !taskId){
      return res.json({
        success:false,
        message:"please send the data",
      })
    }

    const taskDetails  = await Task.findByIdAndUpdate({_id:taskId},{status:status});

    return res.status(200).json({
      success:true,
      messsage:"successfully "
    })


  } catch(error){
 console.log(error);
 return res.status(500).json({
  success:false,
  message:"error in updage the task"
 })
  }
}
