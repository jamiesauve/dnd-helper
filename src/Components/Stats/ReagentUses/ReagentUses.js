import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import BulletList from '../BulletList'

import createIngredientString from './createReagentStrings/createIngredientString'

import getReagentUses from './getReagentUses.js'

const This = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: row;
`

const ReagentUses = (props) => {
  const {
    data: reagentUses,
    reagentType,
  } = props

  return (
    <This
      className="reagentUses"
    >
      <BulletList
        borderColor={props.borderColor}
        items={getReagentUses(reagentUses, reagentType)}
        heading="Uses"
      />
    </This>
  )
}

export default ReagentUses