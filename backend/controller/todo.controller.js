import Todo from '../models/todo.model.js';



export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    
    // req.user.id should be set by authentication middleware
    const todo = await Todo.create({ 
      title, 
      description, 
      userId: req.user._id 
    });

    return res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }); 
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateTodo = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!id || !status) {
            return res.status(400).json({
                success: false,
                message: "Todo id and status are required",
            });
        }

        const todo = await Todo.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const deleteTodo = async (req, res) => {

    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


