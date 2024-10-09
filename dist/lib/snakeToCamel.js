"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformKeys = exports.snakeToCamel = void 0;
const snakeToCamel = (input) => {
    return input.replace(/([-_][a-z,0-9])/g, (match) => match.toUpperCase().replace(/[-_]/g, ''));
};
exports.snakeToCamel = snakeToCamel;
const transformKeys = (input) => {
    if (Array.isArray(input)) {
        return input.map(item => (0, exports.transformKeys)(item));
    }
    else if (typeof input === 'object' && input !== null) {
        return Object.keys(input).reduce((acc, key) => {
            const value = input[key];
            const camelCaseKey = (0, exports.snakeToCamel)(key);
            acc[camelCaseKey] = (value && typeof value === 'object') ? (0, exports.transformKeys)(value) : value;
            return acc;
        }, {});
    }
    else {
        return input;
    }
};
exports.transformKeys = transformKeys;
