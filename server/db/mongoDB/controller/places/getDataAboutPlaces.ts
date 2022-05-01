import { Request, Response } from 'express';
import Places from '../../models/places';

const getDataAboutPlaces = async (req: Request, res: Response) => {
  try {
    let aggregationParams: any[] = [{ $sort: { _id: 1 } }];
    if (req.query.place) {
      aggregationParams = [
        ...aggregationParams,
        {
          $match: {
            typeOfPlaces: req.query.place
          }
        }
      ];
      if(req.query.place==='все') {
        aggregationParams = [
          { $sort: { _id: 1 } }
        ]
      }
    }

    const data = await Places.aggregate(aggregationParams);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default getDataAboutPlaces;
