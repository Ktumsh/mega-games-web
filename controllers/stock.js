import apiStore from "../data/api/apiStore.json" assert { type: "json" };

function findGameById(group, id) {
  const gameId = parseInt(id);
  if (apiStore[group]) {
    const game = apiStore[group].find((game) => game.id === gameId);
    if (game) {
      return game;
    }
  }
  return null;
}

export function reduceStock(req, res) {
  const { id } = req.params;
  const { group, quantity = 1 } = req.body;
  const game = findGameById(group, id);

  if (game) {
    if (game.stock >= quantity) {
      game.stock -= quantity;
      return res.json({ stock: game.stock });
    } else {
      return res.status(400).json({ error: "Stock insuficiente" });
    }
  } else {
    return res.status(404).json({ error: "Juego no encontrado" });
  }
}

export function returnStock(req, res) {
  const { id } = req.params;
  const { group, quantity = 1 } = req.body;
  const game = findGameById(group, id);

  if (game) {
    game.stock += quantity;
    return res.json({ stock: game.stock });
  } else {
    return res.status(404).json({ error: "Juego no encontrado" });
  }
}
