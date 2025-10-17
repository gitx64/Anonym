import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import z from "zod";
import { ApiResponse } from "../../../../types/ApiResponse";
import { toast } from "sonner";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 500);

  const router = useRouter();

  //zod
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
        username: "",
        email: "",
        password: ""
    }
  })

  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
      }
      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${debouncedUsername}`,
        );
        console.log(response);
        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError: AxiosError<ApiResponse> =
          error as AxiosError<ApiResponse>; //assertion as AxiosError

        setUsernameMessage(
          axiosError.response?.data.message ?? "Error Checking Username",
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };
    checkUserNameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/signUp",data);
      console.log(response.data) //TODO: remove
      toast.success(response.data.message)
      router.replace(`/verify/${username}`)
      
    } catch (error) {
      console.error("Signup error",error)
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage)
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <>

    </>
  )
} 