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
         if (!songs) {
            return next(new APIError(404, `songs not found`));
         }
         if (req.accepts('text/html')) {
           return res.render('songs', {songs: songs});
         }
         if (req.accepts('application/json')) {
           return res.status(200).send(songs);
         }
       })
       .catch(next)
   ;
});
router.get('/:id', (req, res) => {
   SongService.findById(req.params.id)
       .then(song => {
        if (!song) {
           return next(new APIError(404, `id ${req.params.id} not found`));
        }
        if (req.accepts('text/html')) {
          return res.render('song', {song: song});
        }
        if (req.accepts('application/json')) {
          return res.status(200).send(song);
        }
       })
       .catch(next)
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
