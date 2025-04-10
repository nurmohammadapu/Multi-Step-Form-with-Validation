"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, CircleDot, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Step1 from './form/components/Step1';
import Step2 from './form/components/Step2';
import Step3 from './form/components/Step3';
import Summary from './form/components/Summary';

// Directly define the form data type here
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

const steps = [
  { title: "Personal", description: "Your basic information" },
  { title: "Address", description: "Your location details" },
  { title: "Account", description: "Create your account" },
  { title: "Review", description: "Verify your information" },
]

export default function MultiStepFormPage() {
  const [step, setStep] = useState(1)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Ensure theme component only renders client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Holds combined form data across steps
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  // Handle next step
  const handleNext = (data: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep((prev) => prev + 1)
    // Scroll to top when changing steps
    window.scrollTo(0, 0)
  }

  // Handle previous step
  const handleBack = () => {
    setStep((prev) => prev - 1)
    // Scroll to top when changing steps
    window.scrollTo(0, 0)
  }

  // Final submission
  const handleSubmit = () => {
    console.log("Submitted Data:", formData)
    alert("Form submitted! Check console.")
  }

  return (
    <div className="container max-w-4xl mx-auto py-6 md:py-10 px-4">
      {/* Theme Toggle Button */}
      {mounted && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      )}

      <Card className="border-none shadow-lg dark:bg-gray-800/50 dark:shadow-gray-900/30">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center dark:text-white">
            Multi-Step Registration
          </CardTitle>

          {/* Progress Indicator */}
          <div className="mt-6 md:mt-8 mb-2">
            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${
                      i + 1 === step
                        ? "border-primary bg-primary text-primary-foreground"
                        : i + 1 < step
                          ? "border-primary bg-primary/10 text-primary dark:bg-primary/20"
                          : "border-muted-foreground/30 text-muted-foreground dark:border-gray-500"
                    }`}
                  >
                    {i + 1 < step ? (
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                      <CircleDot className="h-5 w-5 md:h-6 md:w-6" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-xs md:text-sm font-medium ${
                        i + 1 === step ? "text-primary" : "text-muted-foreground dark:text-gray-400"
                      }`}
                    >
                      {s.title}
                    </p>
                    <p className="text-xs text-muted-foreground hidden md:block dark:text-gray-500">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="relative mt-4 mb-6 md:mb-8">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted-foreground/30 dark:bg-gray-600 -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-primary dark:bg-primary -translate-y-1/2 transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {step === 1 && <Step1 onNext={handleNext} defaultValues={formData} />}
          {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
          {step === 3 && <Step3 onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
          {step === 4 && <Summary data={formData} onBack={handleBack} onSubmit={handleSubmit} />}
        </CardContent>
      </Card>
    </div>
  )
}
