"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UserCircle, Lock, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// 1. Zod Schema
export const step3Schema = z
  .object({
    username: z.string().min(4, "Minimum 4 characters"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// 2. Infer type
export type Step3Data = z.infer<typeof step3Schema>

// 3. Props
interface Step3Props {
  onNext: (data: Step3Data) => void
  onBack: () => void
  defaultValues: Step3Data
}

export default function Step3({ onNext, onBack, defaultValues }: Step3Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues,
  })

  const onSubmit = (data: Step3Data) => {
    onNext(data)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border-0 dark:bg-gray-800/50">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-center dark:text-white">Account Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        placeholder="Choose a username"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
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
