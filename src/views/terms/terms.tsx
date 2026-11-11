
import Link from "next/link";

const sections = [
  {
    title: "1. About These Terms",
    paragraphs: [
      `1.1 These Terms and Conditions (“Terms”) govern your use of soibifashion.com (the “Site”) and every purchase you make from The Soibi Fashion (“SOIBI,” “we,” “us,” or “our”), including items from the ÉRÉME collection and our other collections.`,
      `1.2 When you place an Order, you will be asked to tick a box confirming that you have read and agree to these Terms. If you do not agree, please do not place an Order. Our Privacy & Cookie Policy is a separate document that explains how we handle your personal data; by using the Site, you acknowledge that you have been given access to it. Agreeing to these Terms does not give us your consent to send you marketing or to place non-essential cookies on your device. Those are separate choices that are yours to make.`,
      `1.3 Who we are: Soibi Fashion is a business registered in Nigeria (CAC Registration No. 6921543), with its registered address at Road 14, Flat 8A, Federal Housing Estate, Agip, Port Harcourt, Rivers State. Contact: thesoibifashion@gmail.com / 0905 075 8912 (WhatsApp).`,
      `1.4 You must be at least 18 years old to place an Order or create an account.`,
      `1.5 Contracts under these Terms are concluded electronically. We keep a record of the version of these Terms that you accepted with each Order.`,
    ],
  },
  {
    title: "2. Definitions",
    definitions: [
      ["Business Day:", "a day other than a Saturday, a Sunday or a public holiday in Nigeria."],
      ["Courier:", "DHL or another delivery service named in your Delivery Quote."],
      ["Customer / you:", "a person who places an Order. A Visitor is a person who uses the Site without placing an Order."],
      ["Delivery Costs:", "the shipping charges for delivering your Order, which are separate from the Product price unless stated otherwise."],
      ["Delivery Quote:", "our written quotation of the Courier, the Delivery Costs and the estimated transit time for your Order."],
      ["Order:", "your request to purchase Products, made through the Site or another channel we agree with you."],
      ["Order Confirmation:", "our written confirmation, by email or WhatsApp, that we have accepted your Order."],
      ["Production Start Date:", "the date on which production of your Order begins, determined under clause 5.2."],
      ["Production Time:", "the period we need to make, finish, or prepare your Product before it is ready to ship, being 21 days from the Production Start Date."],
      ["Products:", "garments, accessories, and other items offered on the Site. Every Product is made to order, to the measurements you provide."],
    ],
  },
  {
    title: "3. How Ordering Works",
    paragraphs: [
      `3.1 Delivery is arranged individually with each customer, so our process differs from a standard “pay and ship” checkout. In summary:`,
    ],
    steps: [
      ["(a) Order and payment:", "you select items, confirm size and specifications, and pay in full in Nigerian Naira (NGN) or, if you are an international customer, in US Dollars (USD), by card through Paystack or, if you are in Nigeria, by bank transfer."],
      ["(b) Order Confirmation:", "We confirm that we have accepted your Order by email or WhatsApp."],
      ["(c) Delivery Quote:", "We send you a Delivery Quote, and you accept it and pay the Delivery Costs (clause 5)."],
      ["(d) Production:", "your item is produced and finished, which takes 21 days from the Production Start Date."],
      ["(e) Dispatch:", "once your item is ready, we dispatch it and send you tracking information."],
      ["(f) Delivery:", "the Courier delivers to the agreed address. Transit time depends on the Courier and destination."],
    ],
    extra: [
      `3.2 Your Order is an offer to buy the Products. We accept it only when we send an Order Confirmation. A payment receipt or automated acknowledgement is not an Order Confirmation. We will send an Order Confirmation, or tell you that we have declined your Order, within 48 hours of receiving your payment. If we do neither within that time, you may cancel, and we will refund everything you paid within 14 Business Days.`,
      `3.3 We may decline or cancel an Order, for example, for pricing errors, stock or material unavailability, or suspected fraud. If we do so after payment, we will refund the full amount paid within 14 Business Days to the account or card from which the payment was made.`,
      `3.4 Orders placed through WhatsApp or another agreed channel are subject to these Terms.`,
      `3.5 Please check your size, colour, and specification details before paying. Contact us immediately if anything needs correcting. Changes may not be possible once production has begun.`,
    ],
  },
  {
    title: "4. Prices and Payment",
    paragraphs: [
      `4.1 Currencies. Customers in Nigeria are shown prices in NGN and may always pay in NGN. International customers may pay in NGN or USD. We do not refuse payment in Naira.`,
      `4.2 Conversion. Where a price is converted between currencies, the exchange rate applied is displayed at checkout before you pay. Your bank or payment provider may add its own charges, for which we are not responsible.`,
      `4.3 Payment. Full payment for the Products is required at the time of ordering. We do not accept part-payments or deposits. You may pay (a) online through Paystack, our payment processor, which processes your payment and holds your card details so that we do not; or (b) if you are in Nigeria, by bank transfer to the account details shown on the Site. Please use your order number as the payment reference and send us proof of payment if we ask for it. An Order is treated as paid only when Paystack confirms the payment or the funds reach our account. Pay only into the account details shown on the Site or confirmed by us in writing from the contact details in clause 20, because we are not responsible for payments made to any other account. Payment by any other method is available only if we agree to it with you in writing and is subject to these Terms. Our Privacy & Cookie Policy explains how payment data is handled.`,
      `4.4 Taxes. The prices shown on the Site include any VAT that we are required to charge. For deliveries outside Nigeria, prices exclude any import duties, customs clearance fees, VAT, or other taxes charged by the destination country. These are your responsibility and are payable to the Courier or customs authority on or before delivery. We have no control over these charges and cannot estimate them. If you refuse to pay them, we may return or abandon the parcel, and clause 5.8 applies.`,
    ],
  },
  {
    title: "5. Delivery",
    paragraphs: [
      `5.1 Delivery Quote. Within 2 Business Days after the Order Confirmation, we will send you a Delivery Quote. We will ask you to confirm your delivery address and contact details. Delivery Costs depend on the Courier, the destination, and the weight and size of the parcel, and you pay them. Where the Delivery Costs were shown and paid at checkout, no separate Delivery Quote is needed.`,
      `5.2 Accepting the Delivery Quote. A Delivery Quote is valid for 7 days. The Production Start Date is the date we receive your acceptance of the Delivery Quote and payment of the Delivery Costs. If you paid the Delivery Costs at checkout, the Production Start Date is the date of the Order Confirmation. If you decline the Delivery Quote, or do not accept it within 7 days, we will cancel the Order and refund everything you paid, less any non-recoverable payment processing fees, within 14 Business Days.`,
      `5.3 Deliveries within Nigeria. Deliveries within Nigeria are made by the Courier or local delivery service named in your Delivery Quote. No customs charges apply.`,
      `5.4 Production and delivery times. The Production Time is 21 days from the Production Start Date. Delivery time is separate. It begins at dispatch, and the number of days depends on the Courier and your destination. The total time to receive your Order is therefore the Production Time plus the Courier’s delivery time. All dates are estimates, not guarantees. Hand-finished, culturally rooted pieces involve skilled craftsmanship, and timelines may shift due to materials, artisan availability, or peak periods. We will keep you informed of material delays. If we have not dispatched your Order within 30 days after the end of the Production Time (extended only by an event described in clause 15), you may cancel the Order by written notice, and we will refund everything you paid, including any Delivery Costs, within 14 Business Days.`,
      `5.5 Delivery details not confirmed. If you do not confirm your delivery details or pay the Delivery Costs within 30 days after we notify you that your Order is ready to ship, we may cancel the Order by written notice. We will refund the amount you paid within 14 Business Days, less any Delivery Costs and storage costs we have incurred and our reasonable costs of production.`,
      `5.6 Courier, ownership and risk. We arrange the Courier for you, as your agent. Ownership of the Products and the risk of loss or damage pass to you when the Courier collects the parcel from us. From that moment, delivery is a matter between you and the Courier, which is responsible for the parcel. We will give you tracking details and, if a parcel is lost or damaged in transit, our dispatch records and reasonable help with your claim against the Courier. We do not arrange transit insurance, but you may arrange your own cover. If you ask us to use a courier that you nominate, the same applies.`,
      `5.7 Inspecting your delivery. Please inspect your parcel on delivery. Tell us about any visible damage or defect within 7 days of delivery. If a parcel arrives damaged, note it on the Courier’s delivery record and tell the Courier and us within 48 hours, because a claim for damage in transit lies against the Courier (clause 5.6). Clause 7.3 explains the remedies available for faulty Products.`,
      `5.8 Incorrect details or failed delivery. You are responsible for giving accurate delivery details. If a parcel is returned or cannot be delivered because the details were wrong or incomplete, or because the recipient was unavailable or refused it, we will contact you to arrange re-delivery at your cost. If the parcel is not re-delivered within 60 days, we are not obliged to refund the Product price, because the Product has been made to your measurements and dispatched as agreed. This clause does not apply where the failed delivery results from our error.`,
    ],
  },
  {
    title: "6. Made-to-Order Products and Measurements",
    paragraphs: [
      `6.1 Every Product is made to order after you have placed your Order and paid. We do not keep stock. Each Product is made specifically for you to the measurements you provide, so it cannot be resold.`,
      `6.2 You may choose a size from our size charts or enter your own specific measurements in the measurements box on the Site. Either way, the Product is made to the size or measurements you give us. Size charts are a guide and do not fit everyone, which is why the measurements box is available. You are responsible for the accuracy of the size or measurements you choose or provide. We are happy to confirm details with you before production begins.`,
      `6.3 Because every Product is made to your measurements, once the Production Start Date has passed, an Order cannot be cancelled, and we do not accept returns, exchanges or refunds for change of mind or for size or fit issues arising from the size or measurements you chose or provided. This does not affect clauses 5.4, 7.3 and 15, or your rights if a Product is faulty or not as described.`,
    ],
  },
  {
    title: "7. Cancellations, Faulty Items and Refunds",
    paragraphs: [
      `7.1 Cancellation by you. You may cancel an Order at any time before the Production Start Date by contacting us, and we will refund everything you paid, less any non-recoverable payment processing fees. After the Production Start Date, you may cancel only as clauses 5.4, 7.3 and 15 allow.`,
      `7.2 Cancellation by us. We may cancel an Order only as clauses 3.2, 3.3, 5.2 and 5.5 allow, and we will refund you as those clauses state.`,
      `7.3 Faulty, damaged, or incorrect items. If your Product is faulty, or not made as described or to the specifications confirmed in your Order Confirmation, contact us within 7 days of delivery with your order number and clear photographs. If a fault appears only later, during normal wear, contact us within a reasonable time after you discover it. We will respond within 5 Business Days. After verification, we will, at your choice where possible, repair, replace, or refund the item. Where the fault is ours, we will cover reasonable return shipping costs. Damage caused in transit after the Courier has collected the parcel is a matter between you and the Courier (clause 5.6).`,
      `7.4 Refund method and timing. We make approved refunds to the original payment method or, for a bank transfer, to the account the payment came from, in the original currency paid where possible, within 14 Business Days of approval. Delivery Costs already paid to the Courier are not refundable once the Order has been dispatched, unless the error was ours or the Order is cancelled under clause 5.4 or 15.`,
      `7.5 Your statutory rights. Nothing in these Terms limits your rights under the Federal Competition and Consumer Protection Act 2018 or other mandatory consumer protection laws that apply to you, including rights that cannot be waived by contract.`,
    ],
  },
  {
    title: "8. Product Descriptions, Images and Colour Accuracy",
    paragraphs: [
      `8.1 We take care to present our Products accurately. However, screen settings differ, and handcrafted textiles, dyes, and embellishments can vary slightly between items. Minor variation is part of the character of handmade work and is not a defect.`,
      `8.2 Some images of models on the Site, mostly those showing accessories, may be AI-generated or AI-assisted. In such an image the model, setting or styling may be digitally created or altered, but the Product shown is not altered. The Product you receive will match the written description and the specifications confirmed in your Order Confirmation.`,
    ],
  },
  {
    title: "9. Intellectual Property",
    paragraphs: [
      `9.1 All content on the Site, including designs, patterns, collection names (including SOIBI and ÉRÉME), logos, photographs, videos, AI-generated or AI-assisted images and visuals, text, and graphics, is owned by or licensed to The Soibi Fashion, and is protected by Nigerian and international intellectual property laws to the extent those laws apply to it.`,
      `9.2 You may not copy, reproduce, adapt, or use our designs, imagery, or branding for commercial purposes without our prior written consent.`,
      `9.3 Buying a Product gives you ownership of the physical item only, not any intellectual property rights in the design.`,
      `9.4 You may share images of your purchase on social media for personal, non-commercial purposes, and we welcome you tagging us. If you tag us or use our hashtags, you give us a non-exclusive, royalty-free licence to repost the image with credit to you. You may ask us to remove it at any time.`,
    ],
  },
  {
    title: "10. Use of the Site",
    paragraphs: [
      `10.1 You agree not to: use the Site unlawfully or fraudulently; attempt to gain unauthorised access to the Site or its systems; introduce malware or disrupt the Site; use automated tools to scrape content; or submit false information or use another person’s payment details without authorisation. We may suspend or restrict access if we reasonably believe these Terms have been breached.`,
      `10.2 We aim to keep the Site available, but we do not promise uninterrupted access. The Site may contain links to third-party websites, which we do not control and for which we are not responsible.`,
    ],
  },
  {
    title: "11. Accounts",
    paragraphs: [
      `11.1 Where you create an account, you are responsible for keeping your login details confidential and for all activity under your account. Please tell us immediately if you suspect unauthorised use.`,
      `11.2 We may suspend or close an account if you breach these Terms. You may ask us to close your account at any time. Closing an account does not affect Orders already placed.`,
    ],
  },
  {
    title: "12. Promotions and Discount Codes",
    paragraphs: [
      `12.1 Each promotion and discount code is subject to the conditions published with it. Unless stated otherwise, a code may be used once per Order, cannot be combined with another offer, and has no cash value. We may withdraw a promotion at any time, but not for an Order already confirmed.`,
    ],
  },
  {
    title: "13. Privacy and Cookies",
    paragraphs: [
      `13.1 We process your personal data as described in our separate Privacy & Cookie Policy, which is designed to comply with the Nigeria Data Protection Act 2023.`,
      `13.2 Your choices about marketing and non-essential cookies are separate from these Terms, and you can change them at any time.`,
    ],
  },
  {
    title: "14. Limitation of Liability",
    paragraphs: [
      `14.1 To the fullest extent permitted by law, SOIBI is not liable for indirect or consequential loss or loss of profit, or for loss arising from events outside our reasonable control, including loss or delay by the Courier after collection, customs holds, import charges, strikes, extreme weather, or regulatory restrictions.`,
      `14.2 Subject to clause 14.3, our total liability to you for any claim arising from an Order will not exceed the amount you paid for that Order.`,
      `14.3 Nothing in these Terms excludes or limits: liability for fraud; liability for death or personal injury caused by negligence; your right to a repair, replacement or refund for Products that are faulty or not as described, or any other right under mandatory consumer protection law; or any liability that cannot lawfully be excluded.`,
    ],
  },
  {
    title: "15. Force Majeure",
    paragraphs: [
      `15.1 We are not responsible for delay or failure to perform caused by events beyond our reasonable control, including natural disasters, pandemics, war, civil unrest, government action, strikes, transport or carrier network disruption, or prolonged utility or internet failure that we could not reasonably have avoided by using back-up arrangements.`,
      `15.2 We will use reasonable efforts to limit the effect of the event, inform you promptly, and fulfil your Order as soon as reasonably possible.`,
      `15.3 If the delay lasts more than 30 days, you may cancel, and we will refund everything you paid for undelivered Products, including any Delivery Costs, within 14 Business Days.`,
    ],
  },
  {
    title: "16. International Customers",
    paragraphs: [
      `16.1 You are responsible for ensuring that the Products may lawfully be imported into your country.`,
      `16.2 Customers in the EU or UK, or in other jurisdictions with mandatory consumer protection laws, keep the rights those laws give them. Where statutory withdrawal rights apply, they do not extend to Products made to your measurements, to the extent that law allows.`,
    ],
  },
  {
    title: "17. Complaints and Disputes",
    paragraphs: [
      `17.1 Please get in touch with us first at thesoibifashion@gmail.com. We will acknowledge your complaint within 2 Business Days and aim to resolve it within 14 days.`,
      `17.2 If the complaint is not resolved, either of us may propose mediation at the Rivers State Multi-Door Courthouse or another agreed centre. Mediation is voluntary for consumers.`,
      `17.3 Nothing in these Terms limits your right to complain to the Federal Competition and Consumer Protection Commission, to approach the Competition and Consumer Protection Tribunal, or to bring a claim in court.`,
      `17.4 Subject to clause 17.3, these Terms are governed by the laws of the Federal Republic of Nigeria, and the courts of Rivers State have jurisdiction, except where mandatory law gives you the right to bring proceedings in your country of residence.`,
    ],
  },
  {
    title: "18. Changes to These Terms",
    paragraphs: [
      `18.1 We may update these Terms from time to time. The version in force when you place your Order applies to that Order. We will post changes on this page with a new “Last updated” date.`,
    ],
  },
  {
    title: "19. General",
    paragraphs: [
      `19.1 Entire agreement: these Terms, together with your Order Confirmation and Delivery Quote, form the whole agreement between you and SOIBI. The Privacy & Cookie Policy is a separate notice and does not form part of that agreement.`,
      `19.2 Severability: If any provision is held unenforceable, the rest remain in effect.`,
      `19.3 No waiver: our failure to enforce a right does not waive it.`,
      `19.4 Assignment: you may not transfer your rights under these Terms without our consent.`,
      `19.5 Notices: we may give you notice by email or WhatsApp at the contact details you gave us, and you may give us notice at the contact details in clause 20.`,
    ],
  },
];

