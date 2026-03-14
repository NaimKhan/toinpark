function ChevronBottomIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M33.1998 14.9173L22.3332 25.7839C21.0498 27.0673 18.9498 27.0673 17.6665 25.7839L6.7998 14.9173"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ChevronBottomIcon;
