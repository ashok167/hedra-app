// src/pages/Testimonials.tsx

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// import { OpenQuote } from "@/components/OpenQuote";
// import FadeInSection from "@/components/FadeInSection";

export default function Testimonials() {
  const testimonials = [
    {
      text:
        "I like all the chairs specially Gavin is lovely. Very happy with services and coordination is super. Thank you so much for prompt delivery 🙏🌸 Keep it up good work👍",
      author: "Sujata Naik, Homestyling",
    },
    {
      text:
        "Edendek has been a great furniture partner for us since the beginning of our journey at 91Springboard. They have also managed to scale their capacity well in line with our rapid expansion. They have been able to match our product needs and have always delivered on time.",
      author: "Pranay Gupta, Co-Founder, 91Springboard",
    },
    {
      text:
        "For our work furniture requirements, we have many vendors on-board. Edendek is a furniture partner with the best track record of quality and service, and the lowest complaint rate compared to others.",
      author:
        "Anirudh Sundareswar, Director & Head of Sourcing, BNY Mellon",
    },
    {
      text:
        "We really like the quality and finish provided by Edendek in their teak wood and upholstered furniture. I hope they open a showroom in Bangalore soon, for us to take our clients there.",
      author: "Sunitha Kondur, Partner, HundredHands",
    },
    {
      text:
        "Edendek is a great furniture partner for architects and interior designers. It was easy to communicate and discuss designs with them. Their products and service is awesome.",
      author:
        "Shraddhanjali Chowdhury, Architect, Balan and Nambisan Architects",
    },
    {
      text:
        "Edendek team has a good design sense and are able to connect with the designer community quite well. What I like about them is that they also provide customised furniture for our projects, beyond what they have in their catalog.",
      author: "Kruti Parikh, Associate Design Director, FITCH",
    },
  ];

  return (
    <>
      <Header />
<section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-[#14294C]">
                Client Testimonials
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Hear what our clients have to say about their experience
                working with Edendek Furniture.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {testimonials.map((t, idx) => (
                <div key={idx} className="relative">
                  {/* <OpenQuote className="absolute -top-3 -left-3 w-20 sm:w-24 pointer-events-none select-none" /> */}

                  <div className="pl-8 sm:pl-10">
                    <p className="text-gray-900 text-sm md:text-base leading-7 relative z-10">
                      {t.text}
                    </p>

                    <div className="mt-6 flex items-center justify-end gap-4">
                      <div className="h-[2px] w-20 bg-black" />
                      <span className="text-sm text-gray-900">
                        {t.author}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}