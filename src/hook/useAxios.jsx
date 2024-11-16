import axios from 'axios'
import { API_TOKEN, URL } from './useEnv'

export const useAxios = () => axios.create({ baseURL: URL, headers: { "Authorization": `Bearer ${API_TOKEN}` } })