import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import sizes from '../../data/styles/sizes'

import AddIcon from '../UI/Action/AddIcon'
import FillInTheBlanksInput from '../UI/Action/FillInTheBlanksInput'
import RemoveIcon from '../UI/Action/RemoveIcon'

const This = styled.div`
  display: flex;
  flex-direction: column;
`

const Heading = styled.div`
  align-self: center;

  font-weight: bold;
  font-size: ${sizes.small};
`

const IngredientsContainer = styled.div``

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const EditableIngredients = (props) => {
  const {
    ingredients,
    placeholder,
  } = props

  const [listIngredients, setListIngredients] = useState([])

  useEffect(() => {
    setListIngredients(ingredients)
  }, [
    ingredients,
  ])

  const updateListItem = (ingredientIndex, fieldName, value) => {
    // TODO: sanitize user input
    const newListIngredients = _.cloneDeep(listIngredients)

    if (_.isUndefined(newListIngredients[ingredientIndex])) newListIngredients[ingredientIndex] = {} 
    newListIngredients[ingredientIndex][fieldName] = value
    setListIngredients(newListIngredients)
  }

  const addIngredientField = () => {
    const newListIngredients = _.cloneDeep(listIngredients)

    setListIngredients(newListIngredients.concat({}))
  }

  const removeIngredientField = (fieldIndex) => {
    const newListIngredients = _.cloneDeep(listIngredients)
      .filter((ingredient, index) => index !== fieldIndex)
    
    setListIngredients(newListIngredients)
  }

  const generateFillInTheBlanks = () => (
    <IngredientsContainer>
      {_.map(listIngredients, (ingredient, index) => { 

        return (
          <Row
            key={ingredient.name || index}
          >
            <FillInTheBlanksInput
              className="fillInTheBlanks"
              copySegments={[``, ` (`, ` `, `)`]}
              fieldGroupIndex={index}
              items={
                [{
                  fieldName: `label`,
                  fieldType: `text`,
                  flexGrow: 1,
                  placeholder: placeholder.label,
                  value: ingredient.label,
                  // onChange ... update this state
                }, {
                  fieldName: `amount`,
                  fieldType: `text`,
                  placeholder: placeholder.amount,
                  value: ingredient.amount,
                  fieldWidth: `70px`,
                }]
              }
              handleChange={updateListItem}
            />

            <RemoveIcon
              onClick={() => removeIngredientField(index)}
            /> 
          </Row>
        )}
      )}
    </IngredientsContainer>
  )

  return (
    <This>
      <Heading>
        Ingredients
      </Heading>
      
      {generateFillInTheBlanks()}

      <AddIcon
        onClick={addIngredientField}
      />
    </This>
  )
}

EditableIngredients.defaultProps = {
  items: [],
}

export default EditableIngredients