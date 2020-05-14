const React = require('react');
const PropTypes = require('prop-types');

const { useState, useEffect } = require('react');
const {
  Box, Text, Color, Static
} = require('ink');
const TextInput = require('ink-text-input').default;

const importJsx = require('import-jsx');

const GameBoard = importJsx('./components/game-board');


const App = (props) => {
  const [playerList, setPlayerList] = useState([]);
  const [playerInput, setPlayerInput] = useState('');

  const numPlayers = props.players || props.p || 2;
  const time = props.time || props.t || 30;
  const rounds = props.rounds || props.r || 2;

  if (playerList.length < numPlayers) {
    const handleSubmit = (input) => {
      setPlayerInput('');
      setPlayerList([ ...playerList, input ]);
    }
    const handleChange = (text) => {
      setPlayerInput(text);
    }
    return (
      <Box
        width={ 60 }
        alignSelf='center'
        justifyContent='flex-start'
      >
        <Static>
          {
            playerList.map((player, index) =>
              <Text key={ player }>Enter the name of player { index + 1 }: {player}</Text>)
          }
        </Static>
        <Text>Enter the name of player <Color green>{ playerList.length + 1 }</Color>: </Text>
        <TextInput value={ playerInput } onChange={ handleChange } onSubmit={ handleSubmit } />
      </Box>
    )
  }

  let timeStopped = false;
  const onGameOver = () => {
    timeStopped = true;
  }

  return (
    <>
      <Static>
        <Text key={ playerList[playerList.length - 1] }>
          Enter the name of player { playerList.length }: { playerList[playerList.length - 1] }
        </Text>
      </Static>
      <GameBoard
        playerList={ playerList }
        rounds={ rounds }
        roundTime={ time }
        timeStopped={ timeStopped }
        triggerGameOver={ onGameOver }
      />
    </>
  );
};

App.propTypes = {
  rounds: PropTypes.number,
  r: PropTypes.number,
  players: PropTypes.number,
  p: PropTypes.number,
  time: PropTypes.number,
  t: PropTypes.number
};

module.exports = App;
