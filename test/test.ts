import { MigrationCreator } from '../src'
import { resolve } from 'path'

let m = new MigrationCreator()
m.create('hello_world', resolve(__dirname, './store'), 'test', true)
