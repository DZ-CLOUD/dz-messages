const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const daycareSchema = new Schema({
    type: {type:String, required:true},
    value: {type:String, required:true},
    quantity: {type:Number, required:true},
});

const Daycare = mongoose.model('Daycare', daycareSchema);

module.exports = Daycare;