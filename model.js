var mongoose = require('mongoose');
// Setup schema


var schema = mongoose.Schema({
    uuid: {
        type:String,
        required: true
    },
    userID: {
        type: [String],
        required: true
    },
    marketID: {
        type: String,
        required: true
    },
    marketName: {
        type: String,
        required: true
    },
    cmdtyID: {
        type: String,
        required: true
    },
    marketType: {
        type: String,
        required: true
    },
    cmdtyName: {
        type: String,
        required: true
    },
    priceUnit: {
        type: [String],
        required: true
    },
    convFctr: {
        type: [Number],
        required: true
    },
    price: {
        type: [Number],
        required: true
    }
    //timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    // create_date: {
    //     type: Date,
    //     default: Date.now
    // }
},
    //timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    {timestamps : true
});
// Export model

module.exports = mongoose.model('prices', schema);

// module.exports.get = function (callback, limit) {
//     Prices.find(callback).limit(limit);
// }