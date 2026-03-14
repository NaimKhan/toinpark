"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import GradientText from "@/components/feature/text/gradientText";
import AddPackageForm from "../../add-package/components/AddPackageForm";

export default function AddPackageManagement() {
  return (
    <div className="mb-6">
      <div className="text-default-100 uppercase w-full flex items-center justify-between text-xl font-semibold">
        <GradientText
          label="Package Management"
          className="text-2xl font-semibold whitespace-nowrap"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-4 md:px-6">Add Package</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader className="mb-6">
              <DialogTitle>Add New Package</DialogTitle>
              <DialogDescription>
                Fill in the package details below and click save.
              </DialogDescription>
            </DialogHeader>

            <AddPackageForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
