import { bucketCol } from "./collections"

Meteor.methods({
    addBucket: function ({ productId, userId }) {
        return bucketCol.insert({
            userId, productId, count: 1
        }
        )
    },
    removeProductFromBucket: function ({ productId, userId }) {
        return bucketCol.remove({ userId: userId, productId: productId })

    },
    editCount: function ({ _id, count }) {
        return bucketCol.update({ _id: _id }, {
            $set: {
                count
            }
        })
    }
})