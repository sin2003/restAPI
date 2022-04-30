// Import model model
const crypto = require('crypto')

Model = require('./model');

var mongoose = require('mongoose');


exports.new = function (req, res) {

  //  console.log("params",req.body.reportDetails.marketID)

    //console.log(Model)

    // Model.find({},function(err,docs){
    //     if(err){
    //         console.log(err)
    //         res.json(err);
    //     }
    //     else{
    //         console.log(docs)
    //     }
    // });

    // Model.find({cmdtyID:'cmdty-1',price:700},function(err,docs){
    //     if(err){
    //         console.log(err)
    //         res.json(err);
    //     }
    //     else{
    //         console.log(docs)
    //     }
    // });

    var inmarketID = req.body.reportDetails.marketID;
    var incmdtyID = req.body.reportDetails.cmdtyID;
    Model.findOne({marketID: inmarketID.toString() , cmdtyID : incmdtyID.toString()}, function(err, model){
        //console.log(err)
        if (err){
            res.json(err);
        }
        else if(model==null){
            //console.log("new model")
            var model = new Model();
            var uuid = crypto.randomUUID();
            model.uuid = uuid;
            model.userID = req.body.reportDetails.userID;
            model.marketID = req.body.reportDetails.marketID;
            model.marketName = req.body.reportDetails.marketName;
            model.cmdtyID = req.body.reportDetails.cmdtyID;
            model.marketType = req.body.reportDetails.marketType;
            model.cmdtyName = req.body.reportDetails.cmdtyName;
            model.priceUnit = req.body.reportDetails.priceUnit;
            model.convFctr = (req.body.reportDetails.convFctr);
            model.price = (req.body.reportDetails.price);
            // sav e the model and check for errors
            //console.log(model)

            model.save(function (err) {
                if (err){
                    //console.log("error saving")
                    res.json(err);
                   
                }
                else{
                    res.json({
                    status: "success",
                    reportID:model.uuid
                    });
                    //console.log(Model)
                }
            });
        }

        else{
            //console.log("update model")
            model.userID.push(req.body.reportDetails.userID);
            // model.marketID = req.body.reportDetails.marketID;
            // model.marketName = req.body.reportDetails.marketName;
            // model.cmdtyID = req.body.reportDetails.cmdtyID;
            // model.marketType = req.body.reportDetails.marketType;
            // model.cmdtyName = req.body.reportDetails.cmdtyName;
            model.priceUnit.push(req.body.reportDetails.priceUnit);
            model.convFctr.push(req.body.reportDetails.convFctr);
            model.price.push(req.body.reportDetails.price);

            // save the model and check for errors
            model.save(function (err) {
                if (err){
                    res.json(err);
                }
                else{
                    res.json({
                        status: "success",
                        reportID: model.uuid
                    });
                }
            });
        }
        
        
    });
};
// Handle view model info
exports.view = function (req, res) {
    Model.findOne({uuid : req.query.reportID.toString()}, function (err, model) {
        if (err){
            res.json(err);
        }
        else if(model!=null){
            //console.log(err,"err=null,model!=null in get")
            var sum = 0;
            var arr1 = model.convFctr;
            var arr2 = model.price;
            

            for(var i=0; i< arr1.length; i++) {
                sum += arr2[i]/arr1[i];
            }
             
            var avgprice = sum/arr1.length
                
            
            res.json({
                _id : model.uuid,
                cmdtyName : model.cmdtyName,
                cmdtyID : model.cmdtyID,
                marketID : model.marketID,
                users : model.userID,
                //timestamp : model.opts,
                timestamp : model.updatedAt.getTime(),
                priceUnit : "kg",
                price : avgprice
            });
        }
        else{
            //console.log(err,"err=null,model=null in get")
            //console.log(model,"err=null,model=null in get")
            res.json({
                status : "report does not exist"
            });
        }
    });
};
// Handle delete model
exports.delete = function (req, res) {
    // Model.remove({
    //     _id: req.query.reportID
    // }, function (err, model) {
    //     if (err){
    //         res.send(err);
    //     }
    //     else{
    //         res.json({
    //                 status: "success",
    //                 message: 'Model deleted'
    //             });
    //     }
    // });
    Model.deleteMany({}, function (err, model) {
        if (err){
            res.json(err);
        }
        else{
            res.json({
                    status: "success",
                    message: 'Model deleted'
                });
        }
    });
};