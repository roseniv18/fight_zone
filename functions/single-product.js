const dotenv = require("dotenv")
dotenv.config()

const Airtable = require("airtable-node")
const airtable = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
    .base(process.env.REACT_APP_AIRTABLE_BASE_ID)
    .table(process.env.REACT_APP_AIRTABLE_TABLE)

exports.handler = async (event, context, cb) => {
    console.log(event.queryStringParameters)
    const { id } = event.queryStringParameters
    if (id) {
        try {
            let product = await airtable.retrieve(id)
            if (product.error) {
                return {
                    statusCode: 404,
                    body: `No product with id of ${id}`,
                }
            } else {
                product = {
                    id: product.id,
                    ...product.fields,
                }
                return {
                    statusCode: 200,
                    body: JSON.stringify(product),
                }
            }
        } catch (err) {
            console.log(err)
            return {
                statusCode: 500,
                body: "server error",
            }
        }
    } else {
        return {
            statusCode: 400,
            body: "please provide product id",
        }
    }
}
