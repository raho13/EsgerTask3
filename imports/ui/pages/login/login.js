import './login.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.login.events({
    'submit #loginForm': function (e, t) {
        e.preventDefault()
        let username = $('#inputUserName').val()
        let password = $('#inputPassword').val()
        Meteor.loginWithPassword(username, password, function (err, res) {
            if (err) console.log(err)
            else {
                FlowRouter.go('/home')
            }
        })
    }
});