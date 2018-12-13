import { inject, observer } from 'mobx-react'
import Layout from '../layout'
import { StickyContainer, Sticky } from 'react-sticky'
import Search from 'carbon-components-react/lib/components/Search'
import { autobind } from 'core-decorators'
import DataTable, {
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
} from 'carbon-components-react/lib/components/DataTable'
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton'
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

@inject('testStore')
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
    this.props.testStore.sort = { createdAt: -1 }
    this.props.testStore.select = { questions: 0 }
    this.props.testStore.getList({ page: 1 })
  }

  handleChange = ({ page, pageSize }) => {
    this.props.testStore.pageSize = pageSize
    this.props.testStore.getList({ page })
  }

  handleSearch() {
    this.props.testStore.setQuery(
      this.props.testStore.replaceSeachPattern(this.searchText)
    )
    this.props.testStore.getList({ page: 1 })
  }

  handleChangeSearch(e) {
    this.searchText = e.target.value
    if (this.searchText) {
      this.isSearchMode = true
      this.search()
    } else {
      this.isSearchMode = false
      this.props.testStore.setQuery({})
      this.props.testStore.getList({ page: 1 })
    }
  }

  renderItem({
    rows,
    headers,
    getTableProps,
    getSelectionProps,
    getHeaderProps,
    getRowProps,
  }) {
    return (
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            <TableSelectAll {...getSelectionProps()} />
            {headers.map(header => (
              <TableHeader {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow {...getRowProps({ row })} key={row.id}>
              <TableSelectRow {...getSelectionProps({ row })} />
              {row.cells.map(cell => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  render() {
    const { isLoading, isLoaded, data } = this.props.testStore.list
    return (
      <Layout>
        <HeadingSearch>
          <h2 style={{ fontWeight: 600 }}>Tests</h2>
          <div>
            <Search
              onChange={this.handleChangeSearch}
              labelText="Search"
              placeHolderText="Search ..."
            />
          </div>
        </HeadingSearch>
        {(!isLoaded || isLoading) && (
          <DataTableSkeleton rowCount={5} columnCount={4} zebra />
        )}
        {isLoaded && !isLoading && (
          <DataTable
            rows={data.map(u => ({
              ...u,
              id: u._id,
            }))}
            headers={[
              { key: 'title', header: 'Title' },
              { key: 'description', header: 'Description' },
              { key: 'port', header: 'Action' },
            ]}
            render={this.renderItem}
          />
        )}
        {isLoaded && (
          <div style={{ position: 'fixed', bottom: 0, left: 24, right: 24 }}>
            <PaginationV2
              pageSizes={[20, 50]}
              onChange={this.handleChange}
              totalItems={this.props.testStore.list.pagination.totalItems}
              page={this.props.testStore.list.pagination.page}
            />
          </div>
        )}
      </Layout>
    )
  }
}
