import CheckIconRounded from "@/components/svg/CheckIconRounded";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Challenge {
  id: number;
  name: string;
  avatarUrl: string;
  isCompleted: boolean;
  buttonText: string;
  reward?: number;
}

interface ChallangeItemProps {
  challenge: Challenge;
}

const ChallangeItem: React.FC<ChallangeItemProps> = ({ challenge }) => {
  return (
    <div
      className="flex justify-between items-center px-6 py-4 rounded-lg border"
    >
      <div className="flex items-center gap-3">
        <Image
          src={challenge.avatarUrl}
          alt={challenge.name}
          width={40}
          height={40}
          className="object-contain rounded-none"
        />
        <span className="text-default-100">{challenge.name}</span>
      </div>
      {challenge.isCompleted ? (
        <div className="flex items-center gap-4">
          <Button
            disabled
            className="bg-border-secondary text-default-100 flex items-center gap-2"
          >
            <CheckIconRounded className="rounded-full" /> Completed
          </Button>
          <div className="flex items-center gap-1">
            <Image
              src="/images/all/koin.png"
              alt="Price"
              width={40}
              height={40}
              className="object-contain rounded-none"
            />
            <p className="text-primary text-sm font-medium">+ 10</p>
          </div>
        </div>
      ) : (
        <Button size="sm" className="text-default-900">
          {challenge.buttonText}
        </Button>
      )}
    </div>
  );
}

export default ChallangeItem;
