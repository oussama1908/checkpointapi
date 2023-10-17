const mongoose =require('mongoose');

const personSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating:{ 
    type:Number,
    min:[1],
    max:[10]
    } ,
    ReleaseDay: { type: Date, default: Date.now },
    MovieGenre:{
      type:String,
      enum:['horro','action','romantic'],
    }
  });


  // Create the Person model using the schema
const MOVIE= mongoose.model('Movies', personSchema);

module.exports=MOVIE;