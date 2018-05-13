import { utc } from 'moment'
import { promisify } from 'util'
import { pascalCase } from 'change-case'
import { join, resolve } from 'path'
import { template } from 'lodash'
import {
  readFile as readFileCallBack,
  writeFile as writeFileCallBack,
  access as accessCallBack,
  stat as statCallBack,
} from 'fs'

const readFile = promisify(readFileCallBack)
const writeFile = promisify(writeFileCallBack)
const access = promisify(accessCallBack)
const stat = promisify(statCallBack)

export class MigrationCreator {
  protected _ext: string = 'ts'
  protected _stubPath: string
  public constructor () {
    this._stubPath = resolve(__dirname, '../../stubs/')
  }

  public async create (name: string, path: string, table: string | undefined, create: boolean) {
    this.ensureMigrationDoesntAlreadyExist(name)
    let stub: string = await this.getStub()
    let data = await this.populateStub(name, stub, table, create)
    path = resolve(path)
    path = await this.getPath(name, path)
    await writeFile(path, data)
    return path
  }

  public async getPath (name: string, path: string): Promise<string> {
    path = join(path, `${ this.getPrefix() }_${name}.${ this._ext }`)
    return Promise.resolve(path)
  }

  public getPrefix (): string {
    return utc().format('YYYY_MM_DD_HHMMSS')
  }

  protected getClassName (name: string): string {
    return pascalCase(name)
  }

/**
 * Ensure that a migration with the given name doesn't already exist.
 *
 * @protected
 * @param {string} name is a name of migration file.
 * @memberof MigrationCreater
 */
  protected ensureMigrationDoesntAlreadyExist (name: string) {
    let className = this.getClassName(name)

    // if (false) {
    //   throw new Error(`A ${ className } class already exists.`)
    // }
  }

  protected populateStub (name: string, stub: string, table: string | undefined, create: boolean) {
    let compiled = template(stub)
    let migration = compiled({
      className: this.getClassName(name),
      table: table,
      create: create,
      transaction: true,
      increments: true,
      timestamps: true,
      columns: [
        {
          type: 'string',
          name: 'name',
          options: {
            defaultTo: 'hello',
          },
        },
      ],
    })
    return Promise.resolve(migration)
  }

  /**
   * Get the migration stub file.
   *
   * @protected
   * @param {string} table is a table name
   * @param {boolean} create is a flag to determine whether to create a table or not.
   * @memberof MigrationCreater
   */
  protected async getStub (): Promise<string> {
    let path = join(this._stubPath, `${ this._ext }.stub`)
    try {
      let buff = await readFile(path, { flag: 'r' })
      let stub = buff.toString()
      return Promise.resolve(stub)
    } catch (e) {
      throw new Error(`File does not exist at path ${ path }`)
    }
  }

  /**
   * Get stub path.
   *
   * @readonly
   * @type {string}
   * @memberof MigrationCreater
   */
  public get stubPath (): string {
    return this._stubPath
  }

}
