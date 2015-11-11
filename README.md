# polish-banned-selectors
[Polish](https://github.com/brendanlacroix/polish-css) plugin to ban a list of selectors.

[![Build Status](https://travis-ci.org/brendanlacroix/polish-banned-selectors.svg?branch=master)](https://travis-ci.org/brendanlacroix/polish-banned-selectors)

## Installation
`npm install polish-banned-selectors`

## Configuration
```
[
  {
    module: 'polish-banned-selectors',
    severity: 2,
    selectors: [
      '.an', '.array', '#of', '.banned', '#selectors'
    ]
  }
]
```
