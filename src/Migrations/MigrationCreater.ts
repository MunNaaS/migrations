import * as fs from 'fs'
import { pascalCase } from 'change-case'
import { resolve } from 'path'

export class MigrationCreater {
  private _stubPath: string
  protected _files: any
  public constructor (files: any, config: any) {
    let stubPath: string = config.stubPath || 'stubs'
    this._files = files
    this._stubPath = resolve(__dirname, stubPath)
  }

  public create (name: string, path: string, table: string, create: boolean) {
    this.ensureMigrationDoesntAlreadyExist(name)
    let stub = this.getStub(table, create)
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

    // tslint:disable-next-line:no-constant-condition
    if (false) {
      throw new Error(`A ${ className } class already exists.`)
    }
  }

  /**
   * Get the migration stub file.
   *
   * @protected
   * @param {string} table is a table name
   * @param {boolean} create is a flag to determine whether to create a table or not.
   * @memberof MigrationCreater
   */
  protected getStub (table: string, create: boolean) {
    /**
     * get content of stub file from this.stubPath()
     * for generate migration content with lodash template
     * and return content.
     */
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
