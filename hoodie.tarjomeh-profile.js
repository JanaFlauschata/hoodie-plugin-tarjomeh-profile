Hoodie.extend(function (hoodie) {

    var store = hoodie.open('hoodie-plugin-tarjomeh-profile');
    store.connect();

    function findOrAdd(profile) {
        var defer = $.Deferred();
	profile.id = hoodie.id();
        hoodie.task.start('findoraddprofile', {profile: profile})
		.done(function(profileTask){ defer.resolve(profileTask.profile);})
		.fail(function(error){ defer.reject(error);});
        return defer.promise();
    }

    function find(id) {
        var defer = $.Deferred();

	store.find('profile', id)
    		.done(function(profile) { defer.resolve(profile); })
    		.fail(function(error) { defer.reject(error); });

        return defer.promise();
    }

    //TODO update, remove, ...

    function findAll() {
        var defer = $.Deferred();
        store.findAll('profile')
            .done(function(allProfiles) {
   		 defer.resolve(allProfiles);
    	     })
            .fail(function(error) { defer.reject(error); })

        return defer.promise();
    }

    function on(eventName, callback) {
        store.on('profile:' + eventName, callback);
    }

    hoodie.profile = {
        findOrAdd: findOrAdd,
        findAll: findAll,
        on: on
    }
});
