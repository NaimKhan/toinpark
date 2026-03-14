function SearchIcon({ ...props }: React.ComponentProps<"svg">) {
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
        d="M19.1663 35C27.9108 35 34.9997 27.9112 34.9997 19.1667C34.9997 10.4222 27.9108 3.33334 19.1663 3.33334C10.4218 3.33334 3.33301 10.4222 3.33301 19.1667C3.33301 27.9112 10.4218 35 19.1663 35Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.6663 36.6667L33.333 33.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SearchIcon;
