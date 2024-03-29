import { ux, Command } from '@oclif/core'
import * as chalk from 'chalk'

import { getPostgresArgs, resetOwner } from '../shared/scriptUtils'

import { config } from '@/shared/config'

const targetUser = config.userDatabase.user

export default class ResetDatabaseOwner extends Command {
  static description = 'Reset the database owner - for use after import'

  // eslint-disable-next-line class-methods-use-this
  async run() {
    console.log(`using ${getPostgresArgs(config.rootDatabase)}`)
    ux.action.start(`resetting database owner for ${targetUser}`)
    resetOwner(config.rootDatabase, targetUser, false)
      .then(() => {
        ux.action.stop()
      })
      .catch((reason: any) => {
        console.error(chalk.bold.red('error detected'))
        console.error(reason)
        process.exit(-1)
      })
  }
}
