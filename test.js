const React = require('react');
// const chalk = require('chalk');
const { render } = require('ink-testing-library');
const App = require('./ui');

it('greet unknown user', () => {
  const { lastFrame } = render(<App />);

  expect(lastFrame()).toMatchSnapshot();
});

it('greet user with a name', () => {
  const { lastFrame } = render(<App name="Jane" />);

  expect(lastFrame()).toMatchSnapshot();
});
