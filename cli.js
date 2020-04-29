#!/usr/bin/env node


const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
  Usage
    $ ink-demo

  Options
    -r, --rounds <n>  Number of rounds
    -t, --time <seconds>  Time for each round in seconds
    -p, --players <n>  Number of players (1 or 2)

  Examples
    $ ink-demo --players 2 --rounds 3 --time 30
    Hello, Jane
`);

render(React.createElement(ui, cli.flags));
