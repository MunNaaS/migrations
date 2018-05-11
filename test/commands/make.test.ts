import { expect, test } from '@oclif/test'

describe('make', () => {
  test
  .stdout()
  .command(['make'])
  .it('runs make', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['make', '--table', 'users'])
  .it('runs make --table users', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })
})
