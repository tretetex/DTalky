const CONTRACT_ADDRESS = "n1xweo841eADoXjrvkx7a4hmoNDcyL9YwjE";

class SmartContractApi {
    constructor(contractAdress) {
        let NebPay = require("nebpay");
        this.nebPay = new NebPay();
        this._contractAdress = contractAdress || CONTRACT_ADDRESS;
    }

    getContractAddress() {
        return this.contractAdress;
    }

    _simulateCall({
        value = "0",
        callArgs = "[]",
        callFunction,
        callback
    }) {
        this.nebPay.simulateCall(this._contractAdress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            }
        });
    }

    _call({
        value = "0",
        callArgs = "[]",
        callFunction,
        callback
    }) {
        this.nebPay.call(this._contractAdress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            }
        });
    }
}

class ContractApi extends SmartContractApi {
    getMessages(cb) {
        this._simulateCall({
            callFunction: "getMessages",
            callback: cb
        });
    }

    getMyMessages(cb) {
        this._simulateCall({
            callFunction: "getMyMessages",
            callback: cb
        });
    }

    getUserMessages(wallet, cb) {
        this._simulateCall({
            callArgs: `["${wallet}"]`,
            callFunction: "getUserMessages",
            callback: cb
        });;
    }

    add(message, cb) {
        this._call({
            callArgs: `["${message}"]`,
            callFunction: "add",
            callback: cb
        });
    }

    remove(id, cb) {
        this._call({
            callArgs: `[${id}]`,
            callFunction: "remove",
            callback: cb
        });
    }

    like(id, cb) {
        this._call({
            callArgs: `[${id}]`,
            callFunction: "like",
            callback: cb
        });
    }

    getMembersInLastDay(cb) {
        this._simulateCall({
            callFunction: "getMembersInLastDay",
            callback: cb
        });
    }
}