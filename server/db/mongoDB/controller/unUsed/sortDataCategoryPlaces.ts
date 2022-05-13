// import { Request, Response } from 'express';
// import Places from '../../models/places';
// import CategoryOfPlaces from '../../models/categoryOfPlaces';
//
// const sortDataCategoryPlaces = async (req: Request, res: Response) => {
//   try {
//     let aggregateOptions: Array<any> = [{ $sort: { _id: 1 } }];
//     if (req.query.includePlaces) {
//       aggregateOptions = [
//         ...aggregateOptions,
//         {
//           $lookup: {
//             from: 'places',
//             as: 'recipes',
//             let: { placesId: '$_id' },
//             pipeline: [
//               {
//                 $match: {
//                   $expr: { $eq: ['$placesId', '$$placesId'] }
//                 }
//               }
//             ]
//           }
//         }
//       ];
//       if (req.query.placesCategory) {
//         aggregateOptions = [
//           ...aggregateOptions,
//           {
//             $match: {
//               name: req.query.placesCategory
//             }
//           }
//         ];
//       }
//     }
//     const data = await CategoryOfPlaces.aggregate(aggregateOptions);
//     res.status(200).json(data);
//   } catch (e: any) {
//     res.status(500).json({ message: e.message });
//   }
// };
// export default sortDataCategoryPlaces;
