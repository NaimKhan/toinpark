function TrashIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1022_1184)">
        <mask
          id="mask0_1022_1184"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="40"
          height="40"
        >
          <path d="M40 0H0V40H40V0Z" fill="currentColor" />
        </mask>
        <g mask="url(#mask0_1022_1184)">
          <path
            d="M35 9.96746C29.45 9.41746 23.8667 9.13412 18.3 9.13412C15 9.13412 11.7 9.30079 8.4 9.63412L5 9.96746"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.167 8.28334L14.5337 6.10001C14.8003 4.51668 15.0003 3.33334 17.817 3.33334H22.1837C25.0003 3.33334 25.217 4.58334 25.467 6.11668L25.8337 8.28334"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31.4163 15.2344L30.333 32.0177C30.1496 34.6343 29.9996 36.6677 25.3496 36.6677H14.6497C9.99967 36.6677 9.84967 34.6343 9.66634 32.0177L8.58301 15.2344"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.2168 27.5H22.7668"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.833 20.8333H24.1663"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1022_1184">
          <rect width="40" height="40" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default TrashIcon;
