const { Tag } =require('../models')

const tagData = [{
    name: "Strategy",
},
{
    name: "Mystery",
},
{
    name: "Guessing",
},
{
    name: "Social",
},
{
    name: "Drinking",
},
{
    name: "Luck",
},
]
const seedTags = () => Tag.bulkCreate(tagData);
module.exports = seedTags;
