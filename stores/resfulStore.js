import { action, observable } from 'mobx'
import queryString from 'query-string'
import paginationConfig from 'config/pagination'
import { promiseAll } from 'utils/promise'
import axios from 'utils/axios'
import { API_ADMIN } from 'config'

function getUrl (model, path) {
  return `${API_ADMIN}/${model}${path}`
}

export default class ResfulStore {
  /**
   * Define models resful API
   */
  model = 'base'

  /**
   * Get list resful for data with pagination
   */
  @observable list = {
    data: [],
    isLoading: false,
    isLoaded: false,
    pagination: {
      totalItems: 0,
      pageSize: paginationConfig.pageSize,
      page: 1
    }
  }

  /**
   * Options for query data
   */
  query = {}
  sort = null
  select = null
  pageSize = paginationConfig.pageSize

  /**
   * Search keys and patterns
   */
  searchKeys = [] // like username, email, ...
  searchPattern = '^($1)' // regex default pattern

  constructor () {
    this.api = path => getUrl(this.model, path)
  }

  /**
   * Set query
   */
  setQuery (query) {
    this.query = query
    return this.query
  }

  replaceSeachPattern (search) {
    let query = {
      $or: []
    }
    this.searchKeys.map(searchKey => {
      query.$or.push({
        [searchKey]: {
          $regex: this.searchPattern.replace('$1', search)
        }
      })
    })
    return query
  }

  @action async getList ({ page = 1 } = {}) {
    let queryPagination = {
      limit: this.pageSize,
      skip: (page - 1) * this.pageSize,
      sort: this.short ? JSON.stringify(this.sort) : null,
      select: this.select ? JSON.stringify(this.select) : null,
      query: JSON.stringify(this.query)
    }
    this.list.isLoading = true
    const queryParams = queryString.stringify(queryPagination)
    if (page === 1) {
      const {
        count: {
          data: { count: totalItems }
        },
        list: { data: list }
      } = await promiseAll({
        count: axios.get(this.api(`/count?${queryParams}`)),
        list: axios.get(this.api(`/?${queryParams}`))
      })
      this.list = {
        data: list,
        isLoading: false,
        isLoaded: true,
        pagination: {
          totalItems: totalItems,
          pageSize: this.pageSize,
          page
        }
      }
    } else {
      this.list.data = (await axios.get(this.api(`/?${queryParams}`))).data
      this.list.pagination = {
        totalItems: this.list.pagination.totalItems,
        pageSize: this.pageSize,
        page
      }
      this.list.isLoading = false
    }
  }
}
