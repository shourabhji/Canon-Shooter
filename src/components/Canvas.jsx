"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import Shells from './Shells';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
import { calculateAngle } from '../utils/formula'
import {
  createInterval, flyingObjectsStarterYAxis, maxFlyingObjects,
  flyingObjectsStarterPositions,objectSpeed
} from '../utils/constants'
import { array } from 'prop-types';

const Canvas = () => {
  const [viewBox, setviewBox] = useState([0, 0, 0, 0])
  
  // stating the game 
  const [GameStarted, setGameStarted] = useState(false)
  const [Kills, setKills] = useState(0)
  const [Lives, setLives] = useState(0)
  const [CannonAngle, setCannonAngle] = useState(45)
  const [FlyingObjectsArray, setFlyingObjectsArray] = useState([])
  const [flyingObjectIntervels, setflyingObjectIntervels] = useState(null)
  const [ShellsArr, setShellsArr] = useState([])
  const [LastCreatedAt, setLastCreatedAt] = useState(Date.now())
  useEffect(() => {
    const gameHeight = 1100;
    // const viewBox = 
    setviewBox([window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight])
    // setDocumentObject(document);
  }, [])
  useEffect(() => {
    window.onresize = () => {
      const cnv = document.getElementById('cannon_shooter');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();

  }, [])




  const getCanvasPosition = (event) => {
    // mouse position on auto-scaling canvas
    // https://stackoverflow.com/a/10298843/1232793

    const svg = document.getElementById('cannon_shooter');
    const point = svg.createSVGPoint();

    point.x = event.clientX;
    point.y = event.clientY;
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
    return { x, y };
  };




  const handleMouseMove = (e) => {
    let canvaspostions = getCanvasPosition(e)

    let newAngle = calculateAngle(0, 0, canvaspostions.x, canvaspostions.y)
    setCannonAngle(newAngle)
  }



  const createRandomObjects = ()=>{
    // debugger
    // if(!GameStarted) return

    const now = (new Date()).getTime();

  const createNewObject = (
    now - (LastCreatedAt) > createInterval &&
    FlyingObjectsArray.length < maxFlyingObjects
  );

  if ( ! createNewObject &&  FlyingObjectsArray.length >0) return
  const id = (new Date()).getTime();
  const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects);
  const flyingObjectPosition = flyingObjectsStarterPositions[predefinedPosition];
  const newFlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: flyingObjectsStarterYAxis,
    },
    createdAt: (new Date()).getTime(),
    id,
  };
 
  setLastCreatedAt((new Date()).getTime())


  
  setFlyingObjectsArray(prevFlyingObjectsArray => [...prevFlyingObjectsArray, newFlyingObject]);



  }
  


  const startGame = () => {
    setKills(0)
    setLives(3)
    setGameStarted(true)

    let interval = setInterval(() => {
      createRandomObjects()
    
    }, 1000);

    setflyingObjectIntervels(interval)
  }


  const shootShells = ()=>{
let x = 0
let y = -80


setShellsArr(prevShellsArr =>[...prevShellsArr, {x,y,createdAt:Date.now()}]
)

  }
  return (
    <svg
      id="cannon_shooter"
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
      onMouseMove={handleMouseMove}
      onClick={shootShells}
    >
      <Sky />
      <Ground />
      <CannonPipe rotation={GameStarted ? CannonAngle : 66} />
      <CannonBase />
      {ShellsArr?.map((ele,index)=>{
        return <Shells key={index} position={{ x: ele.x, y: ele.y }} cannonProps={{ rotation: GameStarted ? CannonAngle : 66 }} />
      })}
      
      {GameStarted && FlyingObjectsArray.filter(object => (
    (Date.now() - object.createdAt) > 4000
  )).map((value, index) => {
        return <FlyingObject position={value.position} key={index} />
      })}
      {!GameStarted && <FlyingObject position={{ x: -150, y: -300 }} />}
      {!GameStarted && <FlyingObject position={{ x: 150, y: -300 }} />}
      {GameStarted && <Heart position={{ x: -300, y: 35 }} Lives={Lives} />}
      {!GameStarted && <StartGame onClick={() => startGame()} />}
      {GameStarted && <CurrentScore score={Kills} />}
      {!GameStarted && <Title />}

    </svg>
  );
};


export default Canvas;