export type TParams = Promise<{ locale: string }>;

export type TLayoutProps = {
  children: React.ReactNode;
  params: TParams;
};