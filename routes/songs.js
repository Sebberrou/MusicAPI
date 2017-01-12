const router = require('express').Router();
const SongService = require('../services/songsService');

router.post('/', (req, res) => {
  return SongService.create(req.body)
      .then(song => {
         res.status(201).send(song);
      })
      .catch(err => {
         res.status(500).send(err);
      })
   ;
});
router.get('/', (req, res) => {
   SongService.find(req.query)
       .then(songs => {
           res.status(200).send(songs);
       })
   ;
});
router.delete('/:id', (req, res) => {
   SongService.delete(req.params)
       .then(songs => {
           res.status(204).send();
       })
   ;
});
router.delete('/', (req, res) => {
   SongService.deleteAll()
       .then(songs => {
           res.status(204).send();
       })
   ;
});
router.get('/artist/:name', (req, res) => {
   SongService.findByArtist(req.params)
       .then(songs => {
           res.status(200).send(songs);
       })
       .catch(err => {
         res.status(500).send(err);
       })
   ;
});
module.exports = router;
