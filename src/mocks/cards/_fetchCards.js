import cards from '../../data/cards';

/**
 * Type definitions for variables passed as arguments in requests
 * @typedef { Object } MockMethodParams
 * @property { import('axios').AxiosRequestConfig } config axios request settings
 * @property {{ [key: string]: string | number }} values Dynamic value of the requested URL (underscore part of the path)
 * @property {{ [key: string]: any }} params The value of the query parameter for the requested URL
 * @property { any } data Request data sent by POST etc.
 */

/**
 * Type definition when response is returned as an object
 * @typedef { Object } MockResponseObject
 * @property { number } status HTTP response status code
 * @property { any? } data Response data
 * @property {{ [key: string]: any }?} headers Response header
 */

/**
 * Response type definition
 * @typedef { [number, any?, { [key: string]: any }?] | MockResponseObject } MockResponse
 */

export default {
  /**
   * All methods such as GET and POST have the same type
   * @param { MockMethodParams }
   * @returns { MockResponse }
   */
  get() {
    return [200, cards];
  }
};
