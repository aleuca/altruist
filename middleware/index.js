const db = require('../db');

let middlewareObj = {};

middlewareObj.checkFavorOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        findFavor(err, foundFavor) {
            if(err) {
                console.log('no such favor')
            } else {

            }
        }
    }
}

function findFavor() {
    const favor = db.favors.find((obj) => {
        return obj.id == req.param.id
    })
}