// REGEX CONSTANTS

export const isInteger = /^[1-9]\d*$/; // true if number
export const isAlphaAndSingleSpace = /^[A-Z\d]+(?: [A-Z\d]+)$/; // true if alpha and one space between words

// for replacer functions
export const regexNumbersOnly = /\D/;
export const regexAlphaOnly = /[^A-Z+ A-Z+]/;

// /[^a-zA-Z+\s]/g
