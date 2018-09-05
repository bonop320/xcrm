import {
  values,
  filter,
  propEq,
  compose
} from 'ramda'

const all = values

const allAgents = compose(
  filter(propEq('role', 'agent')),
  all
)

export {
  all,
  allAgents
}
