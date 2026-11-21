import Container from "@/components/shared/Container";

const ReturnsRefundsPage = () => {
  return (
    <Container className="min-h-screen bg-[#F8F6F2] text-[#171717]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E5E0D8]">
        <div className=" pb-16 pt-16  md:pb-24 md:pt-30">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div className="max-w-4xl">
              <p className="mb-8 text-xs font-medium uppercase tracking-[0.25em] text-[#765996]">
                Customer Care / Policies
              </p>

              <h1 className="font-serif text-6xl leading-[0.98] tracking-tight md:text-8xl">
                Returns
                <span className="block text-[#765996]">& Refunds</span>
              </h1>

              <p className="mt-8 max-w-xl text-sm leading-8 text-[#68645E] md:text-base">
                Everything you need to know about cancellations, returns and refunds at THE SOIBI FASHION.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 border-t border-[#D8D0C5] pt-5 md:border-t-0 md:border-l md:pl-8 md:pt-0">
              <span className="h-2 w-2 rounded-full bg-[#765996]" />
              <p className="text-xs uppercase tracking-[0.16em] text-[#858078]">
                Last updated: 16 November 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto grid py-4  gap-10  md:grid-cols-[0.8fr_1.2fr] ">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#765996]">
            Our approach
          </p>

          <h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight md:text-5xl">
            Made with intention.
          </h2>
        </div>

        <div className="max-w-2xl space-y-6 text-sm leading-8 text-[#5F5B55] md:text-base">
          <p>
            Every product is made to order. Production begins upon receipt of
            your order and payment. We do not hold ready-made stock. Each piece
            is crafted specifically for you, using the measurements you
            provide, and therefore cannot be resold.
          </p>

          <p>
            We take care to present our Products accurately. However, screen
            settings differ, and handcrafted textiles, dyes, and embellishments
            can vary slightly between items. Minor variation is part of the
            character of handmade work and is not a defect.
          </p>
        </div>
      </section>

      {/* Policy sections */}
      <section className="border-t border-[#E5E0D8]">
        <div className="">

          {/* Section 01 */}
          <article className="grid gap-10 border-b border-[#E5E0D8] py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-24">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="font-serif text-5xl text-[#765996]">01</p>
              <h2 className="mt-5 max-w-xs font-serif text-3xl leading-tight md:text-4xl">
                Returns & Exchanges
              </h2>
            </div>

            <div className="max-w-2xl space-y-10 text-sm leading-8 text-[#5F5B55] md:text-base">
              <div>
                <h3 className="mb-4 font-semibold text-[#171717]">
                  Made-to-order Products
                </h3>

                <p>
                  You can choose a size from our size chart or provide your own
                  measurements. Your Product will be made to the size or
                  measurements you provide. You are responsible for ensuring
                  that the measurements you provide are accurate. We are happy
                  to confirm your measurements with you before production.
                </p>
              </div>

              <div className="border-l-2 border-[#765996] bg-[#EFEAE2] p-6 md:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#765996]">
                  Important
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#171717]">
                  When does production start?
                </h3>

                <div className="mt-5 space-y-4">
                  <p>
                    A Delivery Quote is valid for 7 days.
                  </p>

                  <p>
                    The Production Start Date is the date we receive your
                    acceptance of the Delivery Quote and payment of the
                    Delivery Costs. If you paid the Delivery Costs at checkout,
                    the Production Start Date is the date of the Order
                    Confirmation.
                  </p>

                  <p>
                    If you decline the Delivery Quote, or do not accept it
                    within 7 days, we will cancel the Order and refund
                    everything you paid, less any non-recoverable payment
                    processing fees, within 14 Business Days.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-[#171717]">
                  Returns, exchanges and cancellations after production starts
                </h3>

                <p>
                  Because every Product is made to your measurements, once the
                  Production Start Date has passed, an Order cannot be
                  cancelled, and we do not accept returns, exchanges or refunds
                  for change of mind or for size or fit issues arising from
                  the size or measurements you chose or provided.
                </p>

                <p className="mt-4">
                  This does not affect clauses 5.4, 7.3 and 15, or your rights
                  if a Product is faulty or not as described.
                </p>
              </div>
            </div>
          </article>

          {/* Section 02 */}
          <article className="grid gap-10 border-b border-[#E5E0D8] py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-24">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="font-serif text-5xl text-[#765996]">02</p>
              <h2 className="mt-5 max-w-xs font-serif text-3xl leading-tight md:text-4xl">
                Faulty or Incorrect Products
              </h2>
            </div>

            <div className="max-w-2xl space-y-8 text-sm leading-8 text-[#5F5B55] md:text-base">
              <div>
                <p>
                  If your Product is faulty, or not made as described or to
                  the specifications confirmed in your Order Confirmation,
                  contact us within 7 days of delivery with your order number
                  and clear photographs.
                </p>

                <p className="mt-5">
                  If a fault appears only later, during normal wear, contact
                  us within a reasonable time after you discover it.
                </p>
              </div>

              <div className="border-y border-[#E5E0D8] py-7">
                <p>
                  We will respond within 5 Business Days. After verification,
                  we will, at your choice where possible, repair, replace, or
                  refund the item. Where the fault is ours, we will cover
                  reasonable return shipping costs.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-[#171717]">
                  Damage during delivery
                </h3>

                <p>
                  If a parcel arrives damaged, note it on the Courier’s
                  delivery record and tell the Courier and us within 48 hours,
                  because a claim for damage in transit lies against the
                  Courier (clause 5.6).
                </p>

                <p className="mt-4">
                  Damage caused in transit after the Courier has collected the
                  parcel is a matter between you and the Courier (clause 5.6).
                </p>
              </div>
            </div>
          </article>

          {/* Section 03 */}
          <article className="grid gap-10 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-24">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="font-serif text-5xl text-[#765996]">03</p>
              <h2 className="mt-5 max-w-xs font-serif text-3xl leading-tight md:text-4xl">
                Cancellations & Refunds
              </h2>
            </div>

            <div className="max-w-2xl space-y-10 text-sm leading-8 text-[#5F5B55] md:text-base">
              <div>
                <h3 className="mb-4 font-semibold text-[#171717]">
                  Before the Production Start Date
                </h3>

                <p>
                  You may cancel an Order at any time before the Production
                  Start Date by contacting us, and we will refund everything
                  you paid, less any non-recoverable payment processing fees.
                </p>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-[#171717]">
                  Delays in dispatch
                </h3>

                <p>
                  The Production Time is 21 days from the Production Start
                  Date. Delivery time is separate. It begins at dispatch, and
                  the number of days depends on the Courier and your destination.
                </p>

                <p className="mt-4">
                  All dates are estimates, not guarantees. Hand-finished,
                  culturally rooted pieces involve skilled craftsmanship, and
                  timelines may shift due to materials, artisan availability,
                  or peak periods. We will keep you informed of material delays.
                </p>

                <p className="mt-4">
                  If we have not dispatched your Order within 30 days after the
                  end of the Production Time (extended only by an event
                  described in clause 15), you may cancel the Order by written
                  notice, and we will refund everything you paid, including any
                  Delivery Costs, within 14 Business Days.
                </p>

                <p className="mt-4">
                  If the delay lasts more than 30 days, you may cancel, and we
                  will refund everything you paid for undelivered Products,
                  including any Delivery Costs, within 14 Business Days.
                </p>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-[#171717]">
                  Other cancellation circumstances
                </h3>

                <p>
                  If you do not confirm your delivery details or pay the
                  Delivery Costs within 7 days, we may cancel the Order by
                  written notice. We will refund the amount you paid within
                  14 Business Days.
                </p>

                <p className="mt-4">
                  We may decline or cancel an Order, for example, for pricing
                  errors, stock or material unavailability, or suspected fraud.
                  If we do so after payment, we will refund the full amount
                  paid within 14 Business Days to the account or card from
                  which the payment was made.
                </p>

                <p className="mt-4">
                  We will send you an Order Confirmation, or tell you that we
                  have declined your Order, within 48 hours of receiving your
                  payment. If we do neither within that time, you may cancel,
                  and we will refund everything you paid within 14 Business
                  Days.
                </p>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-[#171717]">
                  How refunds are processed
                </h3>

                <p>
                  We make approved refunds to the original payment method or,
                  for a bank transfer, to the account the payment came from,
                  in the original currency paid where possible, within 14
                  Business Days of approval.
                </p>

                <p className="mt-4">
                  Delivery Costs already paid to the Courier are not
                  refundable once the Order has been dispatched, unless the
                  error was ours or the Order is cancelled under clause 5.4
                  or 15.
                </p>
              </div>

              <div className="border-t border-[#E5E0D8] pt-7">
                <p className="text-sm leading-8 text-[#171717]">
                  Nothing in these Terms limits your rights under the Federal
                  Competition and Consumer Protection Act 2018 or other
                  mandatory consumer protection laws that apply to you,
                  including rights that cannot be waived by contract.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Get in Touch */}
      {/* <section className="border-t border-[#E5E0D8]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-12 md:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#765996]">
              Get in Touch
            </p>

            <h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight md:text-5xl">
              We're here to help.
            </h2>
          </div>

          <div className="max-w-2xl space-y-7 text-sm leading-8 text-[#5F5B55] md:text-base">
            <p>
              If you have a question about your Order or need to report an
              issue, contact us:
            </p>

            <div>
              <p className="font-semibold text-[#171717]">Email:</p>
              <a
                href="mailto:thesoibifashion@gmail.com"
                className="transition-colors hover:text-[#765996]"
              >
                thesoibifashion@gmail.com
              </a>
            </div>

            <div>
              <p className="font-semibold text-[#171717]">
                WhatsApp / Phone:
              </p>
              <a
                href="https://wa.me/2349050758912"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#765996]"
              >
                0905 075 8912
              </a>
            </div>

            <div>
              <p className="font-semibold text-[#171717]">Location:</p>
              <p>Port Harcourt, Rivers State, Nigeria.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Legal note */}
      {/* <section className="mx-auto max-w-7xl border-t border-[#E5E0D8] px-6 py-12 md:px-12 md:py-16">
        <p className="text-center text-sm leading-8 text-[#68645E]">
          This policy should be read alongside our full Terms & Conditions.
        </p>
      </section> */}
    </Container>
  );
};

export default ReturnsRefundsPage;