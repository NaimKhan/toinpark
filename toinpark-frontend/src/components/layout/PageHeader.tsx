import GradientText from "../feature/text/gradientText";

type PageHeaderProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

const PageHeader = ({ title, action, children }: PageHeaderProps) => {
  return (
    <div className="px-6 py-8 xl:px-16 md:px-12 md:py-12 overflow-visible bg-card">
      <div className="text-default-100 uppercase w-full flex items-center justify-between text-xl font-semibold mb-6">
        <GradientText label={title} />
        {action}
      </div>

      {children}
    </div>
  );
};

export default PageHeader;
