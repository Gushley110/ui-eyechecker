import axios from 'axios';
import * as CONSTANT from './constants'

export default axios.create({
  baseURL: CONSTANT.API_URL
});