import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import EditableTextarea from './EditableTextArea'
import Heading from '../Structure/Heading'

import colors from '../../../data/styles/colors'
import sizes from '../../../data/styles/sizes'

const This = styled.div`
  display: flex;
  flex-direction: column;
`

const ColumnContainer = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin: 0 5px;
  `
  
  const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${props => props.minWidth || `0px`};
`

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 5px 0;
`

const BulletPoint = styled.div`
  margin-right: 5px;
`

const EditableList = (props) => {
  const {
    areBulletsVisible,
    heading,
    items,
    maxLength,
    numberOfColumns,
    placeholder,
  } = props

  const [listItems, setListItems] = useState([])

  useEffect(() => {
    const columns = Array(numberOfColumns).fill(null).map(() => [])
    
    // TODO: handle maxLength, if I actually want to enforce this
    if (_.isEmpty(items) || maxLength < items.length) { 
      /**
       * if this array comes back empty, the placeholder won't be shown
       * because the corresponding index won't exist, but it needs to be
       * shown when this array is empty. 
       */
      items.push('')
    }

    _.forEach(items, (item, index) => {
      columns[index % numberOfColumns].push(item)
    })

    setListItems(columns)
  }, [
    items,
    numberOfColumns,
  ])

  const updateListItem = (columnIndex, itemIndex, value) => {
    // TODO: sanitize user input
    const newListItems = _.cloneDeep(listItems)

    newListItems[columnIndex][itemIndex] = value

    setListItems(newListItems)
  }

  const generateColumns = () => {
    return (
      <ColumnContainer
        className="columnContainer"
      >
        {_.map(listItems, (column, columnIndex) => (
          <Column
            className="column"
            key={columnIndex}
            minWidth={`${100 / numberOfColumns}%`} // TODO: might need to handle division by 0?
          >
            {_.map(column, (item, itemIndex) => (
              <ListItem
                className="listItem"
                key={itemIndex}
              >
                {areBulletsVisible 
                  && <BulletPoint>
                    -
                  </BulletPoint> 
                }

                <EditableTextarea
                  className="editableTextarea"
                  onChange={e => updateListItem(columnIndex, itemIndex, e.target.value)}
                  placeholder={placeholder}
                  value={listItems[columnIndex][itemIndex]}
                />
              </ListItem>
            ))}
          </Column>
        ))}
      </ColumnContainer>
    )
  } 
  
  return (
    <This
      className="editableList"
    >
      {heading && 
        <Heading>
          {heading}
        </Heading>
      }
      
      {generateColumns()}
    </This>
  )
}

EditableList.defaultProps = {
  numberOfColumns: 1,
}

export default EditableList