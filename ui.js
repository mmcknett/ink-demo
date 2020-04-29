const React = require('react');
const { useState, useEffect } = require('react');
const PropTypes = require('prop-types');
const {
  AppContext, Box, Text, Color, useInput,
} = require('ink');

const importJsx = require('import-jsx');
const PlayerHistory = importJsx('./components/player-history');


const App = ({ name }) => {
  const ROUND_TIME = 10;

  const [playerIndex, setPlayerIndex] = useState(0);
  const [time, setTime] = useState(ROUND_TIME);

  const nextPlayer = () => {
    const nextIndex = (playerIndex + 1) % playerList.length;
    setPlayerIndex(nextIndex);
  }

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
    }
  }, [playerIndex, time]);

  const playerList = ['Matt', 'Amy'];

  const handleChange = text => {
    setInputText(text);
  };

  const handleSubmit = text => {
    setCommandList([...commandList, text]);
    setInputText('');
  }

  return (
    <Box
      flexDirection='column'
      alignItems='stretch'
    >
      <Box
        paddingTop={1}
        paddingBottom={1}
        justifyContent='center'
      >
        <Text>Time remaining: <Color green={time > 5} red={time <= 5}>{time}</Color></Text>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-around"
        alignItems="flex-start"
        paddingTop={1}
        paddingBottom={1}
      >
        {
          playerList.map((name, index) => 
            <PlayerHistory key={`${name}${index}`} name={name} isActive={index === playerIndex && time !== 0} done={nextPlayer} />
          )
        }
      </Box>
    </Box>
  );
};

module.exports = App;
