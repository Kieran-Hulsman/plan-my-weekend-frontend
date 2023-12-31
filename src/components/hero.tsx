// where the api is called from and itinerary state var is updated
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import ScrollReveal from 'scrollreveal'

import { NewsletterForm } from './newsletter-form'
import { DisplayBox } from './display-box'

const BACKEND_SERVER = "https://plan-my-weekend.onrender.com";

type ScrollRevealRefElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLDivElement

export function Hero({
  content,
  illustration,
  title,
}: {
  content: string
  illustration?: ReactNode
  title: string
}) {
  const scrollRevealRef = useRef<ScrollRevealRefElement[]>([])

  useEffect(() => {
    if (scrollRevealRef.current.length > 0) {
      scrollRevealRef.current.map((ref, index) =>
        ScrollReveal().reveal(scrollRevealRef.current[index], {
          duration: 1000,
          distance: '40px',
          easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
          origin: 'top',
          interval: 150,
        })
      )
    }

    return () => ScrollReveal().destroy()
  }, [])

    const [itinerary, setItinerary] = useState("");

    async function onCitySubmit(city: string) {
        setItinerary("loading... (give it a sec, sometimes it takes a while)");
        
        fetch(`${BACKEND_SERVER}/api/call?city=${city}`)
        .then((response) => response.json())
        .then((result) => {
            console.log(result.result);
            setItinerary(result.result);
        })
  }

  return (
    <section className="text-center lg:w-full lg:py-20 lg:text-left">
      <div className="hero mx-auto w-full max-w-6xl px-6">
        <div className="hero-inner relative lg:flex">
          <div
            className="hero-copy bg-white pt-10 pb-16 lg:pt-16 lg:pr-20"
            style={{ minWidth: '600px' }}
          >
            <div className="mx-auto w-full max-w-3xl">
              <h1
                ref={(el: ScrollRevealRefElement) =>
                  scrollRevealRef.current.push(el)
                }
                className="mt-0 mb-4 text-4xl font-bold md:text-5xl "
              >
                {title}
              </h1>
              <p
                ref={(el: ScrollRevealRefElement) =>
                  scrollRevealRef.current.push(el)
                }
                className="prose prose-xl px-16 text-gray-500 md:px-0"
              >
                {content}
              </p>
            </div>

            <div
              ref={(el: ScrollRevealRefElement) =>
                scrollRevealRef.current.push(el)
              }
            >
              <NewsletterForm
                className="m-0 mt-8 max-w-md md:flex"
                submitText="plan!"
                onSubmit={onCitySubmit}
              />
            </div>
          </div>
          <div className="relative -ml-6 -mr-6 py-10 lg:p-0">
            <DisplayBox itinerary={itinerary} />
            </div>
        </div>
      </div>
    </section>
  )
}
