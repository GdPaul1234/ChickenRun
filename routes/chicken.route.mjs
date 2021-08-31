import express from 'express';
import * as db from "../db/dbClient.mjs";
var router = express.Router();

router.post('/chicken', (req, res) => {
  var { chicken } = req.body;

  db.createChicken(chicken)
  .then(() => {
    res.json({  message: 'Done!' });
  }).catch((err) => {
    console.error(err.message)
    res.status(400).json({ message: 'Something went wrong' }); 
  });
    
})

router.route('/chicken/:chickenId')
  .get(async (req,res) => {
    const chickenId = parseInt(req.params.chickenId);

    if(!Number.isInteger(chickenId)) {
      res.status(400).json({ message: "chickenId should be a Integer" });
      return;
    }
    const result = await db.getChicken(chickenId)
    res.json(result); 
  })

  .put((req,res) => {
    const chickenId = parseInt(req.params.chickenId);
    var { chicken } = req.body;

    if(!Number.isInteger(chickenId)) {
      res.status(400).json({ message: "chickenId should be a Integer" });
      return;
    }

      db.replaceChicken(chickenId, chicken)
      .then(() => {
        res.json({message: 'Done!' });
      }).catch((err) => {
        console.error(err.message)
        res.status(400).json({ message: 'Bad request' }); 
      });
  })

  .patch((req,res) => {
    const chickenId = parseInt(req.params.chickenId);
    const { propertyName, propertyValue } = req.body;

    if(!Number.isInteger(chickenId)) {
      res.status(400).json({ message: "chickenId should be a Integer" });
      return;
    }

    db.changeChickenProperty(chickenId, propertyName, propertyValue).then(() => {
      res.json({message: 'Done!' });
    }).catch((err) => {
      console.error(err.message)
      res.status(400).json({ message: 'Bad request' }); 
    });

  })

  .delete((req,res) => {
    const chickenId = parseInt(req.params.chickenId);

    if(!Number.isInteger(chickenId)) {
      res.status(400).json({ message: "chickenId should be a Integer" });
      return;
    }

    db.deleteChicken(chickenId).then(
      () => { res.json({ message: 'Done!' }) }
    );
    
  })

  router.patch('/chicken/:chickenId/run', (req,res) => {
    const chickenId = parseInt(req.params.chickenId);

    if(!Number.isInteger(chickenId)) {
      res.status(400).json({ message: "chickenId should be a Integer" });
      return;
    }

    db.runChicken(chickenId)
    .then(() => {
      res.json({message: 'Done!' });
    }).catch((err) => {
      console.error(err.message)
      res.status(400).json({ message: 'Bad request' }); 
    });
  })

  export default router;
