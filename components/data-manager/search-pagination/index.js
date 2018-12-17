import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import Search from 'carbon-components-react/lib/components/Search'
import Pagination from 'carbon-components-react/lib/components/PaginationV2'

const HeadingSearchStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  padding-top: 8px;
`

export default
@autobind
class HeadingSearch extends React.PureComponent {
  static propTypes = {
    isPagination: PropTypes.bool,
    pageSizes: PropTypes.array,
    onChangePagination: PropTypes.func.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string
  }

  static defaultProps = {
    pageSizes: [30, 50, 100, 150, 200],
    label: 'Search',
    placeholder: 'Search ...'
  }

  render () {
    return (
      <HeadingSearchStyle
        className={this.props.className}
        style={this.props.style}
      >
        <div>
          <Search
            onChange={this.props.onChangeSearch}
            labelText={this.props.label}
            placeHolderText={this.props.placeholder}
          />
        </div>
        {this.props.isPagination && (
          <Pagination
            pageSizes={this.props.pageSizes}
            onChange={this.props.onChangePagination}
            totalItems={this.props.totalItems}
            page={this.props.page}
          />
        )}
      </HeadingSearchStyle>
    )
  }
}
