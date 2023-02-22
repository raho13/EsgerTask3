import { productCol, productCountCol } from "./collections"

Meteor.publish('getProducts', function (query = {}, limit = 10, skip = 0, sort = {}) {
    return productCol.find(query, {
        limit, skip, sort
    })
})



Meteor.publish('getProductCount', function (query = {}, limit = 10, skip = 0, sort = {}) {
    let count = 0;
    let initializing = true;
    let randomId = Math.random();
    const handleCount = productCol.find(query).observeChanges({
        added: () => {
            count += 1;
            if (!initializing) {
                this.changed('productsCount', randomId, {
                    count
                });
            }
        },
        removed: () => {
            count -= 1;

            this.changed('productsCount', randomId, {
                count
            });
        },
    });

    initializing = false;

    this.added('productsCount', randomId, {
        count
    }, (err, res) => {
        if (err) {
            console.log('error' + err)
        } else {
            console.log('res=' + res)
        }
    });
    this.ready();
    this.onStop(() => handleCount.stop());
})