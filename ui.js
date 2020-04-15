
const React = require('react');
const { useState, useContext } = require('react');
const PropTypes = require('prop-types');
const {
  AppContext, Box, Text, Color, useInput,
} = require('ink');

const App = ({ name }) => {
  const { exit } = useContext(AppContext);
  const [inputText, setInputText] = useState('');
  const [commandList, setCommandList] = useState([]);

  useInput((input, key) => {
    if (key.escape) {
      setInputText('');
    } else if (key.return) {
      if (inputText === 'exit') {
        exit();
      } else {
        setCommandList([...commandList, inputText]);
        setInputText('');
      }
    } else if (input.charCodeAt(0) === 127) {
      setInputText(inputText.slice(0, inputText.length - 1));
    } else {
      setInputText(inputText + input);
    }
  });

  return (
    <Box flexDirection="column" alignItems="center" paddingTop={1} paddingBottom={1}>
      <Text>
        Hello,
        {' '}
        <Color green>{name}</Color>
      </Text>
      { commandList.map((command) => <Text key={command}>{ command }</Text>) }
      <Text>
        {'>'}
        {' '}
        {inputText}
      </Text>
    </Box>
  );
};

App.propTypes = {
  name: PropTypes.string,
};

App.defaultProps = {
  name: 'Stranger',
};

module.exports = App;
