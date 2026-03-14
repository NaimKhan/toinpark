function CheckboxIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1021_898)">
        <mask
          id="mask0_1021_898"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="40"
          height="40"
        >
          <path d="M40 0H0V40H40V0Z" fill="currentColor" />
        </mask>
        <g mask="url(#mask0_1021_898)">
          <path
            opacity="0.4"
            d="M26.983 3.33334H13.0163C6.94967 3.33334 3.33301 6.95001 3.33301 13.0167V26.9667C3.33301 33.05 6.94967 36.6667 13.0163 36.6667H26.9663C33.033 36.6667 36.6497 33.05 36.6497 26.9833V13.0167C36.6663 6.95001 33.0497 3.33334 26.983 3.33334Z"
            fill="currentColor"
          />
          <path
            d="M17.6324 25.966C17.299 25.966 16.9824 25.8327 16.749 25.5994L12.0324 20.8827C11.5491 20.3994 11.5491 19.5994 12.0324 19.116C12.5158 18.6327 13.3158 18.6327 13.7991 19.116L17.6324 22.9494L26.199 14.3827C26.6824 13.8994 27.4824 13.8994 27.9657 14.3827C28.449 14.866 28.449 15.666 27.9657 16.1494L18.5157 25.5994C18.2824 25.8327 17.9657 25.966 17.6324 25.966Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1021_898">
          <rect width="40" height="40" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CheckboxIcon;
