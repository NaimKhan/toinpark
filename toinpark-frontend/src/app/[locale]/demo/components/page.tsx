import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function ComponentsShowcase() {
  return (
    <div className="container mx-auto py-20 flex flex-col gap-12">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        UI Components Showcase
      </h2>

      {/* Button Group Section */}
      <section className="flex flex-col items-center gap-6">
        <h3 className="text-xl font-semibold">Button Group</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg">Default</Button>
          <Button color="white" size="lg">
            White
          </Button>
          <Button>Default</Button>
          <Button color="white">White</Button>
          <Button size="sm">Small</Button>
          <Button color="white" size="sm">
            Small White
          </Button>
        </div>

      </section>

      
      {/* Table Section */}
      <section className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-semibold">Select Dropdown</h3>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow >
                <TableCell className="font-medium">01</TableCell>
                <TableCell>LJ1234561620602417</TableCell>
                <TableCell>1000</TableCell>
                <TableCell className="text-right">
                  <Button>Withdraw</Button>
                </TableCell>
              </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </div>
  );
}

export default ComponentsShowcase;
