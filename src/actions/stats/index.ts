"use server";

import { db } from "@/db";

export interface MoviePerformance {
  _id: string;
  totalBooking: number;
  values: number;
}

export async function getMoviePerformance() {
  const result = await db.booking.aggregateRaw({
    pipeline: [
      {
        $lookup: {
          from: "Screening",
          localField: "screeningId",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "Movie",
                localField: "movieId",
                foreignField: "_id",
                as: "movieItem",
              },
            },
          ],
          as: "screeningItem",
        },
      },
      {
        $unwind: "$screeningItem",
      },
      {
        $unwind: "$screeningItem.movieItem",
      },
      {
        $group: { _id: "$screeningItem.movieItem.title", totalBooking: { $sum: { $size: "$seatsBooked" } }, values: { $sum: "$totalAmount" } },
      },
      {
        $sort: { totalBooking: -1 },
      },
    ],
  });
  let el = [] as MoviePerformance[];
  for (const val of Object.values(result)) {
    const objCopy = JSON.parse(JSON.stringify(val));
    el.push(objCopy);
  }
  return el;
}
