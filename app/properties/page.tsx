import { SafeUser, SafeListing } from "@/types";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";

import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import PropertiesClient from "@/components/properties/PropertiesClient";

const PropertiesPage = async () => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please, log in." />
      </ClientOnly>
    );
  }

  const listings: SafeListing[] = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties Found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
