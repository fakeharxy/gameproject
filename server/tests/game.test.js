const CreatureBuilder = require('../builders/CreatureBuilder')
const Game = require('../objects/Game')

test('Creates a creature and adds it to the creature list', () => {
    game = new Game()
    game.createRandomCreature()
    expect(Object.keys(game.creaturesById).length).toBe(1)
  })