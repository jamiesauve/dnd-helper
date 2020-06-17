import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import Section from '../Components/Layout/Section'

import Dresser from '../Components/UI/Dresser'

import ScrollableContainer from '../Components/styled/ScrollableContainer'

import ReagentDisplayCard from '../Components/DisplayCards/ReagentDisplayCard'

import * as terrainTypes from '../data/terrainTypes'
import reagents from '../data/reagents'
import colors from '../data/colors'

const This = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  height: 100%;
`

const Crafting = (props) => {
  const reagentsByTerrain = _.filter(reagents, reagent => 
    _.isEmpty(reagent.terrain)
    ? true
    : _.includes(reagent.terrain, props.activeTerrain)
  )

  const drawers = reagentsByTerrain
  .map(reagent => ({
    title: reagent.label,
    titleColor: _.find(terrainTypes, {name: props.activeTerrain}).color,
    content: () => <ReagentDisplayCard
      data={reagent}
    />,
  }))

  return (
    <This
    className="crafting"
    >
      <Section
        className="section"
      >
        <ScrollableContainer
          className="scrollableContainer"
        >
          <Dresser 
            className="dresser"
            drawers={drawers}
            hasToggleAllLink
            initiallyExpanded={false}
          />
        </ScrollableContainer>
      </Section>
    </This>
  )
}

export default Crafting