function FormattedParagraph({ children }: { children: string }) {
  const colonIndex = children.indexOf(":");

  if (colonIndex > 0 && colonIndex < 100) {
    return (
      <p className="text-xl leading-9 text-black">
        <strong>{children.slice(0, colonIndex + 1)}</strong>
        {children.slice(colonIndex + 1)}
      </p>
    );
  }

  return <p className="text-xl leading-9 text-black">{children}</p>;
}

const  TermsAndConditionsPage = () => {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <header className="mb-16 border-b border-[#A56423]/20 pb-10">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#A56423]">
            The Soibi Fashion
          </p>

          <h1 className="text-4xl font-bold leading-tight text-[#A56423] md:text-5xl">
            Terms and Conditions of Sale & Use
          </h1>

          <p className="mt-5 text-xl leading-9 text-black">
            Covering purchases from the ÉRÉME collection and all other
            collections on this site.
          </p>

          <p className="mt-4 text-xl text-black">
            <strong>Last updated:</strong> 3rd November 2026
            <span className="mx-2">•</span>
            <strong>Version:</strong> 1.0
          </p>
        </header>

        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.title} className="space-y-5">
              <h2 className="text-2xl font-bold leading-tight text-[#A56423] md:text-3xl">
                {section.title}
              </h2>

              {section.paragraphs?.map((paragraph, index) => (
                <FormattedParagraph key={index}>
                  {paragraph}
                </FormattedParagraph>
              ))}

              {section.definitions && (
                <div className="space-y-4">
                  {section.definitions.map(([term, definition]) => (
                    <p key={term} className="text-xl leading-9 text-black">
                      <strong>{term}</strong> {definition}
                    </p>
                  ))}
                </div>
              )}

              {section.steps && (
                <div className="space-y-4 pl-4 md:pl-8">
                  {section.steps.map(([label, description]) => (
                    <p key={label} className="text-xl leading-9 text-black">
                      <strong>{label}</strong> {description}
                    </p>
                  ))}
                </div>
              )}

              {section.extra?.map((paragraph, index) => (
                <FormattedParagraph key={index}>
                  {paragraph}
                </FormattedParagraph>
              ))}
            </section>
          ))}

          <section className="space-y-5">
            <h2 className="text-2xl font-bold leading-tight text-[#A56423] md:text-3xl">
              20. Contact Us
            </h2>

            <div className="space-y-3 text-xl leading-9 text-black">
              <p>
                <strong>The Soibi Fashion</strong>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:thesoibifashion@gmail.com"
                  className="underline underline-offset-4"
                >
                  thesoibifashion@gmail.com
                </a>
              </p>
              <p>
                <strong>WhatsApp / Phone:</strong>{" "}
                <a href="tel:09050758912" className="underline underline-offset-4">
                  0905 075 8912
                </a>
              </p>
              <p>
                <strong>Address:</strong> Road 14, Flat 8A, Federal Housing
                Estate, Agip, Port Harcourt, Rivers State.
              </p>
            </div>
          </section>

          <div className="border-t border-[#A56423]/20 pt-8">
            <p className="text-xl leading-9 text-black">
              Please also read our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-[#A56423] underline underline-offset-4"
              >
                Privacy & Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
export default TermsAndConditionsPage