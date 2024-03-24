"use client";

import Logo from "@/components/logo";
import { paths } from "@/paths";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { HiEyeSlash } from "react-icons/hi2";
import { HiEye } from "react-icons/hi2";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", { username: username, password: password, redirect: false });
    if (res?.error === "CredentialsSignin") return toast.error("Invalid credential");
    router.replace(paths.dashboard());
  };

  return (
    <main>
      <section className="px-8 flex min-h-screen justify-center items-center">
        <Card className="max-w-[400px]">
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex gap-3">
              <Logo />
              <div className="flex flex-col">
                <p className="text-md">Log in</p>
                <p className="text-small text-default-500">Ticket Trove</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
              <Input label="Username" name="username" labelPlacement="outside" variant="bordered" placeholder="Enter your username" isRequired value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" /> : <HiEye className="text-2xl text-default-400 pointer-events-none" />}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
                labelPlacement="outside"
                name="password"
                isRequired
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </main>
  );
}
