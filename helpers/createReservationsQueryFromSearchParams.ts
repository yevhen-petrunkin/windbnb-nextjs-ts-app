import { IParams } from "@/interfaces";

function createReservationsQueryFromSearchParams(params: IParams): object {
  const { listingId, userId, authorId } = params;

  let query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.userId = userId;
  }

  if (authorId) {
    query.listing = { userId: authorId };
  }

  return query;
}

export default createReservationsQueryFromSearchParams;
