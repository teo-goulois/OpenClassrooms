/**
 * @typedef {Object} Product
 * @property {string[]} colors
 * @property {string} _id
 * @property {string} name
 * @property {number} price
 * @property {string} imageUrl
 * @property {string} description
 * @property {string} altTxt
 */

/**
 * @typedef {Object} CartProducts
 * @property {string} id
 * @property {CartProductDetails[]} products
 */

/**
 * @typedef CartProductDetails
 * @property {string} color
 * @property {number} quantity 
 */