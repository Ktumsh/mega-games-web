import apiStore from "../data/api/apiStore.json" assert { type: "json" };

const collections = ["editorSalePage", "gamesCards", "offerCards", "giftCards"];

function findGameById(id) {
  const gameId = parseInt(id);
  for (const collectionName of collections) {
    if (apiStore[collectionName]) {
      const game = apiStore[collectionName].find((game) => game.id === gameId);
      if (game) {
        return game;
      }
    }
  }
  return null;
}

export function reduceStock(req, res) {
  const { id } = req.params;
  const game = findGameById(id);

  if (game) {
    if (game.stock > 0) {
      game.stock--;
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
  const game = findGameById(id);

  if (game) {
    game.stock++;
    return res.json({ stock: game.stock });
  } else {
    return res.status(404).json({ error: "Juego no encontrado" });
  }
}
