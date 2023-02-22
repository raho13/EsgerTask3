import './pagination.html'
import { productCountCol } from '../../../api/products/collections'

Template.pagination.onCreated(function () {
    // const self = this
    // self.query = new ReactiveVar({})
    // self.limit = new ReactiveVar(10)
    // self.skip = new ReactiveVar(0)
    // self.sort = new ReactiveVar({ createdAt: -1 })
    // self.isEditMode = new ReactiveVar(false)
    // self.productData = new ReactiveVar({})
    // self.dataCount = new ReactiveVar(0)
    // self.autorun(() => {
    //     this.subscribe('getProductCount', self.query.get())
    //     Tracker.afterFlush(function () {
    //         $('#pagination-demo').twbsPagination({
    //             totalPages: parseInt(self.dataCount.get() / self.limit.get() + 1),
    //             onPageClick: function (event, page) {
    //                 self.skip.set((page - 1) * 10)
    //             }
    //         });
    //     })
    // });



})