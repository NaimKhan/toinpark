import SelectInput from "@/components/SelectInput";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/PasswordInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

function page() {
  return (
    <div className="container py-20 space-y-6">
      <section className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-semibold">Input Field</h3>
        <div className="w-full max-w-md space-y-2">
          <Input
            placeholder="Enter your email address"
            error="Please enter a valid email address"
            label="Email Address"
          />
          <Input
            placeholder="Enter your email address"
            label="Email Address"
            id="emailAddress"
            leftContent={<User className="text-muted-foreground size-4" />}
          />
          <Input
            placeholder="Enter your email address"
            leftContent={<User className="text-muted-foreground size-4" />}
            rightContent={<User className="text-muted-foreground size-4" />}
            error="Please enter a valid email address"
            label="Email Address"
            required
            id="email-address"
          />
          <PasswordInput label="Password" />
          <Textarea placeholder="Enter Message" label="Message" />
          <SelectInput
            className="h-11 w-[440px] "
            placeholder="Select gender"
            options={genderOptions}
          />
        </div>
      </section>

      {/* Select Section */}
      <section className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-xl font-semibold">Select Dropdown</h3>

        <Select>
          <SelectTrigger className="w-[440px] ">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
    </div>
  );
}

export default page;
