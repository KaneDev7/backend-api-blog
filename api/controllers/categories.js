const { CategoryModel } = require('../models/models')

const categories = [
    'Actualités nationales',
    'Actualités internationales',
    'Politique',
    'Sport',
    'Social',
    'Santé',
    'Sciences',
    'Faits divers',
    'Éducation',
    'Divertissement',
    'Religion',
    'Météo',
];

 const insertCategory = async () => {

    try {
        for (const category of categories) {
            await CategoryModel.create({ title: category})
           console.log(`catégory ${category} inserer avec sucée`)
        }

    } catch (error) {
        console.log(error)
    }
}

const getCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.findAll({});
        if (!categories) return res.status(200).send({ message: 'categories non trouvé' })
        res.status(200).send(categories)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    insertCategory,
    getCategory
}