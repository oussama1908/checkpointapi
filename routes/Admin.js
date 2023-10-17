const express=require('express');
const MOVIE=require('../modules/moviesschema')
const {getmovies,deletemovie,updatemovie,postmovie,getByname,postListMovie,deleteManyMovies,updatMultipulemovie }=require('../controllers/adminControllers')
const router=express.Router()


//creation of a cards
router.post('/task2', postmovie);
// get all cards
router.get('/task3',getmovies);
//delett cards 
router.delete('/deleteById/:id',deletemovie );
//deleete multiple cards
router.delete('/movies/deleteMany', deleteManyMovies);


   // Task 3 update
router.put('/update/:id', updatemovie);
      
router.get('/:name',getByname);
// creat multiple postlist
router.put('/updatMultipulemovie/:id', updatMultipulemovie)


//updatemutliple
router.put('/updatMultipulemovie',updatMultipulemovie)
module.exports=router;


