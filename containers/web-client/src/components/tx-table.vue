<template lang="pug">
el-table(
  :data="members"
  :default-sort="defaultSort"
  :show-summary="true"
  :summary-method="getSummary"
  )

  el-table-column(type="index")

  el-table-column(
    prop="action"
    label="Action"
    :filters="optionsFor('action')"
    :filter-method="filterHandler")

  el-table-column(
    prop="target"
    label="Target"
    :filters="optionsFor('target')"
    :filter-method="filterHandler")

  el-table-column(
    prop="amount"
    label="Amount"
    align="right")

  el-table-column(
    prop="time"
    label="Date"
    :sortable="true"
    align="right")
    template(slot-scope="scope")
      time(:title="lastTimeOfToNow(scope.row)")
        | {{ lastTimeOf(scope.row) }}
</template>

<script>

import {
  map,
  uniq,
  pluck,
  compose,
  always,
  reduce
} from 'ramda'

import {
  contained,
  compact,
  stubArray
} from 'ramda-adjunct'

import {
  format,
  distanceInWordsToNow
} from 'date-fns'

//

const props = {
  members: {
    type: Array,
    default: stubArray
  }
}

const data = always({
  defaultSort: {
    prop: 'time',
    order: 'ascending'
  }
})

const computed = {
  optionsFor () {
    const parse = compose(
      map(value => ({ text: value, value })),
      compact,
      uniq
    )

    return prop => {
      const raw = pluck(prop, this.members)
      return parse(raw)
    }
  },
  lastTimeOf () {
    return tx => format(tx.time, 'MM/DD HH:mm')
  },
  lastTimeOfToNow () {
    return tx => distanceInWordsToNow(tx.time)
  }
}

const methods = {
  filterHandler (value, row, column) {
    const property = column['property']
    return row[property] === value
  },
  getSummary (ctx) {
    const { data } = ctx

    const isOutgoing = contained([
      'remove',
      'transfer'
    ])

    const total = (t, { action, amount }) => {
      const d = isOutgoing(action) ? -amount : amount
      return t + d
    }

    const amount = reduce(total, 0, data)

    return ['', 'Total', '', amount]
  }
}

export default {
  name: 'tx-table',
  props,
  data,
  computed,
  methods
}
</script>
