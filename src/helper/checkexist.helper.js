const Category = require("../model/Category")

const checkCategoryExist = async (category) => {
    const isExist = await Category.findOne({
        where: { idcategory: category }
    }).then(response => JSON.stringify(response))
        .then((respondJSON) => {
            respondJSON = JSON.parse(respondJSON);
            return respondJSON ? true : false;
        });
}

module.exports = { checkCategoryExist }
