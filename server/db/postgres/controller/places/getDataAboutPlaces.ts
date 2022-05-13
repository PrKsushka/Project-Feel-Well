import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Places from '../../entity/places/places';

const getDataAboutPlacesPg = async (req: Request, res: Response) => {
  try {
    const places = await getRepository(Places).createQueryBuilder('places');
    let newResult = await places
      .leftJoinAndSelect('places.city', 'city')
      .leftJoinAndSelect('places.typeOfPlaces', 'typeOfPlaces')
      .getMany();

    if (req.query.place) {
      if (req.query.place === 'все') {
        newResult = await places
          .getMany();
      } else {
        newResult = await places
          .where('"typeOfPlaces".type=:type', { type: req.query.place })
          .getMany();
      }
    }
    if (req.query.city) {
      if (req.query.city === 'все') {
        newResult = await places
          .getMany();
      } else {
        newResult = await places
          .where('"city".city=:name', { name: req.query.city })
          .getMany();
      }
    }

    res.status(200).json(newResult);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
export default getDataAboutPlacesPg;
