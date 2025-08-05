import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    enum: [
      'ast_sales_manager',
      'exp_sales_manager',
      'exp_sales_member',
      'dom_sales_manager',
      'dom_sales_member',
      'admin',
      'bottle_admin',
      'alu_admin',
      'plastic_admin',
      'pump_admin',
      'accesssory_admin',
      'deco_admin',
      'print_admin',
      'coat_admin',
      'frost_admin',
      'foil_admin',
      'metalized_admin'
    ],
  },
  access_level: {
    type: String,
    enum: [
      'admin',
      'sales_admin',
      'dom_admin',
      'exp_admin',
      'team',
      'deco_admin'
    ],
  }
});

export const User = mongoose.model('users', userSchema);