"use client"

import { Check, User, MapPin, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface UserFormData {
  fullName: string
  email: string
  phone: string
  street: string
  city: string
  zip: string
  username: string
  password: string
  confirmPassword: string
}

interface SummaryProps {
  data: UserFormData
  onBack: () => void
  onSubmit: () => void
}

export default function Summary({ data, onBack, onSubmit }: SummaryProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-md border-0 dark:bg-gray-800/50">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-center dark:text-white">Review Your Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary dark:text-primary" />
            <h3 className="text-lg font-semibold dark:text-white">Personal Information</h3>
          </div>
          <Separator className="dark:bg-gray-700" />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground dark:text-gray-400">Full Name:</div>
            <div className="font-medium dark:text-gray-200">{data.fullName}</div>

            <div className="text-muted-foreground dark:text-gray-400">Email:</div>
            <div className="font-medium dark:text-gray-200">{data.email}</div>

            <div className="text-muted-foreground dark:text-gray-400">Phone:</div>
            <div className="font-medium dark:text-gray-200">{data.phone}</div>
          </div>
        </div>

        {/* Address Information Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary dark:text-primary" />
            <h3 className="text-lg font-semibold dark:text-white">Address Information</h3>
          </div>
          <Separator className="dark:bg-gray-700" />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground dark:text-gray-400">Street:</div>
            <div className="font-medium dark:text-gray-200">{data.street}</div>

            <div className="text-muted-foreground dark:text-gray-400">City:</div>
            <div className="font-medium dark:text-gray-200">{data.city}</div>

            <div className="text-muted-foreground dark:text-gray-400">Zip Code:</div>
            <div className="font-medium dark:text-gray-200">{data.zip}</div>
          </div>
        </div>

        {/* Account Information Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary dark:text-primary" />
            <h3 className="text-lg font-semibold dark:text-white">Account Information</h3>
          </div>
          <Separator className="dark:bg-gray-700" />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground dark:text-gray-400">Username:</div>
            <div className="font-medium dark:text-gray-200">{data.username}</div>

            <div className="text-muted-foreground dark:text-gray-400">Password:</div>
            <div className="font-medium dark:text-gray-200">••••••••</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 md:gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Previous
        </Button>
        <Button
          onClick={onSubmit}
          className="gap-2 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
        >
          <Check className="h-4 w-4" />
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
