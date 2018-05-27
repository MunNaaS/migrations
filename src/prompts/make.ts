import { prompt } from 'inquirer'

export default prompt([
  {
    type: 'expand',
    message: 'expanded',
    name: 'expend',
    choices: [
      { name: 'string', key: 'u' },
      { name: 'staging', key: 'd' },
    ],
  },
  {
    type: 'list',
    message: 'selected column type',
    name: 'up',
    choices: [
      { name: 'string' },
      { name: 'staging' },
    ],
  },
])
