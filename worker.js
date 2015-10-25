exports.dbName = 'hoodie-plugin-tarjomeh-profile';

module.exports = function (hoodie, done) {

    // create read-only database for profiles if it does not exist yet
    hoodie.database.findAll(function (error, databases) {
        if (error) return done(error);

        if (databases.indexOf(exports.dbName) == -1) {

            hoodie.database.add(exports.dbName, function (error, db) {
                if (error) return done(error);

                db.grantPublicReadAccess(function (error) {
                    if (error) return done(error);
                });
            })
        }
    });

    hoodie.task.on('findoraddprofile:add', findOrAddProfile);

    function findOrAddProfile(originDb, profile) {
        var hoodieId = profile.id;

        // workaround to ensure the task will be found when calling success
        var id = profile.id;
        var type = profile.type;

        var database = hoodie.database(exports.dbName);

        database.find('profile', hoodieId, function (error, foundProfile) {
            if (error) {
		// workaround to prevent document update conflicts
		delete profile._id;
		delete profile._rev;
                database.add('profile', profile, function (error, profile) {
                    if (error) {
                        return hoodie.task.error(originDb, profile, error);
                    }

                    // resetting id and type to identify the original task
                    profile.id = id;
                    profile.type = type;

                    return hoodie.task.success(originDb, profile);
                });
            }
            else {
                // resetting id and type to identify the original task
                foundProfile.id = id;
                foundProfile.type = type;
		// workaround to prevent document update conflicts
		delete foundProfile._id;
		delete foundProfile._rev;
                return hoodie.task.success(originDb, foundProfile);
            }
        });
    }

    done();
};
