import { FlowRouter } from 'meteor/ostrio:flow-router-extra'   
import "../../ui/layout/mainLayout/mainLayout"
import '../../ui/pages/home/home'
import '../../ui/components/navbar/navbar'
import '../../ui/components/product/product'
import '../../ui/pages/addproduct/addproduct'
import '../../ui/pages/login/login'
import '../../ui/pages/register/register'
import '../../ui/pages/bucket/bucket'
import '../../ui/components/pagination/pagination'
FlowRouter.route('/home', {
    name: 'home',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'home'
        })
    }
})

FlowRouter.route('/bucket', {
    name: 'bucket',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'bucket'
        })
    }
})
FlowRouter.route('/addproduct', {
    name: 'addproduct',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'addproduct'
        })
    }
})
FlowRouter.route('/register', {
    name: 'register',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'register'
        })
    }
})
FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'login'
        })
    }
})
FlowRouter.route('/', {
    action() {
        FlowRouter.go('/home');
    }
})
function trackRouteEntry(context, redirect) {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
        redirect('/login')
    }
}
FlowRouter.triggers.enter([trackRouteEntry], {
    except: ['login', 'register']
})