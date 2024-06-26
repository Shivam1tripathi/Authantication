import mongoose from "mongoose";

const userschema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true,
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
Phone:{
type:String,
required:true,
},
address:{
    type:{},
    required:true,
},
answer:{
    type:String,
    required:true,
}
},{
    timestamps:true,
})
export default mongoose.model('users',userschema);