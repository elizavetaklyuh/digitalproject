"use client"

import { useState } from "react"
import { ChevronDown, Globe2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { COUNTRY_DIAL_CODES } from "@/lib/country-dial-codes"

type FormData = {
  name: string
  email: string
  countryIso: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const latinNamePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9]+$/
const fieldClassName = "bg-transparent border-border/50 border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:border-accent transition-colors"
const errorClassName = "text-xs leading-relaxed text-destructive"

const initialFormData: FormData = {
  name: "",
  email: "",
  countryIso: "",
  phone: "",
  message: "",
}

const formatDialCode = (dialCode: string) => dialCode.replace(/\s/g, "")

const getFlagEmoji = (iso: string) => {
  if (iso.length !== 2) return iso

  return iso
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("")
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isCountryOpen, setIsCountryOpen] = useState(false)

  const selectedCountry = COUNTRY_DIAL_CODES.find((country) => country.iso === formData.countryIso)

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current

      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const validateForm = () => {
    const nextErrors: FormErrors = {}
    const name = formData.name.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim()
    const message = formData.message.trim()

    if (!name) {
      nextErrors.name = "Name is required."
    } else if (!latinNamePattern.test(name)) {
      nextErrors.name = "Use Latin letters only. Spaces, hyphens, and apostrophes are allowed."
    }

    if (!email) {
      nextErrors.email = "Email is required."
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address."
    }

    if (!selectedCountry) {
      nextErrors.countryIso = "Select a country code."
    }

    if (!phone) {
      nextErrors.phone = "Phone is required."
    } else if (!phonePattern.test(phone) || phone.length < 4) {
      nextErrors.phone = "Enter a valid phone number using digits only."
    }

    if (!message) {
      nextErrors.message = "Message is required."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    // Simulate form submission until a real email/API endpoint is connected.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setFormData(initialFormData)
    setIsSuccessOpen(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium tracking-wider uppercase text-muted-foreground">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value.replace(/[^A-Za-z '-]/g, ""))}
            required
            aria-invalid={Boolean(errors.name)}
            className={fieldClassName}
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && <p className={errorClassName}>{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium tracking-wider uppercase text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
            aria-invalid={Boolean(errors.email)}
            className={fieldClassName}
            placeholder="your@email.com"
            autoComplete="email"
          />
          {errors.email && <p className={errorClassName}>{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium tracking-wider uppercase text-muted-foreground">
            Phone
          </Label>
          <div
            className="flex items-center border-b border-border/50 transition-colors focus-within:border-accent"
            aria-invalid={Boolean(errors.countryIso || errors.phone)}
          >
            <Popover open={isCountryOpen} onOpenChange={setIsCountryOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex h-11 w-20 shrink-0 items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
                  aria-label={selectedCountry ? `Selected country: ${selectedCountry.name}` : "Select country code"}
                  title={selectedCountry ? `${selectedCountry.name} ${formatDialCode(selectedCountry.dialCode)}` : "Select country code"}
                >
                  <Globe2 className="h-5 w-5" aria-hidden="true" />
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[min(28rem,calc(100vw-2rem))] border-border/50 bg-card/95 p-0 text-card-foreground backdrop-blur-md">
                <Command className="bg-transparent">
                  <CommandInput placeholder="Search" className="text-base" />
                  <CommandList className="max-h-72">
                    <CommandEmpty>No country found.</CommandEmpty>
                    {COUNTRY_DIAL_CODES.map((country) => (
                      <CommandItem
                        key={country.iso}
                        value={`${country.name} ${country.iso} ${formatDialCode(country.dialCode)}`}
                        onSelect={() => {
                          updateField("countryIso", country.iso)
                          setIsCountryOpen(false)
                        }}
                        className="gap-4 rounded-none px-4 py-3 text-base data-[selected=true]:bg-accent/20 data-[selected=true]:text-foreground"
                      >
                        <span className="w-7 text-xl leading-none" aria-hidden="true">
                          {getFlagEmoji(country.iso)}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{country.name}</span>
                        <span className="shrink-0 text-muted-foreground">{formatDialCode(country.dialCode)}</span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
              required
              aria-invalid={Boolean(errors.phone)}
              className="h-11 border-0 bg-transparent px-0 py-3 text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
              placeholder="0000000000"
              autoComplete="tel-national"
              inputMode="numeric"
            />
          </div>
          {(errors.countryIso || errors.phone) && (
            <p className={errorClassName}>{errors.countryIso || errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium tracking-wider uppercase text-muted-foreground">
            Message
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            required
            aria-invalid={Boolean(errors.message)}
            rows={4}
            className={`${fieldClassName} resize-none`}
            placeholder="How can we assist you?"
          />
          {errors.message && <p className={errorClassName}>{errors.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium tracking-wider uppercase py-6 transition-all duration-300"
        >
          {isSubmitting ? "Sending..." : "Contact a Manager"}
        </Button>
      </form>

      <AlertDialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <AlertDialogContent className="border-border/40 bg-card text-card-foreground sm:max-w-sm">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="font-serif text-2xl font-light">
              Thank you
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base leading-relaxed text-muted-foreground">
              Thank you, we have received your request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction className="bg-accent px-8 text-accent-foreground hover:bg-accent/90">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
