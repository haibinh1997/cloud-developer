import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get("/", async (req: express.Request, res: express.Response) => {
    res.send("try Get/filteredimage?image_url={{}}")
  })
  
  app.get("/filteredimage", async ( req: express.Request, res: express.Response ) => {
    const { image_url } = req.query
    if (image_url) {
      try {
        const result = await filterImageFromURL(image_url)
        res.status(200).sendFile(result, err => {
          if (err) {
            res.status(404).send("sent file unsuccessful!")
          } else {
            deleteLocalFiles([result])
          }
        })
      } catch {
        res.status(500).send("Something wrong! try again!")
      }
    }
    else{
      res.status(404).send("get image url fail!")
    }
  } );

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();