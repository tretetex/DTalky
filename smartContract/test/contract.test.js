var assert = require("assert")
let Stubs = require("../contractStubs.js");
let Contract = require("../contract.js");

var Blockchain = Stubs.Blockchain;
var LocalContractStorage = Stubs.LocalContractStorage;
Blockchain.changeTransactionAfterGet = false;

function createContract() {
    let contract = new Contract();
    contract.init();
    return contract;
};

let contract = createContract();
let post = {
    text: "test",
    labels: ["q", "w", "r", "t", "y"],
    added: new Date()
};

let id0 = contract.add(JSON.stringify(post));
let id1 = contract.add(JSON.stringify(post));
let id2 = contract.add(JSON.stringify(post));

describe('SmartContract test', function () {
    describe('getMyMessages()', function () {
        let items = contract.getMyMessages();

        it('items count is 3', function () {
            assert.equal(items.length, 3);
        });
    });

    describe('getUserMessages()', function () {
        describe('with added wallet', function () {
            let items = contract.getUserMessages(Blockchain.transaction.from);

            it('items count is 3', function () {
                assert.equal(items.length, 3);
            });
        });
        describe('with not added wallet', function () {
            let items = contract.getUserMessages("qqq");

            it('items count is 0', function () {
                assert.equal(items.length, 0);
            });
        });
    });

    describe('like()', function () {
        it('added', function () {
            let likesCount = contract.like(0);
            assert.equal(likesCount, 1);
        });
    });

    describe('add()', function () {

        describe('add 3 items', function () {
            let id0 = contract.add(JSON.stringify(post));
            let id1 = contract.add(JSON.stringify(post));
            let id2 = contract.add(JSON.stringify(post));

            let items = contract.getMyMessages();

            it('return id', function () {
                assert.equal(id0, 3);
                assert.equal(id1, 4);
                assert.equal(id2, 5);
            });
            it('items count is 6', function () {
                assert.equal(items.length, 6);
            });
        });
    });

    describe('getMembersInLastDay()', function () {
        it('is 1', function () {
            let members = contract.getMembersInLastDay();
            assert.equal(members.length, 1);
        });
    });

    describe('getMessages()', function () {
        describe('last 10 posts', function () {
            let items = contract.getMessages();

            it('items count is 6', function () {
                assert.equal(items.length, 6);
            });
        });
    });

    describe('remove()', function () {
        describe('other post', function () {
            it('can not remove', function () {
                function makeTest() {
                    contract.remove(1)
                }
                assert.throws(makeTest);
            });
        });
    });
});