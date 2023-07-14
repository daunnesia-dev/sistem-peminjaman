"use client";

import { charCounter } from "@/helpers/char-counter";
import { cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  // main fields
  firstName: z
    .string()
    .min(2, {
      message: "Nama depan minimal 2 karakter",
    })
    .max(50, {
      message: "Nama depan maksimal 50 karakter",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Nama depan minimal 2 karakter",
    })
    .max(50, {
      message: "Nama depan maksimal 50 karakter",
    }),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Nomor telepon minimal 10 karakter",
    })
    .max(15, {
      message: "Nomor telepon maksimal 15 karakter",
    })
    .startsWith("08", {
      message: "Nomor telepon harus diawali dengan 08",
    })
    .regex(/^[0-9]*$/, {
      message: "Nomor telepon hanya menerima karakter numerik",
    }),

  // Metadata
  address: z
    .string()
    .min(10, {
      message: "Alamat minimal 10 karakter",
    })
    .max(150, {
      message: "Alamat maksimal 150 karakter",
    }),
});

interface FormSettingsProps {
  user: any;
}

interface HandleChangeProps {
  e: React.ChangeEvent<HTMLTextAreaElement>;
  name: "firstName" | "lastName" | "email" | "phoneNumber" | "address";
  limit: number;
  setState: any;
}

const FormSettings: FC<FormSettingsProps> = ({ user }) => {
  const [email, setEmail] = useState(user.emailAddresses[0].emailAddress ?? "");
  const [disabledEmail] = useState(true);
  const [address, setAddress] = useState(user.publicMetadata.address ?? "");
  const [debounced] = useDebouncedValue(address, 200);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: email,
      phoneNumber: user.publicMetadata.phoneNumber ?? "",
      address: address,
    },
  });

  const handleChange = ({ e, name, limit, setState }: HandleChangeProps) => {
    const inputValue = e.target.value;
    if (inputValue.length <= limit) {
      setState(inputValue);
      form.setValue(name, inputValue);
    } else {
      setState(inputValue.slice(0, limit));
      form.setValue(name, inputValue.slice(0, limit));
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 space-y-8 md:space-y-0 md:space-x-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Depan
                  <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Belakang
                  <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn("flex items-center")}>
                Email{" "}
                {user.emailAddresses[0].verification.status === "verified" && (
                  <Badge
                    className={cn(
                      "ml-2 bg-emerald-700 hover:bg-emerald-600 text-zinc-50 dark:bg-emerald-800 dark:text-zinc-100 hover:dark:bg-emerald-900"
                    )}
                  >
                    <CheckCircledIcon className="w-3 h-3 mr-1" /> Terverifikasi
                  </Badge>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="daunnesia@gmail.com"
                  {...field}
                  type="email"
                  value={email}
                  disabled={disabledEmail}
                  onChange={() => setEmail(field.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nomor Telepon
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="081234567890"
                  type="number"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Alamat
                <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <div className={cn("space-y-4")}>
                  <Textarea
                    placeholder="Jl. Jalan No. 1"
                    {...field}
                    value={address}
                    onChange={(e) =>
                      handleChange({
                        e,
                        name: "address",
                        limit: 150,
                        setState: setAddress,
                      })
                    }
                    required
                  />
                  <div className="flex justify-start md:justify-end">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Sisa karakter {charCounter(debounced, 150)}
                    </p>
                  </div>
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Simpan Perubahan</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSettings;
