const dotenv = require("dotenv")
dotenv.config()

const Airtable = require("airtable-node")
const airtable = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY})
    .base(process.env.REACT_APP_AIRTABLE_BASE_ID)
    .table(process.env.REACT_APP_AIRTABLE_TABLE)

exports.handler = async (event, context, cb) => {
    try {
        const res = await airtable.list({maxRecords: 100})
        const products = res.records.map(product => {
            const {id, fields} = product
            const {
                name,
                featured,
                price,
                colors,
                company,
                description,
                category,
                shipping,
                images
            } = fields
            const {url} = images[0]
            return {
                id,
                name,
                featured,
                price,
                colors,
                company,
                description,
                category,
                shipping,
                image: url
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify(products)
        }
    }
    catch(err) {
        console.log(err)
        return {
            statusCode: 500,
            body: "there was an error"
        }
    }
}