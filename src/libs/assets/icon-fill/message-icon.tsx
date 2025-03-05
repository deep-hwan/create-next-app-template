export default function MessageIcon({ size = 22, fill = '#555', ...props }: AssetType) {
  return (
    <svg width={size} height={size} viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M17.495 0.494995H6.495C5.03309 0.50029 3.63298 1.08532 2.60187 2.12167C1.57077 3.15803 0.992873 4.56109 0.995001 6.02301V13.923C0.993137 15.3848 1.57113 16.7878 2.60218 17.8241C3.63323 18.8604 5.03317 19.4455 6.495 19.451H18.742L20.313 21.031C20.4583 21.178 20.6313 21.2946 20.822 21.3743C21.0127 21.4539 21.2174 21.4949 21.424 21.495C21.631 21.4943 21.8358 21.4529 22.0267 21.3731C22.2177 21.2933 22.3911 21.1767 22.5369 21.0299C22.6828 20.8831 22.7984 20.7089 22.877 20.5175C22.9556 20.326 22.9957 20.121 22.995 19.914V6.02402C22.9974 4.56192 22.4196 3.15858 21.3885 2.12201C20.3574 1.08544 18.9571 0.500291 17.495 0.494995ZM6.495 11.544C6.18429 11.544 5.88055 11.4519 5.6222 11.2792C5.36385 11.1066 5.16249 10.8613 5.04358 10.5742C4.92468 10.2871 4.89358 9.97128 4.9542 9.66653C5.01482 9.36179 5.16442 9.08186 5.38413 8.86215C5.60384 8.64244 5.88377 8.49281 6.18851 8.43219C6.49326 8.37157 6.80913 8.4027 7.0962 8.52161C7.38326 8.64051 7.62862 8.84187 7.80124 9.10022C7.97387 9.35857 8.06602 9.66231 8.06602 9.97302C8.06654 10.1797 8.02628 10.3845 7.94758 10.5756C7.86887 10.7667 7.75326 10.9404 7.60734 11.0868C7.46142 11.2332 7.28807 11.3494 7.0972 11.4287C6.90633 11.508 6.70169 11.5489 6.495 11.549V11.544ZM11.995 11.544C11.6843 11.544 11.3805 11.4519 11.1222 11.2792C10.8638 11.1066 10.6625 10.8613 10.5436 10.5742C10.4247 10.2871 10.3936 9.97128 10.4542 9.66653C10.5148 9.36179 10.6644 9.08186 10.8841 8.86215C11.1038 8.64244 11.3838 8.49281 11.6885 8.43219C11.9933 8.37157 12.3091 8.4027 12.5962 8.52161C12.8833 8.64051 13.1286 8.84187 13.3012 9.10022C13.4739 9.35857 13.566 9.66231 13.566 9.97302C13.5665 10.1797 13.5263 10.3845 13.4476 10.5756C13.3689 10.7667 13.2533 10.9404 13.1073 11.0868C12.9614 11.2332 12.7881 11.3494 12.5972 11.4287C12.4063 11.508 12.2017 11.5489 11.995 11.549V11.544ZM17.495 11.544C17.1843 11.544 16.8805 11.4519 16.6222 11.2792C16.3638 11.1066 16.1625 10.8613 16.0436 10.5742C15.9247 10.2871 15.8936 9.97128 15.9542 9.66653C16.0148 9.36179 16.1644 9.08186 16.3841 8.86215C16.6038 8.64244 16.8838 8.49281 17.1885 8.43219C17.4933 8.37157 17.8091 8.4027 18.0962 8.52161C18.3833 8.64051 18.6286 8.84187 18.8012 9.10022C18.9739 9.35857 19.066 9.66231 19.066 9.97302C19.0665 10.1797 19.0263 10.3845 18.9476 10.5756C18.8689 10.7667 18.7533 10.9404 18.6073 11.0868C18.4614 11.2332 18.2881 11.3494 18.0972 11.4287C17.9063 11.508 17.7017 11.5489 17.495 11.549V11.544Z'
        fill={fill}
      />
    </svg>
  );
}
