import React from 'react'
import styled from 'styled-components'

import MainWindow from './Containers/MainWindow'
import Sidebar from './Containers/Sidebar'

import colors from './data/colors'

const This = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;

  align-content: flex-start;
  
  background-color: ${colors.mediumBackground};

  font-family: sans-serif;
  font-size: 16px;
  color: ${colors.lightGrey};
`


function App() {
  return (
    <This
      className="App"
    >
      <Sidebar />
      <MainWindow />
    </This>
  );
}

export default App
