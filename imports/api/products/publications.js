import { productCol, productCountCol } from "./collections"

Meteor.publish('getProducts', function (query = {}, limit = 10, skip = 0, sort = {}) {
    return productCol.find(query, {
        limit, skip, sort
    })
})
Meteor.publish('getProductCount', function (query = {}, limit = 10, skip = 0, sort = {}) {
    return productCountCol.find()
})