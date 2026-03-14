function PlaceholderImageIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1022_1168)">
        <mask
          id="mask0_1022_1168"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="40"
          height="40"
        >
          <path d="M40 0H0V40H40V0Z" fill="currentColor" />
        </mask>
        <g mask="url(#mask0_1022_1168)">
          <path
            d="M14.9997 36.6667H24.9997C33.333 36.6667 36.6663 33.3333 36.6663 25V15C36.6663 6.66668 33.333 3.33334 24.9997 3.33334H14.9997C6.66634 3.33334 3.33301 6.66668 3.33301 15V25C3.33301 33.3333 6.66634 36.6667 14.9997 36.6667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.9993 16.6667C16.8403 16.6667 18.3327 15.1743 18.3327 13.3333C18.3327 11.4924 16.8403 10 14.9993 10C13.1584 10 11.666 11.4924 11.666 13.3333C11.666 15.1743 13.1584 16.6667 14.9993 16.6667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.4502 31.5827L12.6669 26.066C13.9835 25.1827 15.8835 25.2827 17.0668 26.2993L17.6168 26.7827C18.9168 27.8993 21.0168 27.8993 22.3168 26.7827L29.2501 20.8327C30.5501 19.716 32.6501 19.716 33.9501 20.8327L36.6668 23.166"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1022_1168">
          <rect width="40" height="40" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PlaceholderImageIcon;
