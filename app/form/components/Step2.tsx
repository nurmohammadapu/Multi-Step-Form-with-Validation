"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MapPin, Building, Hash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// 1. Zod schema for step 2
export const step2Schema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().regex(/^\d{4,}$/, "Zip must be at least 4 digits"),
})

// 2. Infer the type
export type Step2Data = z.infer<typeof step2Schema>

// 3. Props type
interface Step2Props {
  onNext: (data: Step2Data) => void
  onBack: () => void
  defaultValues: Step2Data
}

export default function Step2({ onNext, onBack, defaultValues }: Step2Props) {
  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  })

  const onSubmit = (data: Step2Data) => {
    onNext(data)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border-0 dark:bg-gray-800/50">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-center dark:text-white">Address Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Street Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        placeholder="123 Main Street"
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">City</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        placeholder="Dhaka"
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
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Zip Code</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        placeholder="1216"
                        className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />

            <CardFooter className="px-0 pt-2 md:pt-4 flex justify-between gap-2 md:gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Previous
              </Button>
              <Button type="submit" className="dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
                Next Step
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
