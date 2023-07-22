import { IListingParams } from "@/interfaces";
import { SafeListingFoundById, SafeUser } from "@/types";
import getListingById from "@/actions/getListingById";
import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import ListingClient from "../../../components/listings/ListingClient";

const ListingPage: React.FC<{ params: IListingParams }> = async ({
  params,
}) => {
  const listing: SafeListingFoundById | null = await getListingById(params);
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
