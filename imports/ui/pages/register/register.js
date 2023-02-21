import "./register.html"
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.register.events({
    'submit #registerForm': function (e, t) {
        e.preventDefault()
        let data = {}
        data.username = $('#inputEmail').val()
        data.email = $('#inputUserName').val()
        data.password = $("#inputPassword").val()

        Meteor.call('addUser', data, function (err, res) {
            if (err) console.log(err)
            else FlowRouter.go('/login')

        })
    }
});