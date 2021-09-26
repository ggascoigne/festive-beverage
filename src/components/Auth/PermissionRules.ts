import { AtLeastOne } from '../../utils'

type Permissions = AtLeastOne<{
  dynamic?: Record<string, unknown>
  static?: Perms[]
}>

export type Rules = Record<string, Permissions>

export enum Perms {
  GraphiqlLoad = 'graphiql:load',
  IsAdmin = 'is:Admin',
  IsLoggedIn = 'is:LoggedIn',
}

export enum Roles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
}

const rules: Rules = {
  [Roles.ROLE_ADMIN]: {
    dynamic: {
      '*': () => true,
    },
  },
  [Roles.ROLE_USER]: {
    static: [Perms.IsLoggedIn],
  },
}

export default rules
