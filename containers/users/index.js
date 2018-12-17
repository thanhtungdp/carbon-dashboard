import React from 'react'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'
import debounce from 'lodash/debounce'
import { StickyContainer, Sticky } from 'react-sticky'
import Layout from 'layout'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableSkeleton
} from 'components/data-manager/table-basic'
import Action from './Action'
import SearchPagination from 'components/data-manager/search-pagination'
import ReactTimeAgo from 'react-timeago'

export default
@inject('userStore')
@observer
@autobind
class UsersManager extends React.Component {
  static async getInitialProps ({ mobxStores }) {
    mobxStores.userStore.sort = { createdAt: -1 }
    const users = await mobxStores.userStore.getList()
    return { users }
  }

  constructor (props) {
    super(props)
    this.searchText = ''
    this.isSearchMode = false
    this.search = debounce(this.handleSearch, 300)
  }

  handleChangePagination = ({ page, pageSize }) => {
    this.props.userStore.pageSize = pageSize
    this.props.userStore.getList({ page })
  }

  handleSearch () {
    this.props.userStore.setQuery(
      this.props.userStore.replaceSeachPattern(this.searchText)
    )
    this.props.userStore.getList({ page: 1 })
  }

  handleChangeSearch (e) {
    this.searchText = e.target.value
    if (this.searchText) {
      this.isSearchMode = true
      this.search()
    } else {
      this.isSearchMode = false
      this.props.userStore.setQuery({})
      this.props.userStore.getList({ page: 1 })
    }
  }

  render () {
    const { isLoaded, data } = this.props.userStore.list
    return (
      <Layout>
        <StickyContainer>
          <Sticky>
            {props => (
              <div style={{ ...props.style, top: 40 }}>
                <SearchPagination
                  onChangeSearch={this.handleChangeSearch}
                  onChangePagination={this.handleChangePagination}
                  totalItems={this.props.userStore.list.pagination.totalItems}
                  page={this.props.userStore.list.pagination.page}
                  isPagination={isLoaded}
                />
              </div>
            )}
          </Sticky>
          {!isLoaded && <TableSkeleton rowCount={5} columnCount={4} zebra />}
          {isLoaded && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Fullname</TableHeader>
                  <TableHeader>Created at</TableHeader>
                  <TableHeader>Updated at</TableHeader>
                  <TableHeader>IsFb</TableHeader>
                  <TableHeader />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>
                      <ReactTimeAgo date={user.createdAt} />
                    </TableCell>
                    <TableCell>
                      <ReactTimeAgo date={user.updatedAt} />
                    </TableCell>
                    <TableCell>{user.facebookID ? 'FB' : ''}</TableCell>
                    <TableCell>
                      <Action userId={user._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </StickyContainer>
      </Layout>
    )
  }
}
