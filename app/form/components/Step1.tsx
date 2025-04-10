"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { User, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// 1. Zod Schema for validation
export const step1Schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
})

// 2. Infer TypeScript type from schema
export type Step1Data = z.infer<typeof step1Schema>

// 3. Define props type
interface Step1Props {
  onNext: (data: Step1Data) => void
  defaultValues: Step1Data
}

export default function Step1({ onNext, defaultValues }: Step1Props) {
  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  })

  const onSubmit = (data: Step1Data) => {
    onNext(data)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border-0 dark:bg-gray-800/50">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-center dark:text-white">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        placeholder="Enter your full name"
                        className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        placeholder="your.email@example.com"
                        type="email"
                        className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        placeholder="(123) 456-7890"
                        className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />

            <CardFooter className="px-0 pt-2 md:pt-4">
              <Button
                type="submit"
                className="w-full dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
              >
                Next Step
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
