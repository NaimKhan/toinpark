function UserEditIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1022_1114)">
        <mask
          id="mask0_1022_1114"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="40"
          height="40"
        >
          <path d="M40 0H0V40H40V0Z" fill="currentColor" />
        </mask>
        <g mask="url(#mask0_1022_1114)">
          <path
            d="M19.9993 20C24.6017 20 28.3327 16.269 28.3327 11.6667C28.3327 7.06431 24.6017 3.33334 19.9993 3.33334C15.397 3.33334 11.666 7.06431 11.666 11.6667C11.666 16.269 15.397 20 19.9993 20Z"
            fill="currentColor"
          />
          <path
            opacity="0.4"
            d="M19.9997 24.1667C11.6497 24.1667 4.84961 29.7667 4.84961 36.6667C4.84961 37.1334 5.21628 37.5 5.68294 37.5H34.3163C34.783 37.5 35.1497 37.1334 35.1497 36.6667C35.1497 29.7667 28.3497 24.1667 19.9997 24.1667Z"
            fill="currentColor"
          />
          <path
            d="M35.7161 24.5672C34.2161 23.0672 33.0327 23.5505 32.0161 24.5672L26.1161 30.4673C25.8827 30.7007 25.6661 31.1338 25.6161 31.4505L25.2994 33.7005C25.1827 34.5172 25.7494 35.0838 26.5661 34.9672L28.8161 34.6505C29.1327 34.6005 29.5827 34.3838 29.7994 34.1505L35.6994 28.2505C36.7327 27.2505 37.2161 26.0672 35.7161 24.5672Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1022_1114">
          <rect width="40" height="40" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default UserEditIcon;
