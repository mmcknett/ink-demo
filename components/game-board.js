const React = require('react');
const PropTypes = require('prop-types');

const { useState, useEffect } = require('react');
const {
  Box, Text, Color,
} = require('ink');

const importJsx = require('import-jsx');

const PlayerHistory = importJsx('./player-history');


const GameBoard = ({
  rounds,
  playerList,
  roundTime,
  timeStopped,
  triggerGameOver
}) => {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [time, setTime] = useState(roundTime);
  const [currentRound, setCurrentRound] = useState(0);

  const numPlayers = playerList.length;

  const nextPlayer = () => {
    const nextIndex = (playerIndex + 1) % numPlayers;

    if (nextIndex === 0) {
      if (currentRound + 1 === rounds) {
        triggerGameOver();
      } else {
        setCurrentRound(currentRound + 1);
      }
    }

    setPlayerIndex(nextIndex);
  };

  useEffect(() => {
    const tick = () => {
      if (time <= 0) {
        setTime(roundTime);
        nextPlayer();
      } else {
        setTime(time - 1);
      }
    };

    if (!timeStopped) {
      const timer = setTimeout(tick, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    
    return;
  }, [playerIndex, time, timeStopped]);

  return (
    <Box
      flexDirection="column"
      alignItems="stretch"
    >
      <Box
        paddingTop={1}
        paddingBottom={1}
        justifyContent="center"
      >
        {
          !timeStopped &&
          <Text>
            Time remaining:&nbsp;
            <Color green={time > 5} red={time <= 5}>{time}</Color>
          </Text>
        }
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-around"
        alignItems="flex-start"
        paddingTop={1}
        paddingBottom={1}
      >
        {
          playerList.map((name, index) => (
            <PlayerHistory
              /* eslint-disable-next-line react/no-array-index-key */
              key={`${name}${index}`}
              name={name}
              isActive={index === playerIndex && !timeStopped }
              done={nextPlayer}
            />
          ))
        }
      </Box>
    </Box>
  );
};

GameBoard.propTypes = {
  rounds: PropTypes.number,
  playerList: PropTypes.arrayOf(PropTypes.string),
  roundTime: PropTypes.number,
  timeStopped: PropTypes.bool.isRequired,
  triggerGameOver: PropTypes.func
};

GameBoard.defaultProps = {
  timeStopped: false
}

module.exports = GameBoard;
