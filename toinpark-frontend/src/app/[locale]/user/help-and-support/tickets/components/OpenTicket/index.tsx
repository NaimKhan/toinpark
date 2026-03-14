import GradientText from "@/components/feature/text/gradientText";
import OpenTicketForm from "./OpenTicketForm";

function OpenTicketContent() {
  return (
    <div className="my-6 md:my-10 px-6 xl:px-16 md:px-10 space-y-6 md:space-y-12">
      <div className="space-y-6 md:space-y-10">
        {/* Staking Packages */}
        <div className="space-y-4  text-start">
          <GradientText
            type="secondary"
            label="Open A Ticket"
            className="text-[28px] md:text-4xl lg:text-5xl font-medium"
          />
          <p className="text-default-200 text-lg font-normal  mx-auto">
            Submit a support request to get help from our team quickly and easily.
          </p>
        </div>

        {/* Form Content */}
        <OpenTicketForm />
      </div>
    </div>
  );
}

export default OpenTicketContent;
