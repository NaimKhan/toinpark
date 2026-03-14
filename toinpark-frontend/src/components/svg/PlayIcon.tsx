function PlayIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1021_929)">
        <mask
          id="mask0_1021_929"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="40"
          height="40"
        >
          <path d="M40 0H0V40H40V0Z" fill="currentColor" />
        </mask>
        <g mask="url(#mask0_1021_929)">
          <path
            opacity="0.4"
            d="M19.9499 36.6667C29.1547 36.6667 36.6165 29.2047 36.6165 20C36.6165 10.7953 29.1547 3.33334 19.9499 3.33334C10.7451 3.33334 3.2832 10.7953 3.2832 20C3.2832 29.2047 10.7451 36.6667 19.9499 36.6667Z"
            fill="currentColor"
          />
          <path
            d="M24.9497 17.0502L20.1163 14.2669C18.9163 13.5669 17.4663 13.5669 16.2663 14.2669C15.0663 14.9669 14.3496 16.2002 14.3496 17.6002V23.1835C14.3496 24.5668 15.0663 25.8168 16.2663 26.5168C16.8663 26.8668 17.533 27.0335 18.183 27.0335C18.8497 27.0335 19.4997 26.8668 20.0997 26.5168L24.933 23.7335C26.133 23.0335 26.8497 21.8002 26.8497 20.4002C26.883 19.0002 26.1663 17.7502 24.9497 17.0502Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1021_929">
          <rect width="40" height="40" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PlayIcon;
