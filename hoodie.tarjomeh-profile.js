Hoodie.extend(function (hoodie) {

    var store = hoodie.open('hoodie-plugin-tarjomeh-profile');
    store.connect();

    function findOrAdd(profileData) {
        var defer = $.Deferred();

        hoodie.task.start('findoraddprofile', profile)
            .done(function (profileTask) {
                hoodie.task.on('remove:profile:' + profileTask.id, defer.resolve);
                hoodie.task.on('error:profile:' + profileTask.id, defer.reject);
            })
            .fail(defer.reject);

        return defer.promise();
    }

    //TODO update, remove, ...

    function findAll() {
        var defer = $.Deferred();
        store.findAll('profile')
            .done(defer.resolve)
            .fail(defer.reject)

        return defer.promise();
    }

    function on(eventName, callback) {
        hoodie.task.on(eventName + ':profile', callback);
    }

    hoodie.profile = {
        findOrAdd: findOrAdd,
        findAll: findAll,
        on: on
    }
});
