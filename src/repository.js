'use strict';

export class Repository {

    constructor(entityType, adapter, location) {
        var self = this;

        self._adapter = adapter;
        self._location = location;
        self._EntityType = entityType;
    }

    insert(entity, cb) {
        var self = this;

        self._adapter.insert(self._location, entity, self._castToEntity.bind(self, cb));
    }

    query(filter, cb) {
        var self = this;

        self._adapter.query(self._location, filter, self._castToEntity.bind(self, cb));
    }

    update(entity, cb) {
        var self = this;

        self._adapter.update(self._location, entity, cb);
    }

    remove(entity, cb) {
        var self = this;

        self._adapter.remove(self._location, entity, self._castToEntity.bind(self, cb));
    }

    _castToEntity(cb, collection) {
        var self = this;

        cb(collection.map(function(data) {
            return self._EntityType.rebuild(data);
        }));
    }
}
