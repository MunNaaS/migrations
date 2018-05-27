import { utc } from 'moment'
import { promisify } from 'util'
import { pascalCase } from 'change-case'
import { join, resolve, sep } from 'path'
import { template } from 'lodash'
import {
  readFile as readFileCallBack,
  writeFile as writeFileCallBack,
  open as openCallBack,
  mkdir as mkdirCallBack,
  writeFileSync,
  statSync,
  mkdirSync,
} from 'fs'

const readFile = promisify(readFileCallBack)
const writeFile = promisify(writeFileCallBack)
const mkdir = promisify(mkdirCallBack)
const open = promisify(openCallBack)

export class MigrationCreator {
  protected _ext: string
  protected _stubPath: string
  protected _directory: string
  protected _withinTransaction: boolean

  public constructor (config: any) {
    this._stubPath = config.stub
    this._ext = config.extension
    this._withinTransaction = config.withinTransaction
    this._directory = config.directory
  }

  public async create (name: string,
                      create: string | undefined,
                      table: string | undefined,
                      path?: string,
                      stubPath?: string,
                      transaction?: boolean,
                      columns?: object,
                      increments?: boolean,
                      timestamps?: boolean) {
    let directory = path || this._directory
    this._stubPath = stubPath || this._stubPath

    await this.ensureMigrationsDirectoryExists(directory)
    this.ensureMigrationDoesntAlreadyExist(name)

    let stub: string = await this.getStub()
    let data = await this.populateStub(name, stub, table, create, columns, transaction, increments, timestamps)
    path = await this.getPath(name, directory)

    await writeFile(path, data)

    return path
  }

  public async getPath (name: string, path: string): Promise<string> {
    path = join(path, `${ this.getPrefix() }_${name}.${ this._ext }`)
    return path
  }

  public getPrefix (): string {
    return utc().format('YYYY_MM_DD_HHMMSS')
  }

  protected async ensureMigrationsDirectoryExists (directory: string) {
    let segments = directory.split(sep)
    let dir = ''
    for (const i in segments) {
      if (segments.hasOwnProperty(i)) {
        const segment = segments[i]
        dir = join(dir, segment)
        try {
          if (dir !== '.') {
            await mkdir(dir)
          }
        } catch (e) {
          if (e.code !== 'EEXIST') {
            throw e
          }
        }
      }
    }
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

  protected populateStub (name: string,
                          stub: string,
                          table: string | undefined,
                          create: string | undefined,
                          columns: object | undefined,
                          transaction: boolean | undefined,
                          increments: boolean = false,
                          timestamps: boolean = false) {
    let compiled = template(stub)
    let migration = compiled({
      className: this.getClassName(name),
      table: table || create,
      create: create || false,
      transaction: transaction || this._withinTransaction,
      increments: increments,
      timestamps: timestamps,
      columns: columns,
    })
    return migration
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
      return stub
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
