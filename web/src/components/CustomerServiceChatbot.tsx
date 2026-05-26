"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, RotateCcw } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const FAQ_DATA = [
  {
    question: "What services do you offer?",
    answer:
      "We provide professional dental and aesthetic treatments including dental cleaning, tooth extraction, braces consultation, teeth whitening, dermal fillers, Botox, laser treatments, and skin rejuvenation procedures.",
  },
  {
    question: "Do you accept walk-in patients?",
    answer:
      "We recommend booking an appointment in advance to ensure availability. However, we may accommodate walk-ins depending on the schedule.",
  },
  {
    question: "What are your clinic hours?",
    answer:
      "Our clinic is open Monday to Saturday from 9:00 AM to 7:00 PM.",
  },
  {
    question: "Is consultation required before treatment?",
    answer:
      "Yes, a consultation is required for most dental and aesthetic procedures to assess your condition and recommend the best treatment plan.",
  },
  {
    question: "Are treatments safe?",
    answer:
      "All procedures are performed by licensed professionals using clinically approved equipment and materials to ensure safety and effectiveness.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book directly through our website by selecting your desired service, date, and time. Our system will confirm your appointment instantly.",
  },
]

export default function CustomerServiceChatbot() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isChatEnded, setIsChatEnded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0 && !isChatEnded) {
      setTimeout(() => {
        addBotMessage(
          "Welcome to our Dental & Aesthetic Clinic. How may we assist you today?"
        )
      }, 400)
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollAreaRef.current) {
      const el = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      )
      if (el) {
        el.scrollTop = el.scrollHeight
      }
    }
  }, [messages, isTyping])

  const addBotMessage = (text: string) => {
    const id = Date.now().toString()

    const newMsg: Message = {
      id,
      text: "",
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMsg])

    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id
              ? { ...m, text: text.substring(0, i + 1) }
              : m
          )
        )
        i++
      } else {
        clearInterval(interval)
      }
    }, 25)
  }

  const handleFAQClick = (q: string, a: string) => {
    if (isChatEnded) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: q,
        sender: "user",
        timestamp: new Date(),
      },
    ])

    setIsTyping(true)

    setTimeout(() => {
      addBotMessage(a)
      setIsTyping(false)
    }, 900)
  }

  const handleEndChat = () => {
    setIsTyping(true)

    setTimeout(() => {
      addBotMessage(
        "Thank you for contacting our clinic. If you need further assistance, you may start a new conversation anytime."
      )
      setIsTyping(false)
      setIsChatEnded(true)
    }, 1200)
  }

  const handleNewChat = () => {
    setMessages([])
    setIsChatEnded(false)

    setTimeout(() => {
      addBotMessage(
        "Welcome back. How can we assist you with your dental or aesthetic concerns today?"
      )
    }, 300)
  }

  if (pathname.startsWith("/admin")) return null

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[420px] h-[80vh] md:h-[600px] z-50 flex flex-col bg-white border border-slate-200 shadow-2xl rounded-t-2xl md:rounded-2xl overflow-hidden p-0">

          {/* HEADER */}
          <CardHeader className="bg-blue-600 text-white flex flex-row justify-between items-center p-4">
            <div>
              <CardTitle className="text-base font-semibold">
                Clinic Support
              </CardTitle>
              <p className="text-xs text-blue-100">
                Dental & Aesthetic Assistance
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          {/* MESSAGES */}
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-slate-50">

            <div className="flex-1 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="h-full px-4 py-3">

                <div className="space-y-3">

                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                          m.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-800 border border-slate-200"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-1 px-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150" />
                    </div>
                  )}

                </div>
              </ScrollArea>
            </div>

            {/* QUICK FAQ */}
            {!isChatEnded && (
              <div className="border-t bg-white p-3">
                <p className="text-[11px] text-slate-500 mb-2 uppercase">
                  Quick Help
                </p>

                <div className="flex flex-wrap gap-2">
                  {FAQ_DATA.map((f, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        handleFAQClick(f.question, f.answer)
                      }
                      className="text-[11px] px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {f.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FOOTER */}
            <div className="border-t p-3 bg-white">
              {!isChatEnded ? (
                <Button
                  onClick={handleEndChat}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                >
                  End Conversation
                </Button>
              ) : (
                <Button
                  onClick={handleNewChat}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start New Chat
                </Button>
              )}
            </div>

          </CardContent>
        </Card>
      )}
    </>
  )
}