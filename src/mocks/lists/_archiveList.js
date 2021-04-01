import { useSelector } from 'react-redux';
import lists from '../../data/lists';

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
   * You can also return a response asynchronously
   * @param { MockMethodParams }
   * @returns { Promise<MockResponse> }
   */
  async delete({ params }) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const archivedList = lists.find(list => list._id === params.id);
    const updatedLists = lists.filter(list => list._id !== params.id);
    console.log('===============');
    console.log('[Axios] updatedLists:',updatedLists);
    console.log('===============');
    return [201, archivedList ];
  }
}
