import {take} from 'rxjs/operators';
import {Store} from './store';

interface OptionalSublevel {
    firstSublevel1?: {
        value1: string;
        value2: string;
        value3?: string;
    };
}

class TestStoreState {
    optionalSublevel?: OptionalSublevel = {};
    twoSublevels = {
        firstSublevel1: {
            secondSublevel1: {
                value1: 'twoSublevels-firstSublevel1-secondSublevel1: value1',
                value2: 'twoSublevels-firstSublevel1-secondSublevel1: value2',
            },
            secondSublevel2: {
                value1: 'twoSublevels-firstSublevel1-secondSublevel2: value1',
                value2: 'twoSublevels-firstSublevel1-secondSublevel2: value2',
            },
        },
    };
}

class TestStore extends Store<TestStoreState> {
    constructor() {
        super(new TestStoreState());
    }
}

interface TestStoreStateInterface {
    value1: string;
    value2: string;
    value3?: string;
    nullableTwoSublevels?: {
        firstSublevel1?: {
            secondSublevel1: {
                value1: string;
            };
        };
    };
    oneSublevel: {
        value1: string;
        value2: string;
        value3?: string;
    };
    twoSublevels?: {
        firstSublevel1: {
            secondSublevel1: {
                value1: string;
                value2: string;
                value3?: string;
            };
            secondSublevel2: {
                value1: string;
                value2: string;
                value3?: string;
            };
        };
        firstSublevel2: {
            secondSublevel1: {
                value1: string;
                value2: string;
                value3?: string;
            };
            secondSublevel2: {
                value1: string;
                value2: string;
                value3?: string;
            };
        };
        firstSublevel3?: {
            secondSublevel1: {
                value1: string;
                value2: string;
                value3?: string;
            };
            secondSublevel2: {
                value1: string;
                value2: string;
                value3?: string;
            };
        };
    };
    fiveSublevels?: {
        firstSublevel1: {
            secondSublevel1: {
                thirdSublevel1: {
                    fourthSublevel1: {
                        fifthSublevel1: {
                            value1: string;
                            value2: string;
                            value3?: string;
                        };
                        fifthSublevel2: {
                            value1: string;
                            value2: string;
                            value3?: string;
                        };
                    };
                    fourthSublevel2?: {
                        fifthSublevel1: {
                            value1: string;
                            value2: string;
                            value3?: string;
                        };
                    };
                };
            };
            secondSublevel2: {
                value1: string;
                value2: string;
                value3?: string;
            };
        };
    };
}

class TestStoreImplementingInterfaceState implements TestStoreStateInterface {
    value1 = 'root: value1';
    value2 = 'root: value2';
    oneSublevel = {
        value1: 'oneSublevel: value1',
        value2: 'oneSublevel: value2',
    };
    nullableTwoSublevels = {firstSublevel1: null};
    twoSublevels = {
        firstSublevel1: {
            secondSublevel1: {
                value1: 'twoSublevels-firstSublevel1-secondSublevel1: value1',
                value2: 'twoSublevels-firstSublevel1-secondSublevel1: value2',
            },
            secondSublevel2: {
                value1: 'twoSublevels-firstSublevel1-secondSublevel2: value1',
                value2: 'twoSublevels-firstSublevel1-secondSublevel2: value2',
            },
        },
        firstSublevel2: {
            secondSublevel1: {
                value1: 'twoSublevels-firstSublevel2-secondSublevel1: value1',
                value2: 'twoSublevels-firstSublevel2-secondSublevel1: value2',
            },
            secondSublevel2: {
                value1: 'twoSublevels-firstSublevel2-secondSublevel2: value1',
                value2: 'twoSublevels-firstSublevel2-secondSublevel2: value2',
            },
        },
    };
    fiveSublevels = {
        firstSublevel1: {
            secondSublevel1: {
                thirdSublevel1: {
                    fourthSublevel1: {
                        fifthSublevel1: {
                            value1:
                                'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel1-fifthSublevel1: value1',
                            value2:
                                'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel1-fifthSublevel1: value2',
                        },
                        fifthSublevel2: {
                            value1:
                                'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel1-fifthSublevel2: value1',
                            value2:
                                'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel1-fifthSublevel2: value2',
                        },
                    },
                },
            },
            secondSublevel2: {
                value1: 'fiveSublevels-firstSublevel1-secondSublevel2: value1',
                value2: 'fiveSublevels-firstSublevel1-secondSublevel2: value2',
            },
        },
    };
}

