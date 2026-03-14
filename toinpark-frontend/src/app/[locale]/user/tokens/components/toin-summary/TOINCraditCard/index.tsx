import GradientText from "@/components/feature/text/gradientText";

interface TOINCreditCardProps {
  label: string;
  amount: string | number;
}

function TOINCreditCard({ label, amount }: TOINCreditCardProps) {
  return (
    <div className="border-b px-6 pb-6 md:pb-10 xl:px-16 md:px-10">
      <div className="flex items-center text-default-100 text-xl font-medium">
        <div className="w-3 h-3 flex-shrink-0 rounded-full bg-primary ring-4 ring-primary/20 mr-2 animate-pulse-ring" />
        <GradientText
          type="secondary"
          label={label}
          className="text-[16px] md:text-xl font-medium"
        />
      </div>
      <div className="text-default-200 text-[32px] md:text-5xl mt-2 md:mt-4 font-medium">{amount}</div>
    </div>
  );
}

export default TOINCreditCard;
