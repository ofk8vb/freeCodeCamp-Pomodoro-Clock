import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Col from 'react-bootstrap/Col'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import IconButton from '@material-ui/core/IconButton';
import './Clock.css';

let displayStyle={
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'column',
    width: '300px',
    height: '400px',
    marginLeft: 'auto',
    background: '#e6e406',
    marginRight: 'auto',
    marginTop: '8em',
    border: '1px solid black',
    borderRadius:'10px',
    alignContent:'center',
    fontFamily:'monospace'
  }
  
const Clock= ({onClick,breakLength,sessionLength,timerType,timeToDisplay}) => {
   
    
    return(
        <Container className="App" style={displayStyle}>

          <Row>
            
          </Row>
          <Row  style={{border:'1px solid black',borderRadius:'10px',background:'rgb(216,216,195)',paddingLeft:'20px',paddingTop:'10px'}}>
              
              <Col xs={5} style={{paddingLeft:'15px'}}><p id='session-label'>Session length</p></Col>
              <Col xs={2} style={{paddingLeft:'7px'}}><IconButton onClick={onClick} value='decrSes' id="session-decrement"><ExpandMoreIcon ></ExpandMoreIcon></IconButton></Col>
              <Col xs={15}><p id='session-length'>{sessionLength}</p></Col>
              <Col xs={2} style={{paddingLeft:'3px'}}><IconButton onClick={onClick} value='incrSes' id="session-increment"><ExpandLessIcon></ExpandLessIcon></IconButton></Col>
             
          </Row>
          <Row style={{border:'1px solid black',borderRadius:'10px',background:'rgb(216,216,195)',justifyContent:'flex-start',paddingLeft:'37px',paddingTop:'10px'}}>
              <Col xs={5} style={{paddingLeft:'0px'}}><p id='break-label'>Interval length</p></Col>
              <Col xs={2} style={{paddingLeft:'3px'}} ><IconButton onClick={onClick} value='decrBr' id="break-decrement"><ExpandMoreIcon >Dec</ExpandMoreIcon></IconButton></Col>
              <Col xs={13}><p id='break-length'>{breakLength}</p></Col>
              <Col xs={2} style={{paddingLeft:'4px'}}><IconButton onClick={onClick} value='incrBr' id="break-increment"><ExpandLessIcon >Inc</ExpandLessIcon></IconButton></Col>
          </Row>
          <div style={{border:'1px solid black',background:'rgb(216,216,195)',justifyContent:'center',width:'270px',borderRadius:'10px'}}>
          <Row style={{justifyContent:'center',paddingTop:'20px'}}>
              <p id='timer-label' style={{fontFamily:'monospace',fontSize:'12px'}}>{timerType}</p>
          </Row>
          <Row style={{fontFamily:'Digital',justifyContent:'center'}}>
          <p id='time-left' style={{fontSize:'48px'}}>{timeToDisplay}</p>
          </Row>
          </div>
          <div>
          <Row style={{justifyContent:'center',border:'1px solid grey'}}><IconButton onClick={onClick} value='start-stop'  id='start_stop'><div><PlayArrowIcon></PlayArrowIcon><PauseIcon></PauseIcon></div></IconButton><IconButton onClick={onClick} value='reset' style={{paddingLeft:'0px'}}><SettingsBackupRestoreIcon id='reset'>Restore</SettingsBackupRestoreIcon></IconButton></Row>
          </div>
        </Container>
       
    
    ) 
    }
    
    export default Clock;