class TestStoreImplementingInterface extends Store<TestStoreStateInterface> {
    constructor() {
        super(new TestStoreImplementingInterfaceState());
    }
}

describe('Store', () => {
    describe('with state not implementing an interface', () => {
        let store: TestStore;

        beforeEach(() => {
            store = new TestStore();
        });

        it('should set state correctly via setState() call', () => {
            const mockedNewState = {
                twoSublevels: {
                    firstSublevel1: {
                        secondSublevel1: {
                            value1:
                                'twoSublevels-firstSublevel1-secondSublevel1: value1 updated',
                            value2:
                                'twoSublevels-firstSublevel1-secondSublevel1: value2 updated',
                        },
                        secondSublevel2: {
                            value1:
                                'twoSublevels-firstSublevel1-secondSublevel2: value1 updated',
                            value2:
                                'twoSublevels-firstSublevel1-secondSublevel2: value2 updated',
                        },
                    },
                },
            };
            store.setState(mockedNewState);
            expect(store.state).toEqual(mockedNewState);
        });

        it('should create values correctly on "optionalSublevel-firstSublevel1" when "optionalSublevel" === {}', () => {
            const newValue = 'optionalSublevel-firstSublevel1: value2 created';
            const expectedState = new TestStoreState();
            Object.assign(expectedState.optionalSublevel, {
                firstSublevel1: {value2: newValue},
            });
            store.patchState(
                newValue,
                'optionalSublevel',
                'firstSublevel1',
                'value2'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should update values correctly on "twoSublevels-firstSublevel1-secondSublevel2"', () => {
            const newValue =
                'twoSublevels-firstSublevel1-secondSublevel2: value2 updated';
            const expectedState = new TestStoreState();
            Object.assign(
                expectedState.twoSublevels.firstSublevel1.secondSublevel2,
                {value2: newValue}
            );
            store.patchState(
                newValue,
                'twoSublevels',
                'firstSublevel1',
                'secondSublevel2',
                'value2'
            );
            expect(store.state).toEqual(expectedState);
        });
    });

    describe('with state implementing an interface', () => {
        let store: TestStoreImplementingInterface;

        beforeEach(() => {
            store = new TestStoreImplementingInterface();
        });

        it('should set state correctly via setState() call', () => {
            const mockedNewState = {
                value1: 'root: value1 updated',
                value2: 'root: value2 updated',
                oneSublevel: {
                    value1: 'oneSublevel: value1 updated',
                    value2: 'oneSublevel: value2 updated',
                    value3: 'oneSublevel: value3 updated',
                },
            };
            store.setState(mockedNewState);
            expect(store.state).toEqual(mockedNewState);
        });

        it('should update values correctly on "root"', () => {
            const newValue = 'root: value1 updated';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(expectedState, {value1: newValue});
            store.patchState(newValue, 'value1');
            expect(store.state).toEqual(expectedState);
        });

        it('should create values correctly on "root" for non-existing paths', () => {
            const newValue = 'root: value3 created';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(expectedState, {value3: newValue});
            store.patchState(newValue, 'value3');
            expect(store.state).toEqual(expectedState);
        });

        it('should create values correctly on "nullableTwoSublevels" when "firstSublevel1" === null', () => {
            const newValue =
                'nullableTwoSublevels-firstSublevel1-secondSublevel1: value1 created';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(expectedState, {
                nullableTwoSublevels: {
                    firstSublevel1: {secondSublevel1: {value1: newValue}},
                },
            });
            store.patchState(
                newValue,
                'nullableTwoSublevels',
                'firstSublevel1',
                'secondSublevel1',
                'value1'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should update values correctly on "oneSublevel"', () => {
            const newValue = 'oneSublevel: value2 updated';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(expectedState.oneSublevel, {value2: newValue});
            store.patchState(newValue, 'oneSublevel', 'value2');
            expect(store.state).toEqual(expectedState);
        });

        it('should create values correctly on "oneSublevel" for non-existing paths', () => {
            const newValue = 'oneSublevel: value3 created';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(expectedState.oneSublevel, {value3: newValue});
            store.patchState(newValue, 'oneSublevel', 'value3');
            expect(store.state).toEqual(expectedState);
        });

        it('should update values correctly on "twoSublevels-firstSublevel1-secondSublevel1"', () => {
            const newValue =
                'twoSublevels-firstSublevel1-secondSublevel1: value1 updated';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(
                expectedState.twoSublevels.firstSublevel1.secondSublevel1,
                {value1: newValue}
            );
            store.patchState(
                newValue,
                'twoSublevels',
                'firstSublevel1',
                'secondSublevel1',
                'value1'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should create values correctly on "twoSublevels-firstSublevel1-secondSublevel1" for non-existing paths', () => {
            const newValue =
                'twoSublevels-firstSublevel1-secondSublevel1: value3 created';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(
                expectedState.twoSublevels.firstSublevel1.secondSublevel1,
                {value3: newValue}
            );
            store.patchState(
                newValue,
                'twoSublevels',
                'firstSublevel1',
                'secondSublevel1',
                'value3'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should update values correctly on "twoSublevels-firstSublevel2-secondSublevel2"', () => {
            const newValue =
                'twoSublevels-firstSublevel2-secondSublevel2: value2 updated';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(
                expectedState.twoSublevels.firstSublevel2.secondSublevel2,
                {value2: newValue}
            );
            store.patchState(
                newValue,
                'twoSublevels',
                'firstSublevel2',
                'secondSublevel2',
                'value2'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should create values correctly on "twoSublevels-firstSublevel2-secondSublevel2" for non-existing paths', () => {
            const newValue =
                'twoSublevels-firstSublevel2-secondSublevel2: value3 created';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(
                expectedState.twoSublevels.firstSublevel2.secondSublevel2,
                {value3: newValue}
            );
            store.patchState(
                newValue,
                'twoSublevels',
                'firstSublevel2',
                'secondSublevel2',
                'value3'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should create values correctly on "twoSublevels" for non-existing paths', () => {
            const newValue = {
                secondSublevel1: {
                    value1:
                        'twoSublevels-firstSublevel3-secondSublevel1: value1 created',
                    value2:
                        'twoSublevels-firstSublevel3-secondSublevel1: value2 created',
                },
                secondSublevel2: {
                    value1:
                        'twoSublevels-firstSublevel3-secondSublevel2: value1 created',
                    value2:
                        'twoSublevels-firstSublevel3-secondSublevel2: value2 created',
                },
            };
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(expectedState.twoSublevels, {
                firstSublevel3: newValue,
            });
            store.patchState(newValue, 'twoSublevels', 'firstSublevel3');
            expect(store.state).toEqual(expectedState);
        });

        it('should update values correctly on "fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel1-fifthSublevel1"', () => {
            const newValue =
                'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel1-fifthSublevel1: value2 updated';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(
                expectedState.fiveSublevels.firstSublevel1.secondSublevel1
                    .thirdSublevel1.fourthSublevel1.fifthSublevel1,
                {value2: newValue}
            );
            store.patchState(
                newValue,
                'fiveSublevels',
                'firstSublevel1',
                'secondSublevel1',
                'thirdSublevel1',
                'fourthSublevel1',
                'fifthSublevel1',
                'value2'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should create values correctly on "fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel1-fifthSublevel2" for non-existing paths', () => {
            const newValue =
                'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel1-fifthSublevel2: value3 created';
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(
                expectedState.fiveSublevels.firstSublevel1.secondSublevel1
                    .thirdSublevel1.fourthSublevel1.fifthSublevel2,
                {value3: newValue}
            );
            store.patchState(
                newValue,
                'fiveSublevels',
                'firstSublevel1',
                'secondSublevel1',
                'thirdSublevel1',
                'fourthSublevel1',
                'fifthSublevel2',
                'value3'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should create values correctly on "fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1" for non-existing paths', () => {
            const newValue = {
                fifthSublevel1: {
                    value1:
                        'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel2-fifthSublevel1: value1 created',
                    value2:
                        'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel2-fifthSublevel1: value2 created',
                    value3:
                        'fiveSublevels-firstSublevel1-secondSublevel1-thirdSublevel1-fourthSublevel2-fifthSublevel1: value3 created',
                },
            };
            const expectedState = new TestStoreImplementingInterfaceState();
            Object.assign(
                expectedState.fiveSublevels.firstSublevel1.secondSublevel1
                    .thirdSublevel1,
                {fourthSublevel2: newValue}
            );
            store.patchState(
                newValue,
                'fiveSublevels',
                'firstSublevel1',
                'secondSublevel1',
                'thirdSublevel1',
                'fourthSublevel2'
            );
            expect(store.state).toEqual(expectedState);
        });

        it('should get values on "twoSublevels-firstSublevel1-secondSublevel1"', done => {
            const result = [];
            store.onChanges('twoSublevels', 'firstSublevel1', 'secondSublevel1', 'value1')
                .pipe(take(2))
                .subscribe({
                    next(val) {
                        result.push(val);
                    },
                    complete() {
                        expect(result).toEqual([
                            'twoSublevels-firstSublevel1-secondSublevel1: value1',
                            'twoSublevels-firstSublevel1-secondSublevel1: value1 patched'
                        ]);
                        done();
                    }
                });

            store.patchState(
                'twoSublevels-firstSublevel1-secondSublevel1: value1 patched',
                'twoSublevels',
                'firstSublevel1',
                'secondSublevel1',
                'value1'
            );
        });

        it('should skip unchanged value on "oneSublevel"', done => {
            const result = [];
            store.onChanges('oneSublevel', 'value1')
                .pipe(take(2))
                .subscribe({
                    next(val) {
                        result.push(val);
                    },
                    complete() {
                        expect(result).toEqual([
                            'oneSublevel: value1',
                            'oneSublevel: value1 patched'
                        ]);
                        done();
                    }
                });

            store.patchState('oneSublevel: value1', 'oneSublevel', 'value1');
            store.patchState('oneSublevel: value1 patched', 'oneSublevel', 'value1');
        });

        it('should get null value on "nullableTwoSublevels-firstSublevel1"', done => {
            const result = [];
            store.onChanges('nullableTwoSublevels', 'firstSublevel1')
                .pipe(take(2))
                .subscribe({
                    next(val) {
                        result.push(val);
                    },
                    complete() {
                        expect(result).toEqual([
                            null,
                            {secondSublevel1: {value1: ''}}
                        ]);
                        done();
                    }
                });

            store.patchState({secondSublevel1: {value1: ''}}, 'nullableTwoSublevels', 'firstSublevel1');
        });

        it('should get undefined value on "nullableTwoSublevels" when "firstSublevel1" === null', done => {
            const result = [];
            store.onChanges('nullableTwoSublevels', 'firstSublevel1', 'secondSublevel1', 'value1')
                .pipe(take(2))
                .subscribe({
                    next(val) {
                        result.push(val);
                    },
                    complete() {
                        expect(result).toEqual([
                            undefined,
                            'value1'
                        ]);
                        done();
                    }
                });

            store.patchState({secondSublevel1: {value1: 'value1'}}, 'nullableTwoSublevels', 'firstSublevel1');
        });

        it('should skip unchanged object (same reference) on "oneSublevel"', done => {
            const result = [];
            const initialValue = {value1: 'value1', value2: 'value2'};
            store.patchState(initialValue, 'oneSublevel');
            store.onChanges('oneSublevel')
                .pipe(take(2))
                .subscribe({
                    next(val) {
                        result.push(val);
                    },
                    complete() {
                        expect(result).toEqual([
                            initialValue,
                            {value1: 'value1 patched', value2: 'value2'}
                        ]);
                        done();
                    }
                });

            store.patchState(initialValue, 'oneSublevel');
            store.patchState({value1: 'value1 patched', value2: 'value2'}, 'oneSublevel');
        });
    });
});
