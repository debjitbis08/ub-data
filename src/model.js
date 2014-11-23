'use strict';

export class Model {

    constructor() {
        var self = this;

        self._attributes = {};

        Object.keys(self.defaults).forEach(function(prop) {
            self._attributes[prop] = self.defaults[prop];
        });

        Object.seal(self._attributes);
    }

    _setAttribute(key, value) {
        var self = this;

        if (!(key in self._attributes)) {
            throw new Error('The key does not belong to this Model -> ' + key);
        }

        self._attributes[key] = value;
    }

    set(key, value) {
        var self = this,
            map = {},
            isMap;

        isMap = typeof key === 'object' && value === undefined;

        if (isMap) {
            map = key;
            Object.keys(map).forEach(function(k) {
                self._setAttribute(k, map[k]);
            });
        } else {
            self._setAttribute(key, value);
        }
    }

    get() {
        var self = this,
            toReturnAllAttributes = (arguments.length === 0),
            attrName,
            returnValue;

        if (toReturnAllAttributes) {
            returnValue = self._attributes;
        } else {
            attrName = arguments[0];
            returnValue = self._attributes[attrName];
        }

        return returnValue;
    }

    /**
     * Entities compare by identity, not by attributes.
     * Must be overridden.
     *
     * @param other The other entity.
     * @return {Boolean} return true if the identities are the same, regardless of other attributes.
     */
    isIdenticalTo(other) {
        return (this === other);
    }
}
