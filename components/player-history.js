const React = require('react');
const { useState } = require('react');
const PropTypes = require('prop-types');

const { Box, Text, Color } = require('ink');
const TextInput = require('ink-text-input').default;

function PlayerHistory({name, isActive, done}) {
  const [inputText, setInputText] = useState('');
  const [commandList, setCommandList] = useState([]);

  const handleChange = text => {
    setInputText(text);
  };

  const handleSubmit = text => {
    if (text.toLowerCase() === 'done') {
      setInputText('');
      done();
    }
    else
    {
      setInputText('');
      setCommandList([...commandList, text]);
    }
  }

  return (
    <Box flexDirection="column" alignItems="flex-start" marginLeft={2} marginRight={2} width={15}>
      <Box marginBottom={1}>
        <Text>
          <Color blue>{name}</Color>'s guesses
        </Text>
      </Box>
      { commandList.map((command, idx) => <Text key={`${command}${idx}`}>{ command }</Text>) }
      { isActive && <TextInput value={inputText} onChange={handleChange} onSubmit={handleSubmit} /> }
    </Box>
  );
}

PlayerHistory.propTypes = {
  name: PropTypes.string,
  isActive: PropTypes.bool.isRequired
}

PlayerHistory.defaultProps = {
  name: 'Stranger',
};

module.exports = PlayerHistory;