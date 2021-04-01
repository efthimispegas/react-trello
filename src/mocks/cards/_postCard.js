import cards from '../../data/cards';
import { v4 as uuidv4 } from 'uuid';

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
  async post({ data }) {
    console.log('===============');
    console.log('[Axios] data:',data);
    console.log('===============');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newCard = {
      _id: uuidv4(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      list_id: data.list_id
    };
    cards.push(newCard);

    return [201, {cards, card: newCard}];
  }
};
