const React = require('react');
const PropTypes = require('prop-types');

const { useState, useEffect } = require('react');
const {
  Box, Text, Color,
} = require('ink');

const importJsx = require('import-jsx');

const PlayerHistory = importJsx('./components/player-history');


const App = (props) => {
  const ROUND_TIME = 10;

  const [playerIndex, setPlayerIndex] = useState(0);
  const [time, setTime] = useState(ROUND_TIME);

  const playerList = ['Matt', 'Amy'];
  const numPlayers = props.players || props.p || playerList.length;

  const nextPlayer = () => {
    const nextIndex = (playerIndex + 1) % numPlayers;
    setPlayerIndex(nextIndex);
  };

  useEffect(() => {
    const tick = () => {
      if (time <= 0) {
        setTime(ROUND_TIME);
        nextPlayer();
      } else {
        setTime(time - 1);
      }
    };

    const timer = setTimeout(tick, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [playerIndex, time]);

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
        <Text>
          Time remaining:
          <Color green={time > 5} red={time <= 5}>{time}</Color>
        </Text>
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
              isActive={index === playerIndex}
              done={nextPlayer}
            />
          ))
        }
      </Box>
    </Box>
  );
};

App.propTypes = {
  rounds: PropTypes.string,
  r: PropTypes.string,
  players: PropTypes.string,
  p: PropTypes.string,
  time: PropTypes.string,
  t: PropTypes.string
};

module.exports = App;
