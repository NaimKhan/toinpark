import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ContactUsCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void
}

function ContactUsCard({ imageSrc, title, onClick }: ContactUsCardProps) {
  return (
    <Card className="h-40 bg-transparent border border-border hover:shadow-lg hover:scale-[1.02] transition cursor-pointer" onClick={onClick}>
      <CardContent className="h-full flex flex-col justify-center items-center space-y-3">
        <Image
          src={imageSrc}
          alt={title}
          width={48}
          height={48}
          className="object-cover"
        />
        <h3 className="text-default-100 font-semibold text-lg">{title}</h3>
      </CardContent>
    </Card>
  );
}

export default ContactUsCard;
