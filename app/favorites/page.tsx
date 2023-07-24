import { SafeUser, SafeListing } from "@/types";

import getCurrentUser from "@/actions/getCurrentUser";
import getFavorites from "@/actions/getFavorites";

import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import FavoritesClient from "@/components/favorites/FavoritesClient";

const FavoritesPage = async () => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please, log in." />
      </ClientOnly>
    );
  }

  const favorites: SafeListing[] = await getFavorites();

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorites Found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
