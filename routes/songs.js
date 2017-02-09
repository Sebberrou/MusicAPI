const router = require('express').Router();
const SongService = require('../services/songsService');
const APIError = require('../lib/error');

var CheckData = function(req, res, next) {
  if (req.body.title == ""){
    return res.status(400).send();
  }
  if (req.body.album == ""){
    return res.status(400).send();
  }
  next();
};

router.post('/',CheckData, (req, res) => {
  return SongService.create(req.body)
      .then(song => {
        if (req.accepts('text/html')) {
          return res.redirect(`/songs/${song.id}`);
        }
        if (req.accepts('application/json')) {
          return res.status(201).send(song);
        }

      })
      .catch(err => {
         res.status(500).send(err);
      })
   ;
});
router.get('/', (req, res, next) => {
  if (!req.accepts('text/html') && !req.accepts('application/json')) {
    return next(new APIError(406, 'Not valid type for asked resource'));
   }
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

router.get('/add', (req, res) => {
  if (!req.accepts('text/html') && !req.accepts('application/json')) {
    return next(new APIError(406, 'Not valid type for asked resource'));
   }
   return res.render('songAdd');
});
router.get('/edit/:id', (req, res) => {
  if (!req.accepts('text/html')) {
    return next(new APIError(406, 'Not valid type for asked resource'));
   }
   SongService.findById(req.params.id)
       .then(song => {
        if (!song) {
           return next(new APIError(404, `id ${req.params.id} not found`));
        }
        if (req.accepts('text/html')) {
          return res.render('songEdit', {song: song});
        }
       })
       .catch(next)
});

router.get('/:id', (req, res, next) => {
  if (!req.accepts('text/html') && !req.accepts('application/json')) {
    return next(new APIError(406, 'Not valid type for asked resource'));
   }
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
