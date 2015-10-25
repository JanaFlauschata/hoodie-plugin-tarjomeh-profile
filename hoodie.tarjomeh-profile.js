Hoodie.extend(function (hoodie) {

    var store = hoodie.open('hoodie-plugin-tarjomeh-profile');
    store.connect();

    function findOrAdd(profile) {
        var defer = $.Deferred();
	profile.id = hoodie.id();
        hoodie.task.start('findoraddprofile', profile)
		.done(function(profileTask){ defer.resolve(profileTask);});
		.fail(function(profileTask){ defer.reject();});
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
