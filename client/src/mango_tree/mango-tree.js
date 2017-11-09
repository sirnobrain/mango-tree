class MangoTree {
  static create () {
    return {
      maxAge: Math.floor(Math.random() * (26281 - 16728) + 16278),
      matureAge: Math.floor(Math.random() * (25 - 8) + 8),
      maxHeight: Math.floor(Math.random() * (1200 - 600) + 600),
      maxFruits: Math.floor(Math.random() * (48 - 16) + 8),
      age: 0,
      isMature: false,
      height: 1,
      fruits: 0,
      harvestedFruits: 0,
      healthStatus: true
    }
  }
}

export default MangoTree
