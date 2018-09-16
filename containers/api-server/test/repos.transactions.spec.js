import test from 'ava'

import PouchDB from '../lib/pouchdb'

import perform from '../lib/transactions/repos'

const db = new PouchDB('repos')

test.after.always(async _ => {
  await db.destroy()
})

test.skip('(signature)', async t => {
  t.is(typeof insert, 'function')
  t.is(typeof insert(db), 'function')
})

test.serial('insert (valid)', async t => {
  const payload = {
    action: 'insert',
    source: 'a',
    subject: 'x',
    amount: 2
  }

  const res = await perform(db, payload)

  const [sourceRepo] = res.repos

  t.is(sourceRepo['x'], 2)
})

test.serial('remove (valid)', async t => {
  const payload = {
    action: 'remove',
    source: 'a',
    subject: 'x',
    amount: 1
  }

  const res = await perform(db, payload)

  const [sourceRepo] = res.repos

  t.is(sourceRepo['x'], 1)
})


test.serial('allocate (valid)', async t => {
  const payload = {
    action: 'allocate',
    source: 'a',
    target: 'b',
    subject: 'x',
    amount: 1
  }

  const res = await perform(db, payload)

  const [sourceRepo, targetRepo] = res.repos

  t.is(sourceRepo['x'], 0)
  t.is(targetRepo['x'], 1)
})
