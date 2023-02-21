

Meteor.methods({

    addUser: function ({ username, email, password }) {
        return Accounts.createUser({
            username,
            email,
            password
        })
    }
})