"use client";

import categories from "@/constants/categories";
import { useState, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState<number>(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any): void => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => setStep((value) => value - 1);

  const onNext = () => setStep((value) => value + 1);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading
        title="Which describes your place best?"
        subtitle="Pick a category!"
        center
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map(({ label, icon }) => (
          <li key={label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === label}
              label={label}
              icon={icon}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
          center
        />
        <CountrySelect
          value={location}
          onChange={(locationData) => setCustomValue("location", locationData)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place."
          subtitle="What amenities do you have?"
          center
        />
        <ul className="flex flex-col gap-4 [&>*:not(:first-child)]:border-t-neutral-500 [&>*:not(:first-child)]:border-t-[1px] [&>*:not(:first-child)]:pt-4">
          <Counter
            title="Guests"
            subtitle="How many guests do you allow?"
            value={guestCount}
            onChange={(guestCountVal) =>
              setCustomValue("guestCount", guestCountVal)
            }
          />

          <Counter
            title="Rooms"
            subtitle="How many rooms do you have?"
            value={roomCount}
            onChange={(roomCountVal) =>
              setCustomValue("roomCount", roomCountVal)
            }
          />

          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(bathroomCountVal) =>
              setCustomValue("bathroomCount", bathroomCountVal)
            }
          />
        </ul>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place."
          subtitle="Show your guests what your place looks like!"
          center
        />

        <ImageUpload
          value={imageSrc}
          onChange={(imageSrcVal) => setCustomValue("imageSrc", imageSrcVal)}
        />
      </div>
    );
  }

  return (
    <Modal
      //   disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Rent A Home!"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      body={bodyContent}
      //   footer={footerContent}
    />
  );
};

export default RentModal;
