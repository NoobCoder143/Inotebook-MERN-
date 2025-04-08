const express = require("express");
const router = express.Router();
var fetchuser = require("../Middleware/fetchuser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

//Get all notes using:Get "/api/notes/fetchallnotes", login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
     try{
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
     }
     catch(error){
          console.error(error.message);
          return res.status(500).send({error:'Internal Server error'})
     }
});

//Adding notes using:Post "/api/notes/addnotes", login required
router.post(
  "/addnotes",
  fetchuser,
 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //if there are any errors return bad request and errors
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server error " });
    }
  }
);

//Updating  an existing notes using:Put "/api/notes/addnotes", login required
router.put(
  "/updatenotes/:id",
  fetchuser,
 
  async (req, res) => {
   try{
   const {title,description,tag}=req.body;
   //create a new note object
   const newnote={}
   if(title){newnote.title=title};
   if(description){newnote.description=description};
   if(tag){newnote.tag=tag};

   //find the node to be updated and update it
   //findById searches in the database for the note from the given id 
   let note= await Notes.findById(req.params.id);
   
  if(!note){return res.status(404).send("Not found")}
  //checking whether your trying to update someone else's note or not
  if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed")}
  note =await Notes.findByIdAndUpdate(req.params.id,{$set :newnote},{new:true})
  res.json({note});
    } catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server error")
    }
  }
);

   //Deleting an note using:delete "/api/notes/deletenotes", login required
router.delete(
  "/deletenotes/:id",
  fetchuser,
 
  async (req, res) => {
   try{
   
   //find the node to be deleted and delete it
   //findById searches in the database for the note from the given id 
   let note= await Notes.findById(req.params.id);
   
  if(!note){return res.status(404).send("Not found")}
  //checking whether your trying to delete someone else's note or not
  if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed")}
  note =await Notes.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted",note:note});
    } 
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server error")
    }
  }
)

//search notes by title,Login Required
router.get(
  "/findNote",
  fetchuser,
  async(req,res)=>{
      try{const {query}=req.query;
      const note= await Notes.find({ user: req.user.id,title : { $regex: query, $options: "i" }})
      if(!note){
        res.send("No Results")
      }
      else{
        res.json(note)
      }}
      catch(error){
           res.status(500).send("Internal server error")
      }
  }
)
//search notes by tag,Login required
router.get(
  "/findTag",fetchuser,
  async(req,res)=>{
    try{const {query}=req.query;
    const note= await Notes.find({ user: req.user.id,tag : { $regex: query, $options: "i" }})
    if(!note){
      res.send("No Results")
    }
    else{
      res.json(note)
    }}
    catch(error){
         res.status(500).send("Internal server error")
    }
}
)


module.exports = router;
