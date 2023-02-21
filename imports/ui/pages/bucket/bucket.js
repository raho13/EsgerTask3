import { bucketCol } from '../../../api/buckets/collections'
import { productCol } from '../../../api/products/collections'
import './bucket.html'

Template.bucket.onCreated(function () {
    let self = this
    self.query = new ReactiveVar({ userId: Meteor.userId() })
    self.limit = new ReactiveVar(0)
    self.skip = new ReactiveVar(0)
    self.sort = new ReactiveVar({})
    self.total = new ReactiveVar(0)
    self.bucketArr = new ReactiveVar([])
    self.autorun(() => {
        this.subscribe('getBuckets', self.query.get(), self.limit.get(), self.skip.get(), self.sort.get());
        self.bucketArr.set(bucketCol.find().fetch())
        Tracker.afterFlush(function () {
            let a = 0
            self.bucketArr.get().map((item) => {
                a = a + productCol.find({ _id: item.productId }).fetch()[0].price * item.count
            })
            self.total.set(a)
        });

    })

})
Template.bucket.events({
    'click .removeFromBucket': function (event, template) {
        let data = {}
        data.productId = this.data._id
        data.userId = Meteor.userId()
        Meteor.call('removeProductFromBucket', data, function (err, res) {
            if (err) console.log(err)
            else {
                $('.toast').toast({ animation: true, delay: 1000 }).toast('show')
            }
        })
    },
    'click #test': function (e, t) {
        t.bucketArr.get().map((item) => {
            t.total.set(t.total.get() + (productCol.find({ _id: item.productId }).fetch()[0].price * item.count))
        })
    }
});

Template.bucket.helpers({
    showBucket: function () {
        return productCol.find()
    },
    getTotalPrice: function () {
        return Template.instance().total.get()
    }
});
