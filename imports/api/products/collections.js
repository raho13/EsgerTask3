export const productCol = new Mongo.Collection('products')
export const productCountCol = new Mongo.Collection('productsCount')

productCol.find().observe({
    added: function (document) {
        productCountCol.remove({})
        productCountCol.insert({ count: productCol.find().fetch().length });
    },
    changed: function (new_document, old_document) {
        productCountCol.remove({})
        productCountCol.insert({ count: productCol.find().fetch().length });
    },
    removed: function (document) {
        productCountCol.remove({})
        productCountCol.insert({ count: productCol.find().fetch().length });
    }
})