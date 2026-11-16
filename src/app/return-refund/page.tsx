
const ReturnsRefundsPage = () => {
    return (
      <main className="min-h-screen bg-[#F8F6F2] text-[#171717]">
        {/* Hero */}
        <section className="border-b border-[#E5E0D8]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#A56423]">
              Customer Care / Policies
            </p>
  
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.1] tracking-tight md:text-7xl">
              Returns & Refunds
            </h1>
  
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-sm leading-7 text-[#68645E] md:text-base">
                Everything you need to know about cancellations, returns and
                refunds at THE SOIBI FASHION.
              </p>
  
              <span className="text-xs uppercase tracking-widest text-[#858078]">
                Last updated: 16 November 2026
              </span>
            </div>
          </div>
        </section>
  
        {/* Introduction */}
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_2fr] md:px-12 md:py-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A56423]">
              Our approach
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              Made with intention.
            </h2>
          </div>
  
          <div className="max-w-2xl space-y-5 text-sm leading-8 text-[#5F5B55] md:text-base">
            <p>
              At THE SOIBI FASHION, our clothing is made to order with care and
              attention to your selected size and specifications. Because each
              piece is prepared specifically for an order, our returns and
              refund policy differs from that of ready-to-wear retail.
            </p>
  
            <p>
              We want you to be happy with your purchase, and we will work with
              you to resolve issues where an item is faulty or does not match
              its description.
            </p>
          </div>
        </section>
  
        {/* Policy Content */}
        <section className="border-t border-[#E5E0D8]">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            {/* Section 1 */}
            <article className="grid gap-6 border-b border-[#E5E0D8] py-14 md:grid-cols-[1fr_2fr] md:gap-12 md:py-20">
              <div>
                <span className="text-xs tracking-[0.2em] text-[#A56423]">
                  01
                </span>
                <h2 className="mt-3 font-serif text-3xl">
                  Returns & Exchanges
                </h2>
              </div>
  
              <div className="max-w-2xl space-y-6 text-sm leading-8 text-[#5F5B55] md:text-base">
                <h3 className="font-semibold text-[#171717]">
                  Made-to-order items
                </h3>
  
                <p>
                  All our clothing is made to order. Once production has
                  started, we cannot accept returns, exchanges or cancellations
                  for:
                </p>
  
                <ul className="list-disc space-y-3 pl-5 marker:text-[#A56423]">
                  <li>Change of mind.</li>
                  <li>
                    Incorrect measurements or sizing information supplied by
                    the customer.
                  </li>
                  <li>
                    Fit preferences where the item has been made according to
                    the measurements or specifications provided.
                  </li>
                </ul>
  
                <p>
                  We encourage customers to carefully review their measurements,
                  selected sizes and order details before confirming an order.
                </p>
  
                <div className="border-l-2 border-[#A56423] bg-[#EFEAE2] p-5">
                  <p className="font-semibold text-[#171717]">
                    Please note
                  </p>
                  <p className="mt-2 text-sm leading-7">
                    This policy does not affect your rights regarding products
                    that are faulty, damaged or not as described.
                  </p>
                </div>
              </div>
            </article>
  
            {/* Section 2 */}
            <article className="grid gap-6 border-b border-[#E5E0D8] py-14 md:grid-cols-[1fr_2fr] md:gap-12 md:py-20">
              <div>
                <span className="text-xs tracking-[0.2em] text-[#A56423]">
                  02
                </span>
                <h2 className="mt-3 font-serif text-3xl">
                  Faulty or Incorrect Items
                </h2>
              </div>
  
              <div className="max-w-2xl space-y-6 text-sm leading-8 text-[#5F5B55] md:text-base">
                <p>
                  If your order arrives faulty, damaged or materially different
                  from what you ordered, please contact us.
                </p>
  
                <div>
                  <h3 className="mb-4 font-semibold text-[#171717]">
                    How to report an issue
                  </h3>
  
                  <ol className="space-y-4">
                    {[
                      "Contact us within 7 days of receiving your order.",
                      "Provide your order number and a description of the issue.",
                      "Include clear photographs showing the fault or damage, where applicable.",
                    ].map((item, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D8D0C5] text-xs text-[#A56423]">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
  
                <p>
                  For damage that appears to have occurred during delivery,
                  please make a note with the courier and notify us within
                  <strong className="text-[#171717]"> 48 hours of delivery.</strong>
                </p>
  
                <p>
                  If you discover a fault later, please contact us within a
                  reasonable time after discovering it.
                </p>
  
                <p>
                  We will review your complaint and respond within
                  <strong className="text-[#171717]"> 5 business days.</strong>
                  Where the issue is confirmed to be our responsibility, we may
                  offer a repair, replacement or refund, as appropriate.
                </p>
  
                <p>
                  We will also cover reasonable return shipping costs for
                  confirmed faulty or incorrectly described items.
                </p>
              </div>
            </article>
  
            {/* Section 3 */}
            <article className="grid gap-6 border-b border-[#E5E0D8] py-14 md:grid-cols-[1fr_2fr] md:gap-12 md:py-20">
              <div>
                <span className="text-xs tracking-[0.2em] text-[#A56423]">
                  03
                </span>
                <h2 className="mt-3 font-serif text-3xl">
                  Cancellations & Refunds
                </h2>
              </div>
  
              <div className="max-w-2xl space-y-8 text-sm leading-8 text-[#5F5B55] md:text-base">
                <div>
                  <h3 className="mb-2 font-semibold text-[#171717]">
                    Before Production Begins
                  </h3>
                  <p>
                    Customers may request to cancel an order before production
                    starts. Approved cancellations will be refunded, less any
                    non-recoverable payment processing fees.
                  </p>
                </div>
  
                <div>
                  <h3 className="mb-2 font-semibold text-[#171717]">
                    After Production Begins
                  </h3>
                  <p>
                    Once production has started, orders cannot be cancelled or
                    refunded simply because of a change of mind or fit preference.
                  </p>
                  <p className="mt-3">
                    This does not affect refunds for confirmed faulty or
                    incorrectly described items or any applicable statutory
                    consumer rights.
                  </p>
                </div>
  
                <div>
                  <h3 className="mb-2 font-semibold text-[#171717]">
                    Refund Processing
                  </h3>
                  <p>
                    Approved refunds will be returned to the original payment
                    method or account, in the original currency where possible,
                    within
                    <strong className="text-[#171717]"> 14 business days of approval.</strong>
                  </p>
                </div>
  
                <div>
                  <h3 className="mb-2 font-semibold text-[#171717]">
                    Delivery Charges
                  </h3>
                  <p>
                    Delivery charges are generally non-refundable once an order
                    has been dispatched, except where the issue is our
                    responsibility or a refund is due under our Terms & Conditions.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
  
        {/* Contact */}
        <section className="bg-[#171717] text-[#F8F6F2]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:px-12 md:py-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A27A]">
                We're here to help
              </p>
              <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight md:text-5xl">
                Need a little assistance?
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#C2BEB6]">
                For questions or assistance regarding returns, refunds or
                order issues, get in touch with our team. Kindly include your
                order number so we can assist you faster.
              </p>
            </div>
  
            <div className="space-y-6 border-t border-[#44413B] pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#A9A39A]">
                  Email
                </p>
                <a
                  href="mailto:thesoibifashion@gmail.com"
                  className="mt-2 inline-block text-base transition-colors hover:text-[#C9A27A]"
                >
                  thesoibifashion@gmail.com
                </a>
              </div>
  
              <div>
                <p className="text-xs uppercase tracking-widest text-[#A9A39A]">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/2349050758912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-base transition-colors hover:text-[#C9A27A]"
                >
                  0905 075 8912
                </a>
              </div>
  
              <div>
                <p className="text-xs uppercase tracking-widest text-[#A9A39A]">
                  Location
                </p>
                <p className="mt-2 text-sm text-[#C2BEB6]">
                  Port Harcourt, Rivers State, Nigeria.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Legal Note */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-serif text-2xl">A final note</h3>
            <p className="mt-4 text-sm leading-7 text-[#68645E]">
              This policy should be read alongside our full Terms & Conditions.
              Nothing in this policy limits any consumer rights that cannot
              legally be excluded.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default ReturnsRefundsPage;
  