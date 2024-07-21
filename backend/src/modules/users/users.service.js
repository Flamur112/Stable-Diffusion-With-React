"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
// the logic for the users.controller.ts
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1() {
            this.users = [
                {
                    "id": 1,
                    "name": "John Doe",
                    "email": "john.doe@example.com",
                    "role": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "Jane Smith",
                    "email": "jane.smith@example.com",
                    "role": "ENGINEER"
                },
                {
                    "id": 3,
                    "name": "Michael Johnson",
                    "email": "michael.johnson@example.com",
                    "role": "INTERN"
                },
                {
                    "id": 4,
                    "name": "Emily Brown",
                    "email": "emily.brown@example.com",
                    "role": "ENGINEER"
                },
                {
                    "id": 5,
                    "name": "Alexis Davis",
                    "email": "alexis.davis@example.com",
                    "role": "ADMIN"
                }
            ];
        }
        UsersService_1.prototype.findAll = function (role) {
            if (role) { // if role is truthy (if it has a value)
                var rolesArray = this.users.filter(function (user) { return user.role === role; }); // return this.database.filter out. The user => is calling the user method and then for every user with role property equal to the role. If role is === to the role of the users 'role' property then return the users whole array.
                if (rolesArray.length === 0)
                    throw new common_2.NotFoundException('User Role Not Found');
                return rolesArray;
            }
            return this.users; // return the entire array of users stored in the UsersService class.
        };
        UsersService_1.prototype.findOne = function (id) {
            var user = this.users.find(function (user) { return user.id === id; }); // finds and locates the first element of the user.id that is equal to the number.
            if (!user)
                throw new common_2.NotFoundException('User Not Found');
            return user;
        };
        UsersService_1.prototype.create = function (CreateUserDto) {
            var usersByHighestId = __spreadArray([], this.users, true).sort(function (a, b) { return b.id - a.id; }); // making sure and setting usersByHighestId[0] will have the highest 'id'.
            var newUser = __assign({ id: usersByHighestId[0].id + 1 }, CreateUserDto);
            this.users.push(newUser); // add the new array to the end of the user.id 
            return newUser;
        };
        UsersService_1.prototype.update = function (id, UpdateUserDto) {
            this.users = this.users.map(function (user) {
                if (user.id === id) {
                    return __assign(__assign({}, user), UpdateUserDto);
                }
                return user;
            });
            return this.findOne(id);
        };
        UsersService_1.prototype.delete = function (id) {
            var removedUser = this.findOne(id);
            this.users = this.users.filter(function (user) { return user.id !== id; }); // the user.id that you chose will
            return removedUser;
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
