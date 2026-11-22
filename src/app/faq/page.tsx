
"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import Container from "@/components/shared/Container";

const FAQS = [
  {
    category: "Orders & Payments",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "Browse our collection, select your preferred Product and provide the required size or measurements. Once you have placed your Order and completed payment, we will send an Order Confirmation or contact you if we need to clarify any details.",
      },
      {
        question: "When is my order confirmed?",
        answer:
          "After payment, we will send an Order Confirmation or a Delivery Quote, where applicable, within 48 hours. If you do not receive either within that time, you may cancel your Order and receive a refund.",
      },
      {
        question: "Are delivery costs included in the product price?",
        answer:
          "Delivery Costs are quoted separately unless you have already paid them at checkout. Where a Delivery Quote is required, it remains valid for 7 days.",
      },
    ],
  },
  {
    category: "Sizing & Production",
    questions: [
      {
        question: "Are your pieces ready-made?",
        answer:
          "No. Every Product is made to order after you place your Order and pay. We do not keep stock, and each Product is made specifically for you.",
      },
      {
        question: "How do I choose my size?",
        answer:
          "You can select a size from our size chart or provide your own measurements. Your Product will be made to the size or measurements you provide, so please review them carefully before placing your Order. We are happy to confirm your measurements with you before production.",
      },
      {
        question: "When does production begin?",
        answer:
          "The Production Start Date is the date we receive your acceptance of the Delivery Quote and payment of the Delivery Costs. If you paid the Delivery Costs at checkout, the Production Start Date is the date of your Order Confirmation.",
      },
      {
        question: "How long does production take?",
        answer:
          "Our Production Time is 21 days from the Production Start Date. Delivery time begins separately when your Order is dispatched. These timeframes are estimates and are not guaranteed.",
      },
      {
        question: "Will the material look exactly like the pictures?",
        answer:
          "We take care to present our Products accurately. However, screen settings differ, and handcrafted textiles, dyes and embellishments can vary slightly between items. Minor variations are part of the character of handmade work and are not considered defects.",
      },
    ],
  },
  {
    category: "Delivery",
    questions: [
      {
        question: "How will I know when my order is ready?",
        answer:
          "We will notify you when your Order is ready to ship and arrange delivery through a Courier. You will receive tracking and dispatch details once your parcel has been dispatched.",
      },
      {
        question: "What happens if my order is delayed?",
        answer:
          "Production and delivery dates are estimates. Delays may occur due to materials, artisan availability or peak periods. We will keep you informed of material delays. If your Product is not dispatched within 30 days after the end of the Production Time, you may cancel by written notice and receive a refund as set out in our Terms & Conditions.",
      },
      {
        question: "What should I do if my parcel arrives damaged?",
        answer:
          "Please note any visible parcel damage on the Courier's delivery record and notify both the Courier and SOIBI within 48 hours. This is important because damage during transit after the Courier collects the parcel is a matter between you and the Courier.",
      },
    ],
  },
  {
    category: "Cancellations, Returns & Refunds",
    questions: [
      {
        question: "Can I cancel my order?",
        answer:
          "You may cancel your Order at any time before the Production Start Date by contacting us. We will refund everything you paid, less any non-recoverable payment processing fees.",
      },
      {
        question: "Can I return or exchange an item if it doesn't fit?",
        answer:
          "Because every Product is made to your measurements, once the Production Start Date has passed, we do not accept returns, exchanges or refunds for change of mind or size or fit issues arising from the size or measurements you chose or provided. This does not affect your rights if a Product is faulty or not as described.",
      },
      {
        question: "What if I receive a faulty or incorrect item?",
        answer:
          "Contact us within 7 days of delivery with your order number and clear photographs. If a fault appears later during normal wear, contact us within a reasonable time after discovering it. After verification, we will, at your choice where possible, repair, replace or refund the item.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Approved refunds are made within 14 Business Days to the original payment method or, for a bank transfer, to the account the payment came from. Delivery Costs already paid to the Courier are not refundable once the Order has been dispatched, except where our Terms & Conditions provide otherwise.",
      },
    ],
  },
];

