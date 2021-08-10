var bcrypt = require('bcrypt');
const { usersModel } = require('../models/model');

const updateUser = function (user, session) {

     return new Promise ((resolve, reject) => {
        var myquery = { email: session.email };
        var newvalues = { $set: { email: user.email, password: bcrypt.hashSync(user.password, 10), calorie: user.calorie } };

        usersModel.updateOne(myquery, newvalues)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject (err);
            })
     })
}

module.exports.updateUser = updateUser;