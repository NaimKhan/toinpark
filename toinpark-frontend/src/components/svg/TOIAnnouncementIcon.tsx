function TOIAnnouncementIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1575_1834)">
        <mask
          id="mask0_1575_1834"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <path d="M24 0H0V24H24V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_1575_1834)">
          <path
            d="M21.9697 18V19C21.9697 20.65 21.9697 22 18.9697 22H4.96973C1.96973 22 1.96973 20.65 1.96973 19V18C1.96973 17.45 2.41973 17 2.96973 17H20.9697C21.5197 17 21.9697 17.45 21.9697 18Z"
            fill="currentColor"
          />
          <path
            opacity="0.4"
            d="M20.7195 13V17H3.26953V13C3.26953 9.16 5.97953 5.95 9.58953 5.18C10.1295 5.06 10.6895 5 11.2695 5H12.7195C13.2995 5 13.8695 5.06 14.4095 5.18C18.0195 5.96 20.7195 9.16 20.7195 13Z"
            fill="currentColor"
          />
          <path
            d="M14.5 4.5C14.5 4.74 14.47 4.96 14.41 5.18C13.87 5.06 13.3 5 12.72 5H11.27C10.69 5 10.13 5.06 9.59 5.18C9.53 4.96 9.5 4.74 9.5 4.5C9.5 3.12 10.62 2 12 2C13.38 2 14.5 3.12 14.5 4.5Z"
            fill="currentColor"
          />
          <path
            d="M15 11.75H9C8.59 11.75 8.25 11.41 8.25 11C8.25 10.59 8.59 10.25 9 10.25H15C15.41 10.25 15.75 10.59 15.75 11C15.75 11.41 15.41 11.75 15 11.75Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1575_1834">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default TOIAnnouncementIcon;
