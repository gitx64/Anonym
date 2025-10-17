"use client";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { sign } from "crypto";
import { set } from "mongoose";
import { ApiResponse } from "../../../../types/ApiResponse";
import { signInVerification } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
// you must have axios for flexibility because special function names in nextjs are only valid under route handellers.

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 500);
  const router = useRouter();

  //zod
  const form = useForm<z.infer<typeof signInVerification>>({
    // can take <z.infer<typeof signUpSchema>>
    resolver: zodResolver(signInVerification),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   const checkUserNameUnique = async () => {
  //     if (debouncedUsername) {
  //       setIsCheckingUsername(true);
  //       setUsernameMessage("");
  //     }
  //     try {
  //       const response = await axios.get(
  //         `/api/check-username-unique?username=${debouncedUsername}`,
  //       );
  //       console.log(response);
  //       setUsernameMessage(response.data.message);
  //     } catch (error) {
  //       const axiosError: AxiosError<ApiResponse> =
  //         error as AxiosError<ApiResponse>; //assertion as AxiosError

  //       setUsernameMessage(
  //         axiosError.response?.data.message ?? "Error Checking Username",
  //       );
  //     } finally {
  //       setIsCheckingUsername(false);
  //     }
  //   };
  //   checkUserNameUnique();
  // }, [debouncedUsername]);

  // const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(e.target.value);
  // };

  // const handleUsernameMessage = () => {
  //   setUsername(username);
  // }

  // const handleLoadingState = () => {
  //   setUsername(username);
  // }
  const onSubmit = async (data: z.infer<typeof signInVerification>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials",{
        redirect: false,
        ...data
      })

      if(result?.error){
        toast.error(result.error)
      }
      toast.success("Signed In Successfully");
      router.push("/dashboard")
    } catch (error) {
      toast.error("Something Went Wrong while signing in")
    }finally{
      setIsSubmitting(false);
    }
  }
  return (
    <>
    </>
  );
}
