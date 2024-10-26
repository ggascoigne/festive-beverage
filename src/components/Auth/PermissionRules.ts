import { AtLeastOne } from '../../utils'

export enum Perms {
  IsAdmin = 'is:Admin',
  IsLoggedIn = 'is:LoggedIn',
}

export enum Roles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
}

type Permissions = AtLeastOne<{
  dynamic?: Record<string, unknown>
  static?: Perms[]
}>

export type Rules = Record<string, Permissions>

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
