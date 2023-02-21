import './product.html'
import '../../../helpers/globalHelpers'
import { bucketCol } from '../../../api/buckets/collections'

Template.product.onCreated(function () {
    let self = this
    self.count = new ReactiveVar({})
    self.bucket = new ReactiveVar({})
    self.autorun(() => {
        self.bucket.set(bucketCol.find({ productId: Template.currentData().data._id }).fetch()[0])
        self.count.set(self.bucket.get()?.count)
    })

})
Template.product.helpers({
    CountProduct: function () {
        return Template.instance().count.get()
    },
});
Template.product.events({
    'click .add-btn': function (event, template) {
        template.count.set(template.count.get() + 1)
        let data = {}
        data._id = template.bucket.curValue._id
        data.count = template.count.get()
        Meteor.call('editCount', data, function (err, res) {
            if (err) console.log(err)
            else {
                //console.log(res)
            }
        })
    },
    'click .remove-btn': function (event, template) {
        if (template.count.get() >= 2) {
            template.count.set(template.count.get() - 1)
            let data = {}
            data._id = template.bucket.curValue._id
            data.count = template.count.get()
            Meteor.call('editCount', data, function (err, res) {
                if (err) console.log(err)
                else {
                   // console.log(res)
                }
            })
        }
    }
});
