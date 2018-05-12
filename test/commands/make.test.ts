import { expect, test } from '@oclif/test'

describe('make', () => {
  test
  .stderr()
  .command(['make'])
  .it('runs make', ctx => {
    // expect(ctx.stderr).to.contain()
  })

  test
  .stderr()
  .command(['make', '--table', 'users'])
  .it('runs make --table users', ctx => {
    // expect(ctx.stderr).to.contain()
  })
})
