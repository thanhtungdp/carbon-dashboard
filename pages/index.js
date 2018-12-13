import { inject, observer } from 'mobx-react'
import Layout from '../layout'
import { StickyContainer, Sticky } from 'react-sticky'
import Search from 'carbon-components-react/lib/components/Search'
import { autobind } from 'core-decorators'
import Table from 'carbon-components-react/lib/components/Table'
import TableHead from 'carbon-components-react/lib/components/TableHead'
import TableRow from 'carbon-components-react/lib/components/TableRow'
import TableHeader from 'carbon-components-react/lib/components/TableHeader'
import TableBody from 'carbon-components-react/lib/components/TableBody'
import TableData from 'carbon-components-react/lib/components/TableData'
import DataTableSkeleton from 'carbon-components-react/lib/components/StructuredList/StructuredList.Skeleton'
import PaginationV2 from 'carbon-components-react/lib/components/Pagination'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

const HeadingSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: 8px;
`

const WhiteBox = styled.div`
  background-color: #fff;
`

@inject('userStore')
@observer
@autobind
export default class PageIndex extends React.Component {
  constructor(props) {
    super(props)
    this.searchText = ''
    this.isSearchMode = false
    this.search = debounce(this.handleSearch, 300)
  }

  componentDidMount() {
    this.props.userStore.sort = { createdAt: -1 }
    this.props.userStore.select = { email: 0 }
    this.props.userStore.getList({ page: 1 })
  }

  handleChange = ({ page, pageSize }) => {
    this.props.userStore.pageSize = pageSize
    this.props.userStore.getList({ page })
  }

  handleSearch() {
    this.props.userStore.setQuery(
      this.props.userStore.replaceSeachPattern(this.searchText)
    )
    this.props.userStore.getList({ page: 1 })
  }

  handleChangeSearch(e) {
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

  render() {
    const { isLoading, isLoaded, data } = this.props.userStore.list
    return (
      <Layout>
        <StickyContainer>
          <Sticky>
            {props => (
              <HeadingSearch {...props} style={{ ...props.style, top: 40 }}>
                <div>
                  <Search
                    onChange={this.handleChangeSearch}
                    labelText="Search"
                    placeHolderText="Search ..."
                  />
                </div>
                {isLoaded && (
                  <PaginationV2
                    pageSizes={[20, 50]}
                    onChange={this.handleChange}
                    totalItems={this.props.userStore.list.pagination.totalItems}
                    page={this.props.userStore.list.pagination.page}
                  />
                )}
              </HeadingSearch>
            )}
          </Sticky>
          {!isLoaded && (
            <DataTableSkeleton rowCount={5} columnCount={4} zebra />
          )}
          {isLoaded && (
            <Table>
              <TableHead>
                <TableRow header>
                  <TableHeader>First Name</TableHeader>
                  <TableHeader>Last Name</TableHeader>
                  <TableHeader>House</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(user => (
                  <TableRow key={user._id}>
                    <TableData>{user.username}</TableData>
                    <TableData>{user.fullname}</TableData>
                    <TableData>{user.email}</TableData>
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
