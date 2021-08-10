const { mealsModel} = require('../models/model');

const createMeal = function (meal, userObj, date) {
    return new Promise ((resolve, reject) => {
        
        const newMeal = new mealsModel({
            userMail: userObj.email,
            mDate: date,
            mCalorie: meal.mCalorie,
            mType: meal.mType,
            mName: meal.mName,
            mDescription: meal.mDescription
        })

        newMeal.save()
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject (err);
            })
    })
}

module.exports.createMeal = createMeal;