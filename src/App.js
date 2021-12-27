import { useEffect, useRef, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './App.css';

import drawUtils from './utils/drawUtils';

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const settings = {
    'numberOfBlocks' : 40
  }

  const [side, setSide] = useState(window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth)

  const [timerController, setTimerController] = useState(true)
  
  const [personInfo, setPersonInfo] = useState(
    {
      'width': (side/settings.numberOfBlocks) - 1,
      'height': (side/settings.numberOfBlocks) - 1,
      'color': '#D00',
      'xB': 20, //x relativo ao número de blocos [0-40], float
      'yB': 20, //y relativo ao número de blocos [0-40], float
      'dirX': 0,
      'dirY': 0,
      'startBlockX': 20,
      'startBlockY': 20,
      'step': 0.3 //quantidade de blocos andados por click (float)
    }
  )

  useEffect(()=>{
    const canvas = canvasRef.current  

    let side = window.innerWidth
    if (window.innerWidth > window.innerHeight){
      side = window.innerHeight
    }

    setSide(side)
    let bSide = side/settings.numberOfBlocks
    let newPersonInfo = {...personInfo,'width': bSide-1, 'height': bSide-1}
    setPersonInfo(newPersonInfo)

    canvas.width = side * 2
    canvas.height = side * 2

    canvas.style.width = `${side}px`
    canvas.style.height = `${side}px`

    const context = canvas.getContext("2d")
    context.scale(2,2)
    contextRef.current = context

    // drawUtils.drawBlocks(contextRef.current, settings.numberOfBlocks, bSide, "#778")

    // drawUtils.drawPerson(contextRef.current, newPersonInfo)


  },[])

  useEffect(()=>{
    setTimeout(()=>{

        let stepRel = personInfo.step
        if (personInfo.dirX!==0 && personInfo.dirY!==0) stepRel /= Math.sqrt(2)

        let newPersonInfo = {
            ...personInfo,
            'yB': personInfo.yB + ((side/settings.numberOfBlocks) * stepRel * personInfo.dirY),
            'xB': personInfo.xB + ((side/settings.numberOfBlocks) * stepRel * personInfo.dirX),
        }
        drawUtils.clearAndRedraw(contextRef.current, settings.numberOfBlocks, side, "#556", "#778", newPersonInfo)
        setPersonInfo(newPersonInfo)
        setTimerController(!timerController)
    }, 20)
  },[timerController])



  function keyPressed(key) {
    //console.log(key)
    let newPersonInfo = personInfo
    switch (key) {
      case "up":
        newPersonInfo.dirY = -1
        //setPersonInfo({...personInfo, 'dirY': -1})
        //setPersonInfo({...personInfo, 'y': personInfo.y - (personInfo.step)})
        break;
      case "right":
        newPersonInfo.dirX = 1
        //setPersonInfo({...personInfo, 'dirX': 1})
        //setPersonInfo({...personInfo, 'x': personInfo.x + (personInfo.step)})
        break;
      case "left":
        newPersonInfo.dirX = -1
        //setPersonInfo({...personInfo, 'dirX': -1})
        //setPersonInfo({...personInfo, 'x': personInfo.x - (personInfo.step)})
        break;
      case "down":
        newPersonInfo.dirY = 1
        //setPersonInfo({...personInfo, 'dirY': 1})
        //setPersonInfo({...personInfo, 'y': personInfo.y + (personInfo.step)})
        break;
    
      default:
        break;
    }
    
    setPersonInfo(newPersonInfo)
  }

  function keyUp(key) {
      let newPersonInfo = personInfo
      switch (key) {
        case "up":
          newPersonInfo.dirY = 0
          //setPersonInfo({...personInfo, 'dirY': -1})
          //setPersonInfo({...personInfo, 'y': personInfo.y - (personInfo.step)})
          break;
        case "right":
          newPersonInfo.dirX = 0
          //setPersonInfo({...personInfo, 'dirX': 1})
          //setPersonInfo({...personInfo, 'x': personInfo.x + (personInfo.step)})
          break;
        case "left":
          newPersonInfo.dirX = 0
          //setPersonInfo({...personInfo, 'dirX': -1})
          //setPersonInfo({...personInfo, 'x': personInfo.x - (personInfo.step)})
          break;
        case "down":
          newPersonInfo.dirY = 0
          //setPersonInfo({...personInfo, 'dirY': 1})
          //setPersonInfo({...personInfo, 'y': personInfo.y + (personInfo.step)})
          break;
      
        default:
          break;
      }
      setPersonInfo(newPersonInfo)
  }

  useEffect(()=>{
    //console.log(personInfo)
    //drawUtils.clearAndRedraw(contextRef.current, settings.numberOfBlocks, side, "#556", "#778", personInfo)
  },[personInfo])


  function sendPersonTo(xB, yB){
    setPersonInfo({...personInfo, 'xB':xB, 'yB':yB})
  }


  return (
    <div className='main'>

      <canvas
        style={{backgroundColor: "#556"}}
        ref={canvasRef}
      />
      <KeyboardEventHandler
        handleKeys={['left', 'up', 'right', 'down']}
        handleEventType="keydown"
        onKeyEvent={(key) => keyPressed(key)}
      />
      <KeyboardEventHandler
        handleKeys={['left', 'up', 'right', 'down']}
        handleEventType="keyup"
        onKeyEvent={(key) => keyUp(key)}
      />
    </div>
    
  );
}

export default App;
