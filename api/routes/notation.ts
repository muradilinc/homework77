import {Router} from "express";
import {Notation, NotationData} from "../type";
import {imagesUpload} from "../helpers/multer";
import {promises as fs} from 'fs';
import crypto from "crypto";

const notationRouter = Router();
let data: NotationData[] = [];
const filename = './db.json';

notationRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const notation: Notation = {
      author: req.body.author ? req.body.author : null,
      message: req.body.message,
      image: req.file ? req.file.filename : null,
    };

    if (!notation.message) {
      return res.status(400).send({error: 'Message must be present in the request'});
    }

    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();
    data.push({...notation, id, datetime});
    await fs.writeFile(filename, JSON.stringify(data));

    res.send(notation);
  } catch (error) {
    next(error);
  }
});

notationRouter.get('/', async (req, res, next) => {
  try {
    const fileContent = await fs.readFile(filename);
    data = JSON.parse(fileContent.toString());
    res.send(data);
  } catch (error) {
    next(error)
  }
});

export default notationRouter;