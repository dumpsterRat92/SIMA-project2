const { Tag } =require('../models')

const tagData = [{
    tag_name: "Strategy",
},
{
    tag_name: "Mystery",
},
{
    tag_name: "Guessing",
},
{
    tag_name: "Social",
},
{
    tag_name: "Drinking",
},
{
    tag_name: "Luck",
},
]
const seedTags = () => Tag.bulkCreate(seedTags)
module.exports = seedTags;
