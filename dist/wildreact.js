
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return (root.WildReactMixin = factory());
        });
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.WildReactMixin = factory();
    }
}(this, function () {

    function _reload(c) {
        c.setState(c.__wdata__);
    }

    function _assertKeyIsValid(key) {
        var errorMessage;
        if (typeof key !== 'string') {
            errorMessage = 'Bind variable must be a string. Got: ' + key;
        } else if (key.length === 0) {
            errorMessage = 'Bind variable must be a non-empty string. Got: ""';
        } else if (key.length > 768) {
            errorMessage = 'Bind variable is too long to be stored in Wilddog. Got: ' + key;
        } else if (/[\[\].#$\/\u0000-\u001F\u007F]/.test(key)) {
            errorMessage = 'Bind variable cannot contain any of the following characters: . # $ ] [ /. Got: ' + key;
        }

        if (typeof errorMessage !== 'undefined') {
            throw  new Error('WildReactMixin:' + errorMessage);
        }
    }

    function _assertRefIsValid(ref) {
        if(!ref || typeof ref.ref != 'function') {
            throw new Error('WildReactMixin: Invalid Wilddog reference');
        }
    }

    function _childAdd(key, snapshot, previousChildKey) {
        var arr = this.__wdata__[key];
        var idx;
        if (previousChildKey === null) {
            idx = 0;
        } else {
            var pdx = _idx(arr, previousChildKey);
            idx = pdx + 1;
        }
        arr.splice(idx, 0, _sv(snapshot));
        _reload(this);
    }

    function _childRemove(key, snapshot) {
        var arr = this.__wdata__[key];
        arr.splice(_idx(arr, snapshot.key()), 1);
        _reload(this);
    }

    function _childChange(key, snapshot) {
        var arr = this.__wdata__[key];
        arr[_idx(arr, snapshot.key())] = _sv(snapshot);
        _reload(this);
    }

    function _childMove(key, snapshot, previousChildKey) {
        var arr = this.__wdata__[key];
        var k = snapshot.key();
        var cdx = _idx(arr, k);
        var record = arr.splice(cdx, 1)[0];
        var idx;
        if (previousChildKey === null) {
            idx = 0;
        } else {
            var previousChildIndex = _idx(arr, previousChildKey);
            idx = previousChildIndex + 1;
        }
        arr.splice(idx, 0, record);
        _reload(this);
    }


    function _idx(list, key) {
        for (var i = 0, length = list.length; i < length; ++i) {
            if (list[i]['.key'] === key) {
                return i;
            }
        }
        return -1;
    }

    function _sv(snapshot) {
        var value = snapshot.val();
        var record = {};
        if (typeof value === 'object' && value !== null) {
            record = value;
        } else {
            record['.value'] = value;
        }
        record['.key'] = snapshot.key();
        return record;
    }

    function _bind(ref, key, isBindAsArray, cancelCallback) {

        _assertKeyIsValid(key);
        _assertRefIsValid(ref);

        if (typeof this.__wd__[key] !== 'undefined') {
            throw new Error('this.state.' + key + ' is already bound to a Wilddog reference');
        }

        this.__wd__[key] = {};
        this.__wd__[key].ref = ref.ref();

        var self = this;
        if (isBindAsArray) {
            this.__wdata__[key] = [];
            _reload(this);

            this.__wd__[key].listners = {
                child_added: ref.on('child_added', _childAdd.bind(this, key), cancelCallback),
                child_removed: ref.on('child_removed', _childRemove.bind(this, key), cancelCallback),
                child_changed: ref.on('child_changed', _childChange.bind(this, key), cancelCallback),
                child_moved: ref.on('child_moved', _childMove.bind(this, key), cancelCallback)
            };

        } else {
            this.__wd__[key].listeners = {
                value: ref.on('value', function (snapshot) {
                    self.__wdata__[key] = _sv(snapshot);
                    _reload(self);
                }, cancelCallback)
            };
        }
    }

    return {
        bindAsArray: function (ref, key, cancelCallback) {
            _bind.call(this, ref, key, true, cancelCallback)
        },
        bindAsObject: function (ref, key, cancelCallback) {
            _bind.call(this, ref, key, false, cancelCallback)
        },
        componentWillMount: function () {
            this.__wd__ = {};
            this.__wdata__ = {};
        },
        componentWillUnmount: function () {
            for (var key in this.__wd__) {
                if (this.__wd__.hasOwnProperty(key)) {
                    this.unbind(key);
                }
            }
        },
        unbind: function (key, callback) {
            _assertKeyIsValid(key);
            if (!this.__wd__[key]) {
                throw new Error('this.state.' + key + ' is not bound to a Wilddog reference');
            }

            var lis = this.__wd__[key].listeners;
            var ref = this.__wd__[key].ref;

            if (lis) {
                for (var i in lis) {
                    if (lis.hasOwnProperty(i)) {
                        ref.off(i, lis[i]);
                    }
                }
            }
            delete this.__wd__[key];

            var s = {};
            s[key] = undefined;
            this.setState(s, callback);
        }
    };
}));