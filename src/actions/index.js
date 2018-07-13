import * as loginActions from './login'
import * as homeActions from './home'
import * as dashboardActions from './dashboard'
import * as TransactionActions from './transactions.js'
import * as TransferAction from './transfer.js'
import * as moreActions from './more'

export const ActionCreators = Object.assign({},
  loginActions,
  homeActions,
  dashboardActions,
  TransferAction,
  TransactionActions,
  moreActions
);