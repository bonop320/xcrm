function fetchAll (ctx) {
  const data = [
    {
      _id: '01CMFQ6Y0Z0X7NTPNX85ZFAP6B',
      _rev: '1-7e5c4d4306e5ea21f0dea1db660305bb',
      name: 'The Great Soviet Encyclopedia',
      price: 100
    }, {
      _id: '01CMFQ6Y0Z0X7NTPNX85ZFAP6C',
      _rev: '1-7e5c4d4306e5ea21f0dea1db660305cc',
      name: 'The Ok Soviet Encyclopedia',
      price: 80
    }
  ]

  ctx.commit('SET_ALL', data)
}

export {
  fetchAll
}
