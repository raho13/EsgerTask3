import { productCol } from '../../../api/products/collections'
import './home.html'
Template.home.onCreated(function () {
    let self = this
    self.query = new ReactiveVar({status:true})
    self.limit = new ReactiveVar(0)
    self.skip = new ReactiveVar(0)
    self.sort = new ReactiveVar({})
    self.autorun(() => {
        this.subscribe('getProducts', self.query.get(), self.limit.get(), self.skip.get(), self.sort.get());
    })
})
Template.home.helpers({
    showProduct: function () {
        let temp = Template.instance()
        return productCol.find(temp.query.get(), temp.limit.get(), temp.skip.get(), temp.sort.get())
    }
});
Template.home.events({
    'click .addToBucket': function (e, t) {
        let self = this
        let data = {}
        data.productId = self.data._id
        data.userId = Meteor.userId()
        Meteor.call('addBucket', data, function (err, res) {
            if (err) console.log(err)
            else {
                //alert(` ${self.data.title} adlı element səbətə əlavə olundu`)
                $('.toast').toast({ animation: true, delay: 1000 }).toast('show')
            }
        })
    }
});