import { Request, Response } from 'express';
import Places from '../../models/places';

const getDataAboutPlaces = async (req: Request, res: Response) => {
  try {
    const data = await Places.find({});
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default getDataAboutPlaces;
