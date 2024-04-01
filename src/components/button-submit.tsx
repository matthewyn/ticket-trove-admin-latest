"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit" isLoading={pending}>
      Submit
    </Button>
  );
}
