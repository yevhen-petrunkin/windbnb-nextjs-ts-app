"use client";

import axios from "axios";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const switchModals = useCallback(() => {
    registerModal.onClose();
    setTimeout(() => loginModal.onOpen(), 600);
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setIsLoading(true);
    axios
      .post("/api/register", formData)
      .then(() => {
        switchModals();
        toast.success("Success! Now log in please.");
      })
      .catch(() => {
        toast.error("Oops... Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Windbnb"
        subtitle="Create an account!"
        center
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />

      <div className="mt-4 text-gray-600 text-center font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <p>Already have an account?</p>
          <button
            type="button"
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={switchModals}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
