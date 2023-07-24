"use client";

import { SearchState } from "@/types";

import dynamic from "next/dynamic";
import qs from "query-string";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import useSearchModal from "@/hooks/useSearchModal";

import createSearchQueryFromSearchParams from "@/helpers/createSearchQueryFromSearchParams copy";

import Modal from "./Modal";
import Heading from "@/components/Heading";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const initialState = {
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  dateRange: initialDateRange,
};

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState<number>(STEPS.LOCATION);
  const [state, setState] = useState<SearchState>(initialState);

  console.log(state);

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [state.location?.latlng]
  );

  const onBack = useCallback(() => setStep((value) => value - 1), []);

  const onNext = useCallback(() => setStep((value) => value + 1), []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    const query = createSearchQueryFromSearchParams(params, state);

    const url = qs.stringifyUrl({ url: "/", query: query }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    router,
    state,
    state.location,
    state.dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location!"
        center
      />
      <CountrySelect
        value={state.location}
        onChange={(location) =>
          setState((prev) => ({ ...prev, location: { ...location } }))
        }
      />
      <Map center={state.location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
          center
        />
        <Calendar
          range={state.dateRange}
          onChange={(dateRange) =>
            setState((prev) => ({
              ...prev,
              dateRange: { ...dateRange.selection },
            }))
          }
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find your perfect place!"
          center
        />

        <ul className="flex flex-col gap-4 [&>*:not(:first-child)]:border-t-neutral-500 [&>*:not(:first-child)]:border-t-[1px] [&>*:not(:first-child)]:pt-4">
          <Counter
            title="Guests"
            subtitle="How many guests are coming?"
            value={state.guestCount}
            onChange={(guestCount) =>
              setState((prev) => ({ ...prev, guestCount }))
            }
          />

          <Counter
            title="Rooms"
            subtitle="How many rooms do you need?"
            value={state.roomCount}
            onChange={(roomCount) =>
              setState((prev) => ({ ...prev, roomCount }))
            }
          />

          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={state.bathroomCount}
            onChange={(bathroomCount) =>
              setState((prev) => ({ ...prev, bathroomCount }))
            }
          />
        </ul>
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default SearchModal;