const FAQPage = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <Container className="min-h-screen bg-[#F8F6F2] text-[#171717]">
      {/* Hero */}
      <section className=" pb-16 pt-20  md:pb-24 md:pt-28">
        <div className="">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#7B3C10]">
            Customer Care
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-[720px]">
              <h1 className="font-serif text-5xl leading-[1.08] tracking-tight md:text-7xl">
                Frequently asked
                <br />
                <span className="italic text-[#7B3C10]">questions.</span>
              </h1>
            </div>

            <p className="max-w-[330px] text-sm leading-7 text-[#68645E] md:pb-2">
              A little more information about shopping with SOIBI, from
              choosing your size to receiving your order.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="border-t border-[#DED9D0]  py-16  md:py-24">
        <div className="">
          <div className="grid gap-14 md:grid-cols-[260px_1fr] md:gap-20">
            <aside className="md:sticky md:top-30 md:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7B3C10]">
                Need to know
              </p>
              <p className="mt-4 max-w-[220px] font-serif text-2xl leading-snug">
                Everything you need to shop with confidence.
              </p>
              <p className="mt-5 text-sm leading-6 text-[#77716A]">
                Can't find what you're looking for? Get in touch with our team.
              </p>

              <a
                href="mailto:thesoibifashion@gmail.com"
                className="mt-6 inline-flex items-center gap-2 border-b border-[#7B3C10] pb-1 text-sm font-semibold text-[#7B3C10] transition-colors hover:text-[#171717]"
              >
                Contact us
                <span aria-hidden="true">↗</span>
              </a>
            </aside>

            <div className="space-y-14">
              {FAQS.map((group, groupIndex) => (
                <div key={group.category}>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="text-xs font-semibold tracking-widest text-[#7B3C10]">
                      0{groupIndex + 1}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl">
                      {group.category}
                    </h2>
                  </div>

                  <div className="border-t border-[#DCD6CC]">
                    {group.questions.map((item, questionIndex) => {
                      const questionId = `${groupIndex}-${questionIndex}`;
                      const isOpen = openQuestion === questionId;

                      return (
                        <div
                          key={item.question}
                          className="border-b border-[#DCD6CC]"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenQuestion(isOpen ? null : questionId)
                            }
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between gap-6 py-6 text-left"
                          >
                            <span className="text-sm font-medium leading-6 md:text-base">
                              {item.question}
                            </span>

                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DCD6CC] text-[#7B3C10] transition-colors">
                              {isOpen ? (
                                <Minus size={15} strokeWidth={1.5} />
                              ) : (
                                <Plus size={15} strokeWidth={1.5} />
                              )}
                            </span>
                          </button>

                          <div
                            className={`grid transition-all duration-300 ease-in-out ${
                              isOpen
                                ? "grid-rows-[1fr] pb-6 opacity-100"
                                : "grid-rows-[0fr] pb-0 opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="max-w-[680px] pr-10 text-sm leading-7 text-[black]">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      {/* <section className="bg-[#171717] px-6 py-16 text-[#F8F6F2] md:px-12 md:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
              Still have questions?
            </p>
            <h2 className="mt-4 max-w-[520px] font-serif text-3xl leading-tight md:text-5xl">
              We're just a message away.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-3 text-sm">
            <a
              href="mailto:thesoibifashion@gmail.com"
              className="border-b border-[#C9A227] pb-1 text-[#C9A227] hover:text-white"
            >
              thesoibifashion@gmail.com
            </a>
            <a
              href="https://wa.me/2349050758912"
              target="_blank"
              rel="noreferrer"
              className="border-b border-[#C9A227] pb-1 text-[#C9A227] hover:text-white"
            >
              WhatsApp: 0905 075 8912
            </a>
          </div>
        </div>
      </section> */}
    </Container>
  );
};

export default FAQPage;
