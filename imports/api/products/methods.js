import { productCol } from "./collections"

Meteor.methods({
    addproduct: function ({ title, description, status, userId, price }) {
        return productCol.insert({
            title, description, userId, status, price
        }
        )
    },
    editProduct: function ({ _id, price, title, description, status }) {
        return productCol.update({ _id:_id }, {
            $set: {
                price,
                title,
                description,
                status
            }
        });

    }
})