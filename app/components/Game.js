import React, { useState, useEffect } from "react";
//import { Button } from 'react-bootstrap';
import AlertDialogSlide from "./ScoreBoard";
//import ScoreBoard from "./ScoreBoard";

const Square = ({ x, y, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#471147",
        position: "absolute",
        left: x,
        top: y,
        borderRadius: "10%",
      }}
    />
  );
};

const Circle = ({ x, y, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#ec14b7",
        position: "absolute",
        left: x,
        top: y,
        borderRadius: "50%",
      }}
    />
  );
};

const Enemy = ({ x, y, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#990000",
        position: "absolute",
        left: x,
        top: y,
        borderRadius: "40%",
        border: "1px solid #800000",
      }}
    />
  );
};

const Box = ({ children, width, height }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        border: "4px solid black",
        position: "relative",
        marginTop:"28px"
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
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [ex, setEx] = useState(425);
  const [ey, setEy] = useState(355);
  const [pt, setPt] = useState(-1);

  const size = 50;
  const cSize = 25;
  const eSize = 70;
  const step = 10;
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

    //cirle
    if (x + size > cx && x < cx + cSize && y + size > cy && y < cy + cSize) {
      setCx(Math.floor(Math.random() * (750 - cSize)));
      setCy(Math.floor(Math.random() * (680 - cSize)));
      setPt(pt + 1);
    }
  }, [x, y, cx, cy, size, cSize, ex, ey, eSize]);

  //to move enemy
  useEffect(() => {
    const intervalId = setInterval(() => {
      let newX = ex;
      let newY = ey;
      const randomDirection = Math.floor(Math.random() * 4);

      switch (randomDirection) {
        case 0:
          newX = ex + 40;
          break;
        case 1:
          newX = ex - 40;
          break;
        case 2:
          newY = ey + 40;
          break;
        case 3:
          newY = ey - 40;
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
      }

    }, 200);


    return () => {
      clearInterval(intervalId);
    };
  }, [ex, ey]);


  return (
    <div>
      <Box width={750} height={680}>
        <Square x={x} y={y} size={size} />
        <Circle x={cx} y={cy} size={cSize} />
        <Enemy x={ex} y={ey} size={eSize} /> 
      </Box>
      <div style={panelStyle}>
        <AlertDialogSlide open={open} point={pt} handleClickOpen={handleClickOpen} handleClose={handleClose}></AlertDialogSlide>
        <h2 style={{ margin: 13 }}>Point:{pt}</h2>
        <h2 style={{ margin: 13 }}>{min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}</h2>
      </div>
    </div>
  );
};

export default Game;