import { ux, Command } from '@oclif/core'
import * as chalk from 'chalk'

import { createCleanDb } from '../shared/scriptUtils'

import { config } from '@/shared/config'

const { database } = config.rootDatabase
const targetUser = config.userDatabase.user
const targetUserPassword = config.userDatabase.password

export default class CreateCleanDb extends Command {
  static description = 'Create a clean database.'

  // eslint-disable-next-line class-methods-use-this
  async run() {
    console.log(`Recreating database ${database}`)

    ux.action.start('cleaning database')
    createCleanDb(config.rootDatabase, targetUser, targetUserPassword, false)
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
