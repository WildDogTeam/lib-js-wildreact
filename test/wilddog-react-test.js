// 由于我们在后台做了访问次数限制，这个脚本没办法自动执行

// Mocha / Chai / Sinon
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

// React
var React = require('react/addons');
var ReactTestUtils = React.addons.TestUtils;

// WildReactMixin
var Wilddog = require('wilddog');

var WildReactMixin = require('../src/wilddog-react-debug.js');

// JSDom
var jsdom = require('jsdom');
global.document = jsdom.jsdom();  // Needed for ReactTestUtils shallow renderer

// Test helpers
var TH = require('./helper.js');

// Get a reference to a random demo Wilddog
var initUrl = 'https://scm.wilddogio.com';


describe('WildReactMixin', function () {
    var ref;
    var shallowRenderer;

    beforeEach(function (done) {
        shallowRenderer = ReactTestUtils.createRenderer();

        ref = new Wilddog(initUrl);
        ref.remove(function (error) {
            if (error) {
                done(error);
            } else {
                ref = ref.child(TH.generateRandomString());
                done();
            }
        });
    });

    //describe('bindAsArray()', function () {
        //it('throws error given invalid Wilddog reference', function () {
        //    var TestComponent = React.createClass({
        //        mixins: [WildReactMixin],
        //
        //        componentWillMount: function () {
        //            var _this = this;
        //
        //            TH.invalidRefs.forEach(function (ref) {
        //                expect(function () {
        //                    _this.bindAsArray(ref, 'items');
        //                }).to.throw('WildReactMixin: Invalid Wilddog reference');
        //            });
        //        },
        //
        //        render: function () {
        //            return React.DOM.div(null);
        //        }
        //    });
        //
        //    shallowRenderer.render(React.createElement(TestComponent));
        //});
        //
        //it('throws error given invalid bind variable', function () {
        //    var TestComponent = React.createClass({
        //        mixins: [WildReactMixin],
        //
        //        componentWillMount: function () {
        //            var _this = this;
        //
        //            TH.invalidBindVars.forEach(function (invalidBindVar) {
        //                expect(function () {
        //                    _this.bindAsArray(ref, invalidBindVar);
        //                }).to.throw(/Bind variable/);
        //            });
        //        },
        //
        //        render: function () {
        //            return React.DOM.div(null);
        //        }
        //    });
        //
        //    shallowRenderer.render(React.createElement(TestComponent));
        //});

        //it('throws error given an already bound bind variable', function () {
        //    var TestComponent = React.createClass({
        //        mixins: [WildReactMixin],
        //
        //        componentWillMount: function () {
        //            var _this = this;
        //
        //            expect(function () {
        //                _this.bindAsArray(ref, 'items');
        //                _this.bindAsArray(ref, 'items');
        //            }).to.throw('this.state.items is already bound to a Wilddog reference');
        //        },
        //
        //        render: function () {
        //            return React.DOM.div(null);
        //        }
        //    });
        //
        //    shallowRenderer.render(React.createElement(TestComponent));
        //});

        //it('binds array records which are objects', function (done) {
        //    var TestComponent = React.createClass({
        //        mixins: [WildReactMixin],
        //
        //        componentWillMount: function () {
        //            this.bindAsArray(ref, 'items');
        //
        //            ref.set({
        //                first: {index: 0},
        //                second: {index: 1},
        //                third: {index: 2}
        //            }, function () {
        //                expect(this.state.items).to.deep.equal([
        //                    {'.key': 'first', index: 0},
        //                    {'.key': 'second', index: 1},
        //                    {'.key': 'third', index: 2}
        //                ]);
        //
        //                done();
        //            }.bind(this));
        //        },
        //
        //        render: function () {
        //            return React.DOM.div(null);
        //        }
        //    });
        //
        //    shallowRenderer.render(React.createElement(TestComponent));
        //});
    //
    //    it('binds array records which are primitives', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref, 'items');
    //
    //                ref.set(['first', 'second', 'third'], function () {
    //                    expect(this.state.items).to.deep.equal([
    //                        {'.key': '0', '.value': 'first'},
    //                        {'.key': '1', '.value': 'second'},
    //                        {'.key': '2', '.value': 'third'}
    //                    ]);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds array records which are a mix of objects and primitives', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref, 'items');
    //
    //                ref.set({
    //                    0: 'first',
    //                    1: 'second',
    //                    third: {index: 2}
    //                }, function () {
    //                    expect(this.state.items).to.deep.equal([
    //                        {'.key': '0', '.value': 'first'},
    //                        {'.key': '1', '.value': 'second'},
    //                        {'.key': 'third', index: 2}
    //                    ]);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds as an empty array for Wilddog references with no data', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref, 'items');
    //
    //                ref.set(null, function () {
    //                    expect(this.state.items).to.deep.equal([]);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds sparse arrays', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref, 'items');
    //
    //                ref.set({0: 'a', 2: 'b', 5: 'c'}, function () {
    //                    expect(this.state.items).to.deep.equal([
    //                        {'.key': '0', '.value': 'a'},
    //                        {'.key': '2', '.value': 'b'},
    //                        {'.key': '5', '.value': 'c'}
    //                    ]);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds only a subset of records when using limit queries', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.limitToLast(2), 'items');
    //
    //                ref.set({a: 1, b: 2, c: 3}, function () {
    //                    expect(this.state.items).to.deep.equal([
    //                        {'.key': 'b', '.value': 2},
    //                        {'.key': 'c', '.value': 3}
    //                    ]);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('removes records when they fall outside of a limit query', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.limitToLast(2), 'items');
    //
    //                ref.set({a: 1, b: 2, c: 3}, function () {
    //                    ref.child('d').set(4, function () {
    //                        expect(this.state.items).to.deep.equal([
    //                            {'.key': 'c', '.value': 3},
    //                            {'.key': 'd', '.value': 4}
    //                        ]);
    //
    //                        done();
    //                    }.bind(this));
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('adds a new record when an existing record in the limit query is removed', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.limitToLast(2), 'items');
    //
    //                ref.set({a: 1, b: 2, c: 3}, function () {
    //                    ref.child('b').remove(function () {
    //                        expect(this.state.items).to.deep.equal([
    //                            {'.key': 'a', '.value': 1},
    //                            {'.key': 'c', '.value': 3}
    //                        ]);
    //
    //                        done();
    //                    }.bind(this));
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds records in the correct order when using ordered queries', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.orderByValue(), 'items');
    //
    //                ref.set({a: 2, b: 1, c: 3}, function () {
    //                    expect(this.state.items).to.deep.equal([
    //                        {'.key': 'b', '.value': 1},
    //                        {'.key': 'a', '.value': 2},
    //                        {'.key': 'c', '.value': 3}
    //                    ]);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds multiple Wilddog references to state variables at the same time', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.child('items0'), 'bindVar0');
    //                this.bindAsArray(ref.child('items1'), 'bindVar1');
    //
    //                ref.set({
    //                    items0: {
    //                        first: {index: 0},
    //                        second: {index: 1},
    //                        third: {index: 2}
    //                    },
    //                    items1: ['first', 'second', 'third']
    //                }, function () {
    //                    expect(this.state.bindVar0).to.deep.equal([
    //                        {'.key': 'first', index: 0},
    //                        {'.key': 'second', index: 1},
    //                        {'.key': 'third', index: 2}
    //                    ]);
    //
    //                    expect(this.state.bindVar1).to.deep.equal([
    //                        {'.key': '0', '.value': 'first'},
    //                        {'.key': '1', '.value': 'second'},
    //                        {'.key': '2', '.value': 'third'}
    //                    ]);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('updates an array record when its value changes', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref, 'items');
    //
    //                var _this = this;
    //                ref.set({a: 1, b: 2, c: 3}, function () {
    //                    ref.child('b').set({foo: 'bar'}, function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'a', '.value': 1},
    //                            {'.key': 'b', foo: 'bar'},
    //                            {'.key': 'c', '.value': 3}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('removes an array record when it is deleted', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref, 'items');
    //
    //                var _this = this;
    //                ref.set({a: 1, b: 2, c: 3}, function () {
    //                    ref.child('b').remove(function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'a', '.value': 1},
    //                            {'.key': 'c', '.value': 3}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('moves an array record when it\'s order changes (moved to start of array) [orderByValue()]', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.orderByValue(), 'items');
    //
    //                var _this = this;
    //                ref.set({a: 2, b: 3, c: 2}, function () {
    //                    ref.child('b').set(1, function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'b', '.value': 1},
    //                            {'.key': 'a', '.value': 2},
    //                            {'.key': 'c', '.value': 2}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('moves an array record when it\'s order changes (moved to middle of array) [orderByValue()]', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.orderByValue(), 'items');
    //
    //                var _this = this;
    //                ref.set({a: 2, b: 1, c: 4}, function () {
    //                    ref.child('b').set(3, function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'a', '.value': 2},
    //                            {'.key': 'b', '.value': 3},
    //                            {'.key': 'c', '.value': 4}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('moves an array record when it\'s order changes (moved to end of array) [orderByValue()]', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.orderByValue(), 'items');
    //
    //                var _this = this;
    //                ref.set({a: 2, b: 1, c: 3}, function () {
    //                    ref.child('b').set(4, function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'a', '.value': 2},
    //                            {'.key': 'c', '.value': 3},
    //                            {'.key': 'b', '.value': 4}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('moves an array record when it\'s order changes (moved to start of array) [orderByChild()]', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.orderByChild('value'), 'items');
    //
    //                var _this = this;
    //                ref.set({a: {value: 2}, b: {value: 3}, c: {value: 2}}, function () {
    //                    ref.child('b').set({value: 1}, function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'b', value: 1},
    //                            {'.key': 'a', value: 2},
    //                            {'.key': 'c', value: 2}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('moves an array record when it\'s order changes (moved to middle of array) [orderByChild()]', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.orderByChild('value'), 'items');
    //
    //                var _this = this;
    //                ref.set({a: {value: 2}, b: {value: 1}, c: {value: 4}}, function () {
    //                    ref.child('b').set({value: 3}, function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'a', value: 2},
    //                            {'.key': 'b', value: 3},
    //                            {'.key': 'c', value: 4}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('moves an array record when it\'s order changes (moved to end of array) [orderByChild()]', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.orderByChild('value'), 'items');
    //
    //                var _this = this;
    //                ref.set({a: {value: 2}, b: {value: 1}, c: {value: 3}}, function () {
    //                    ref.child('b').set({value: 4}, function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'a', value: 2},
    //                            {'.key': 'c', value: 3},
    //                            {'.key': 'b', value: 4}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('works with orderByKey() queries', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref.orderByKey(), 'items');
    //
    //                var _this = this;
    //                ref.set({b: 2, c: 1, d: 3}, function () {
    //                    ref.update({a: 4, d: 4, e: 0}, function () {
    //                        expect(_this.state.items).to.deep.equal([
    //                            {'.key': 'a', '.value': 4},
    //                            {'.key': 'b', '.value': 2},
    //                            {'.key': 'c', '.value': 1},
    //                            {'.key': 'd', '.value': 4},
    //                            {'.key': 'e', '.value': 0}
    //                        ]);
    //
    //                        done();
    //                    });
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //});
    //
    //
    //describe('bindAsObject()', function () {
        //it('throws error given invalid Wilddog reference', function () {
        //    var TestComponent = React.createClass({
        //        mixins: [WildReactMixin],
        //
        //        componentWillMount: function () {
        //            var _this = this;
        //
        //            TH.invalidRefs.forEach(function (invalidFirebaseRef) {
        //                expect(function () {
        //                    _this.bindAsObject(invalidFirebaseRef, 'items');
        //                }).to.throw('WildReactMixin: Invalid Wilddog reference');
        //            });
        //        },
        //
        //        render: function () {
        //            return React.DOM.div(null);
        //        }
        //    });
        //
        //    shallowRenderer.render(React.createElement(TestComponent));
        //});
    //
    //    it('throws error given invalid bind variable', function () {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                var _this = this;
    //
    //                TH.invalidBindVars.forEach(function (invalidBindVar) {
    //                    expect(function () {
    //                        _this.bindAsObject(ref, invalidBindVar);
    //                    }).to.throw(/Bind variable/);
    //                });
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('throws error given an already bound bind variable', function () {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                var _this = this;
    //
    //                expect(function () {
    //                    _this.bindAsObject(ref, 'items');
    //                    _this.bindAsObject(ref, 'items');
    //                }).to.throw('this.state.items is already bound to a Wilddog reference');
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds to an object', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsObject(ref.child('items'), 'items');
    //
    //                var obj = {
    //                    first: {index: 0},
    //                    second: {index: 1},
    //                    third: {index: 2}
    //                };
    //
    //                ref.child('items').set(obj, function () {
    //                    obj['.key'] = 'items';
    //                    expect(this.state.items).to.deep.equal(obj);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds to a primitive', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsObject(ref.child('items'), 'items');
    //
    //                ref.child('items').set('foo', function () {
    //                    expect(this.state.items).to.deep.equal({
    //                        '.key': 'items',
    //                        '.value': 'foo'
    //                    });
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds to Wilddog references with no data', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsObject(ref.child('items'), 'items');
    //
    //                ref.child('items').set(null, function () {
    //                    expect(this.state.items).to.deep.equal({
    //                        '.key': 'items',
    //                        '.value': null
    //                    });
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('sets the key as null when bound to the root of the database', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                var rootRef = ref.root();
    //
    //                this.bindAsObject(rootRef, 'item');
    //
    //                rootRef.set('foo', function () {
    //                    expect(this.state.item).to.deep.equal({
    //                        '.key': null,
    //                        '.value': 'foo'
    //                    });
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds with limit queries', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsObject(ref.child('items').limitToLast(2), 'items');
    //
    //                ref.child('items').set({
    //                    first: {index: 0},
    //                    second: {index: 1},
    //                    third: {index: 2}
    //                }, function () {
    //                    expect(this.state.items).to.deep.equal({
    //                        '.key': 'items',
    //                        second: {index: 1},
    //                        third: {index: 2}
    //                    });
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds multiple Wilddog references to state variables at the same time', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsObject(ref.child('items0'), 'bindVar0');
    //                this.bindAsObject(ref.child('items1'), 'bindVar1');
    //
    //                var items0 = {
    //                    first: {index: 0},
    //                    second: {index: 1},
    //                    third: {index: 2}
    //                };
    //
    //                var items1 = {
    //                    bar: {
    //                        foo: 'baz'
    //                    },
    //                    baz: true,
    //                    foo: 100
    //                };
    //
    //                ref.set({
    //                    items0: items0,
    //                    items1: items1
    //                }, function () {
    //                    items0['.key'] = 'items0';
    //                    expect(this.state.bindVar0).to.deep.equal(items0);
    //
    //                    items1['.key'] = 'items1';
    //                    expect(this.state.bindVar1).to.deep.equal(items1);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('binds a mixture of arrays and objects to state variables at the same time', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsObject(ref.child('items0'), 'bindVar0');
    //                this.bindAsArray(ref.child('items1'), 'bindVar1');
    //
    //                var items0 = {
    //                    first: {index: 0},
    //                    second: {index: 1},
    //                    third: {index: 2}
    //                };
    //
    //                var items1 = {
    //                    bar: {
    //                        foo: 'baz'
    //                    },
    //                    baz: true,
    //                    foo: 100
    //                };
    //
    //                ref.set({
    //                    items0: items0,
    //                    items1: items1
    //                }, function () {
    //                    items0['.key'] = 'items0';
    //                    expect(this.state.bindVar0).to.deep.equal(items0);
    //
    //                    expect(this.state.bindVar1).to.deep.equal([
    //                        {'.key': 'bar', foo: 'baz'},
    //                        {'.key': 'baz', '.value': true},
    //                        {'.key': 'foo', '.value': 100}
    //                    ]);
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //});
    //
    //
    describe('unbind()', function () {
        //it('throws error given invalid bind variable', function () {
        //    var TestComponent = React.createClass({
        //        mixins: [WildReactMixin],
        //
        //        componentWillMount: function () {
        //            var _this = this;
        //
        //            TH.invalidBindVars.forEach(function (invalidBindVar) {
        //                expect(function () {
        //                    _this.unbind(invalidBindVar);
        //                }).to.throw(/Bind variable/);
        //            });
        //        },
        //
        //        render: function () {
        //            return React.DOM.div(null);
        //        }
        //    });
        //
        //    shallowRenderer.render(React.createElement(TestComponent));
        //});
    //
    //    it('throws error given unbound bind variable', function () {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                var _this = this;
    //
    //                expect(function () {
    //                    _this.unbind('items');
    //                }).to.throw('this.state.items is not bound to a Wilddog reference');
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('unbinds the state bound to Wilddog as an array', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsArray(ref, 'items');
    //
    //                ref.set({
    //                    first: {index: 0},
    //                    second: {index: 1},
    //                    third: {index: 2}
    //                }, function () {
    //                    this.unbind('items', function () {
    //                        expect(this.state.items).to.be.undefined;
    //                        done();
    //                    });
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('unbinds the state bound to Wilddog as an object', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsObject(ref, 'items');
    //
    //                ref.set({
    //                    first: {index: 0},
    //                    second: {index: 1},
    //                    third: {index: 2}
    //                }, function () {
    //                    this.unbind('items', function () {
    //                        expect(this.state.items).to.be.undefined;
    //                        done();
    //                    });
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('unbinds the state bound to Wilddog limit query', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                this.bindAsObject(ref, 'items');
    //
    //                ref.set({
    //                    first: {index: 0},
    //                    second: {index: 1},
    //                    third: {index: 2}
    //                }, function () {
    //                    this.unbind('items', function () {
    //                        expect(this.state.items).to.be.undefined;
    //                        done();
    //                    });
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
    //    it('unbinds all bound state when the component unmounts', function (done) {
    //        var TestComponent = React.createClass({
    //            mixins: [WildReactMixin],
    //
    //            componentWillMount: function () {
    //                sinon.spy(this, 'unbind');
    //
    //                this.bindAsArray(ref, 'items0');
    //                this.bindAsObject(ref, 'items1');
    //
    //                ref.set({
    //                    first: {index: 0},
    //                    second: {index: 1},
    //                    third: {index: 2}
    //                }, function () {
    //                    shallowRenderer.unmount();
    //
    //                    expect(this.unbind).to.have.been.calledTwice;
    //                    expect(this.unbind.args[0][0]).to.equal('items0');
    //                    expect(this.unbind.args[1][0]).to.equal('items1');
    //
    //                    done();
    //                }.bind(this));
    //            },
    //
    //            render: function () {
    //                return React.DOM.div(null);
    //            }
    //        });
    //
    //        shallowRenderer.render(React.createElement(TestComponent));
    //    });
    //
        it('handles already unbound state when the component unmounts', function (done) {
            var TestComponent = React.createClass({
                mixins: [WildReactMixin],

                componentWillMount: function () {
                    sinon.spy(this, 'unbind');

                    this.bindAsArray(ref, 'items0');
                    this.bindAsObject(ref, 'items1');

                    ref.set({
                        first: {index: 0},
                        second: {index: 1},
                        third: {index: 2}
                    }, function () {
                        this.unbind('items0');

                        shallowRenderer.unmount();

                        expect(this.unbind).to.have.been.calledTwice;
                        expect(this.unbind.args[0][0]).to.equal('items0');
                        expect(this.unbind.args[1][0]).to.equal('items1');

                        done();
                    }.bind(this));
                },

                render: function () {
                    return React.DOM.div(null);
                }
            });

            shallowRenderer.render(React.createElement(TestComponent));
        });
    });
});
