import express from "express";
const router = express.Router();
import Game from '../model/game.js';

router.post('/move/:boxId', async (req, res) => {
  try {
    const game = await Game.create({ boxId: req.params.boxId });
    return res.status(201).json(game);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.patch('/undo', async (req, res) => {
  try {
    let lastMove = (await Game.find({ undo: false }).sort({ _id: -1 }).limit(1))[0];
    if(!lastMove){
      return res.status(404).send('No move to undo')
    }
    lastMove.undo = true;
    await lastMove.save();

    let secondLastMove = (await Game.find({ undo: false }).sort({ _id: -1 }).limit(1))[0];
    if(!secondLastMove){
      return res.status(404).send('No move to undo')
    }
    return res.status(200).json(secondLastMove);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.patch('/redo', async (req, res) => {
  try {
    let lastMove = await Game.findOne({ undo: true });
    if(!lastMove){
      return res.status(404).send('No move to redo')
    }
    lastMove.undo = false;
    await lastMove.save();
    return res.status(200).json(lastMove);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

export default router;