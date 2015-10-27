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

    function findOrAddProfile(originDb, profileTask) {
        var profile = profileTask.profile;

        var database = hoodie.database(exports.dbName);

        database.find('profile', profile.id, function (error, foundProfile) {
            if (error) {
                database.add('profile', profile, function (error) {
                    if (error) {
                        return hoodie.task.error(originDb, profileTask, error);
                    }

                    return hoodie.task.success(originDb, profileTask);
                });
            }
            else {
                profileTask.profile = foundProfile;
                return hoodie.task.success(originDb, profileTask);
            }
        });
    }

    done();
};
