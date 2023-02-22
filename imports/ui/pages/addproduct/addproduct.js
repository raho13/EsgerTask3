import './addproduct.html'
import { productCol, productCountCol } from '../../../api/products/collections'
import 'twbs-pagination';

Template.addproduct.onCreated(function () {
    const self = this
    self.query = new ReactiveVar({ userId: Meteor.userId() })
    self.limit = new ReactiveVar(10)
    self.skip = new ReactiveVar(0)
    self.sort = new ReactiveVar({ createdAt: -1 })
    self.isEditMode = new ReactiveVar(false)
    self.productData = new ReactiveVar({})
    self.dataCount = new ReactiveVar(0)
    self.autorun(() => {
        this.subscribe('getProducts', self.query.get(), self.limit.get(), self.skip.get(), self.sort.get())
        this.subscribe('getProductCount', self.query.get())
        self.dataCount.set(productCountCol.find().fetch()[0]?.count)
        Tracker.afterFlush(function () {
            $('#pagination-demo').twbsPagination({
                totalPages: parseInt(self.dataCount.get() / self.limit.get() + 1),
                onPageClick: function (event, page) {
                    self.skip.set((page - 1) * 10)
                }
            });
        })
    });
})

Template.addproduct.helpers({
    showProduct: function () {
        let temp = Template.instance()
        return productCol.find(temp.query.get(), temp.limit.get(), temp.skip.get(), temp.sort.get())
    },
    editMode: function () {
        return Template.instance().isEditMode.get()
    },
    showStatus: function () {
        return Template.instance().productData.get().status
    },
    test: function (a, b) {
        console.log(a + b) 
    }
});


Template.addproduct.events({
    'submit #addProductForm': function (e, t) {
        e.preventDefault()
        let data = {}
        data.title = $('#inputTitle').val()
        data.description = $("#inputDescription").val()
        data.status = true
        data.price = $('#inputPrice').val()
        data.userId = Meteor.userId()
        Meteor.call('addproduct', data, function (err, res) {
            if (err) console.log(err)
            else {
                $("#addProductForm").trigger('reset');
            }
        })
    },
    'click .editProduct': function (e, t) {

        t.isEditMode.set(true)
        let data = this.data
        t.productData.set(data)
        $('#inputTitle').val(data.title)
        $("#inputDescription").val(data.description)
        $('#inputPrice').val(data.price)
    },
    'click .btn-danger': function (e, t) {
        t.isEditMode.set(false)
        $("#addProductForm").trigger('reset');
    },
    'click #editProduct': function (e, t) {
        let data = {}
        data.title = $('#inputTitle').val()
        data.description = $("#inputDescription").val()
        data.status = $('#flexSwitchCheckChecked').is(":checked")
        data.price = $('#inputPrice').val()
        data._id = t.productData.get()._id
        Meteor.call('editProduct', data, function (err, res) {
            if (err) console.log(err)
            else {
                $("#addProductForm").trigger('reset');
                t.isEditMode.set(false)
            }
        })
    }
});