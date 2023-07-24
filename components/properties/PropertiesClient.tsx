"use client";

import { IPropertiesClientProps } from "@/interfaces";
import { SafeListing } from "@/types";

import axios from "axios";
import { toast } from "react-hot-toast";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";

const PropertiesClient: React.FC<IPropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted!");
          router.refresh();
        })
        .catch((error: any) => toast.error(error?.response?.data?.error))
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <section>
      <Container>
        <Heading title="Properties" subtitle="List of your properties" />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: SafeListing) => (
            <li key={listing.id}>
              <ListingCard
                data={listing}
                actionId={listing.id}
                onAction={onCancel}
                disabled={deletingId === listing.id}
                actionLabel="Remove property"
                currentUser={currentUser}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default PropertiesClient;
