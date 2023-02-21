import { productCol } from "../products/collections"
import { bucketCol } from "./collections"

Meteor.publishComposite('getBuckets', function (query = {}, limit = 10, skip = 0, sort = {}) {
    return {
        find() {
            return bucketCol.find(query, {
                limit, skip, sort
            })
        },
        children: [{
            find(bucket) {
                return productCol.find({ _id: bucket.productId })
            }
        }]
    }


})