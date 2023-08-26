import React, { useState, useEffect, useLayoutEffect } from "react";
//import { Button } from 'react-bootstrap';
//import AlertDialogSlide from "./ScoreBoard";
import ScoreBoard from "./ScoreBoard";
// import { Checkbox } from '@mui/material';



//Player
const Square = ({ x, y, size,gradientColors }) => {
  const gradient = `radial-gradient(circle, ${gradientColors.join(', ')})`;
  return (
    <div
      style={{
        width: size,
        height: size,
        // backgroundColor: "#1abc9c",
        background: gradient,
        position: "absolute",
        left: x,
        top: y,
        borderRadius: "10%",
        border: "0.5px solid #fff",
      }}
    />
  );
};


//Coins
const Circle = ({ x, y, size }) => {
  return (
    <div
      className="blink"
      style={{
        width: size,
        height: size,
        backgroundColor: " #d35400",
        position: "absolute",
        left: x,
        top: y,
        borderRadius: "50%",
        animation: "blinker 0.7s linear infinite",
      }}
    />
  );
};

//Enemy
const Enemy = ({ x, y, size,gradientColors }) => {
  const gradient = `radial-gradient(circle, ${gradientColors.join(', ')})`;
  return (
    <div
      style={{
        width: size,
        height: size,
        // backgroundColor: color,
        background: gradient, // Apply the gradient as the background
        position: "absolute",
        left: x,
        top: y,
        borderRadius: "40%",
        border: "1px solid #fff",
      }}
    />
  );
};

//Ground
const Box = ({ children, width, height }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        border: "4px solid black",
        position: "relative",
        marginTop: "28px"
      }}
    >
      {children}
    </div>
  );
};



const panelStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}

const Game = () => {
  const [x, setX] = useState(0); //player's position
  const [y, setY] = useState(0);
  const [cx, setCx] = useState(5); //coin's position
  const [cy, setCy] = useState(5);
  const [ex, setEx] = useState(630); //enemy's position
  const [ey, setEy] = useState(350);
  const [ex1, setEx1] = useState(20); //enemy's position
  const [ey1, setEy1] = useState(350);
  const [pt, setPt] = useState(-1); //score point

  const size = 50; //player size
  const cSize = 25; //coin size
  const eSize = 70; //enemy size
  const step = 10;  //player movement
  const maxX = 742 - size;
  const maxY = 672 - size;

  const [enemyLive, setEnemyLive] = useState(true);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setEnemyLive(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  //Timer
  const [timeLeft, setTimeLeft] = useState(60);

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (enemyLive) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      //alert(`Your Point is: ${pt}`);
      setEnemyLive(false);
      handleClickOpen();
    }
  }, [timeLeft]);

  //to move square
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (enemyLive) {
        switch (event.key) {
          case "ArrowUp":
            setY(Math.max(0, y - step));
            break;
          case "ArrowDown":
            setY(Math.min(maxY, y + step));
            break;
          case "ArrowLeft":
            setX(Math.max(0, x - step));
            break;
          case "ArrowRight":
            setX(Math.min(maxX, x + step));
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [x, y, maxX, maxY]);

  //to move circle && attack of enemy
  useEffect(() => {
    //enemy
    if (ex + eSize > x && ex < x + size && ey + eSize > y && ey < y + size) {
      // alert(`Enemy Catched!...Your Point is: ${pt}`);
      handleClickOpen();
      // window.location.reload();
    }

    if (ex1 + eSize > x && ex1 < x + size && ey1 + eSize > y && ey1 < y + size) {
      // alert(`Enemy Catched!...Your Point is: ${pt}`);
      handleClickOpen();
      // window.location.reload();
    }

    //cirle
    if (x + size > cx && x < cx + cSize && y + size > cy && y < cy + cSize) {
      setCx(Math.floor(Math.random() * (750 - cSize)));
      setCy(Math.floor(Math.random() * (680 - cSize)));
      setPt(pt + 1);
    }

    if (ex + eSize > cx && ex < cx + cSize && ey + eSize > cy && ey < cy + cSize) {
      setCx(Math.floor(Math.random() * (750 - cSize)));
      setCy(Math.floor(Math.random() * (680 - cSize)));
    }

    if (ex1 + eSize > cx && ex1 < cx + cSize && ey1 + eSize > cy && ey1 < cy + cSize) {
      setCx(Math.floor(Math.random() * (750 - cSize)));
      setCy(Math.floor(Math.random() * (680 - cSize)));
    }

  }, [x, y, cx, cy, size, cSize, ex, ey,ex1,ey1, eSize]);

  //to move enemy
  useEffect(() => {
    const intervalId = setInterval(() => {
      let newX = ex;
      let newY = ey;
      let newX1 = ex1;
      let newY1 = ey1;
      const randomDirection = Math.floor(Math.random() * 4);

      switch (randomDirection) {
        case 0:
          newX = ex + 40;
          newY1 = ey1 - 40;
          break;
        case 1:
          newX = ex - 40;
          newY1 = ey1 + 40;
          break;
        case 2:
          newY = ey + 40;
          newX1 = ex1 - 40;
          break;
        case 3:
          newY = ey - 40;
          newX1 = ex1 + 40;
          break;
        default:
          break;
      }

      if (enemyLive) {
        if (newX >= 0 && newX <= maxX) {
          setEx(newX);
        }

        if (newY >= 0 && newY <= maxY) {
          setEy(newY);
        }

        if (newX1 >= 0 && newX1 <= maxX) {
          setEx1(newX1);
        }

        if (newY1 >= 0 && newY1 <= maxY) {
          setEy1(newY1);
        }
      }

    }, 250);


    return () => {
      clearInterval(intervalId);
    };
  }, [ex, ey,ex1,ey1]);


  

  return (
    <>
      <h1 className='header'>One Min Game :)</h1>
      <p id="minitext" className="text-gray-800 italic">can you score above 15 points?</p>
      <div className='MainBox'>
        <div>
          <Box width={750} height={680}>
            <Square x={x} y={y} size={size} gradientColors={['#16a085','#0e6655' ]} />
            <Circle x={cx} y={cy} size={cSize} />
            <Enemy x={ex} y={ey} size={eSize} gradientColors={['#c0392b','#7b241c']} />
            <Enemy x={ex1} y={ey1} size={eSize} gradientColors={['#1F618D','#154360']} />
          </Box>
            <ScoreBoard open={open} point={pt} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
          <div style={panelStyle}>
            <h2 style={{ margin: 13 }}>Point:{pt}</h2>

            <h2 style={{ margin: 13 }}>{min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;


