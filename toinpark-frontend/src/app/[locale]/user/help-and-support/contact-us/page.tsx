import GradientText from "@/components/feature/text/gradientText";
import { getSeoMeta } from "@/lib/getSeoMeta";
import ContactList from "./ContactList";

export const metadata = getSeoMeta({ title: "Contact Us" });

function ContactUs() {
  return (
    <div className="space-y-6 md:space-y-10 px-6 xl:px-16 md:px-10 mt-12">
      {/* Wallet history */}
      <div className="space-y-4 text-start">
        <GradientText
          type="secondary"
          label="Contact Us"
          className="text-[28px] md:text-4xl lg:text-5xl font-medium"
        />
        <p className="text-default-200 text-lg font-normal  mx-auto">
          Reach out to us for help or inquiries anytime.
        </p>
      </div>
      <ContactList />
    </div>
  );
}

export default ContactUs;
