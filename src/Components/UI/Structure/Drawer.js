import React from 'react'
import styled from 'styled-components'

import colors from '../../../data/styles/colors'

const This = styled.div`
  margin-top: 10px;
  
  border-radius: ${props => props.isOpen ? `5px 5px 0 0` : `5px`};
  box-shadow: 0 0 3px ${colors.darkGrey};

  align-items: center;
`

const SectionTitle = styled.div`
  margin-bottom: 7px;
  font-weight: bold;
`

const DrawerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 7px;
  background-color: ${props => props.titleColor};
`

const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  background-color: ${colors.mediumBackground};
`

const Drawer =  props => {
  const DrawerContent = props.content

  const handleClickTitle = () => {
    props.isOpen 
      ? props.closeSelf()
      : props.openSelf()
  }

  return (
    <This
      className="Drawer"
      isOpen={props.isOpen}
    >
      <DrawerTitle
        className="DrawerTitle"
        titleColor={props.titleColor}
        onClick={handleClickTitle}
      >
        <SectionTitle>
          {props.title}
        </SectionTitle>
      </DrawerTitle>

        {
          props.isOpen
          && <DrawerBody
            className="drawerBody"
          >
            <DrawerContent />
          </DrawerBody>
        }
    </This>
  )
}

export default Drawer