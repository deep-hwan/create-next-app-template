/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ToastProps {
  theme?: "light" | "dark";
  status?: "success" | "failed";
  id: string;
  title: string;
  description?: string;
  countdown?: number;
}

interface ToastContextType {
  addToast: (
    props: Omit<ToastProps, "id" | "countdown"> & { countdown?: number }
  ) => void;
  toasts: ToastProps[];
}

const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  toasts: [],
});

export const useJenga = () => useContext(ToastContext);

export function JengaProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    if (toasts.length === 0) return;

    const interval = setInterval(() => {
      setToasts((currentToasts) =>
        currentToasts
          .map((toast) => ({
            ...toast,
            countdown:
              (toast.countdown ?? 0) > 0 ? (toast.countdown ?? 0) - 1 : 0,
          }))
          .filter((toast) => (toast.countdown ?? 0) > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [toasts.length]);

  const addToast = ({
    theme,
    status,
    title,
    description,
    countdown = 3,
  }: Omit<ToastProps, "id">) => {
    const newToast = {
      id: Math.random().toString(36).substr(2, 9),
      theme,
      status,
      title,
      description,
      countdown,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
      {toasts.length > 0 && (
        <div
          css={{
            position: "fixed",
            zIndex: 200000,
            left: 0,
            right: 0,
            top: 0,
            transition: "0.3s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              zIndex: 2000,
              padding: "30px 16px",
              width: "auto",
            }}
          >
            {toasts.map((toast) => (
              <div key={toast.id}>
                <ToastSnackBar
                  status={toast.status}
                  id={toast.id}
                  title={toast.title}
                  description={toast.description}
                  theme={toast.theme}
                  closeTime={toast.countdown}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

//
// toast
function ToastSnackBar({
  theme = "light",
  status = "success",
  id,
  title,
  description,
  closeTime,
}: {
  theme?: "light" | "dark";
  status?: "success" | "failed" | null | undefined;
  id: string;
  title: string;
  description?: string;
  closeTime?: number;
}) {
  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

  const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `;

  const THEME_VARIANT = {
    light: { bg: "#fff", title: "#555", sub: "#888" },
    dark: { bg: "#222", title: "#e2e2e2", sub: "#999" },
  };

  return (
    <div
      key={id}
      css={{
        width: "100%",
        position: "sticky",
        zIndex: 100000000,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        backgroundColor: THEME_VARIANT[theme].bg,
        paddingLeft: "14px",
        paddingRight: "14px",
        paddingBottom: "3px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.12)",
        marginTop: "8px",
        animation: `${fadeIn} 0.5s, ${fadeOut} 0.5s 4.5s`,
        transition: "0.3s ease-in-out",
        borderRadius: 16,
      }}
    >
      <div
        css={{
          width: "100%",
          display: "flex",
          alignItems: "start",
          padding: "10px 0 12px",
          gap: 10,
          borderRadius: 14,
        }}
      >
        {status === "success" && (
          <svg
            css={{ marginTop: 3 }}
            width="16"
            height="16"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C8.82441 0 6.69767 0.645139 4.88873 1.85383C3.07979 3.06253 1.66989 4.78049 0.83733 6.79048C0.00476617 8.80047 -0.213071 11.0122 0.211367 13.146C0.635804 15.2798 1.68345 17.2398 3.22183 18.7782C4.76021 20.3166 6.72022 21.3642 8.85401 21.7886C10.9878 22.2131 13.1995 21.9952 15.2095 21.1627C17.2195 20.3301 18.9375 18.9202 20.1462 17.1113C21.3549 15.3023 22 13.1756 22 11C22 8.08262 20.8411 5.28473 18.7782 3.22183C16.7153 1.15893 13.9174 0 11 0ZM15.72 9.124L10.283 14.563C10.1105 14.7352 9.87674 14.8319 9.63301 14.8319C9.38927 14.8319 9.15549 14.7352 8.983 14.563L6.263 11.844C6.14107 11.7155 6.05889 11.5544 6.02636 11.3803C5.99383 11.2061 6.01233 11.0263 6.07964 10.8624C6.14695 10.6985 6.26019 10.5576 6.40574 10.4565C6.55128 10.3555 6.72293 10.2987 6.9 10.293C7.02079 10.2874 7.14145 10.3064 7.2546 10.3491C7.36774 10.3917 7.47099 10.457 7.558 10.541L9.631 12.614L14.42 7.825C14.5951 7.65775 14.8279 7.56443 15.07 7.56443C15.3121 7.56443 15.5449 7.65775 15.72 7.825C15.8054 7.91034 15.8731 8.01167 15.9193 8.1232C15.9656 8.23473 15.9893 8.35428 15.9893 8.475C15.9893 8.59573 15.9656 8.71527 15.9193 8.8268C15.8731 8.93833 15.8054 9.03966 15.72 9.125"
              fill="#3ECC39"
            />
          </svg>
        )}

        {status === "failed" && (
          <svg
            css={{ marginTop: 3 }}
            width="16"
            height="16"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.999 22C8.8234 22 6.69667 21.3549 4.88773 20.1462C3.07878 18.9375 1.66889 17.2195 0.836323 15.2095C0.00375909 13.1995 -0.214078 10.9878 0.21036 8.85401C0.634797 6.72022 1.68245 4.76021 3.22082 3.22183C4.7592 1.68345 6.71921 0.635804 8.853 0.211367C10.9868 -0.213071 13.1985 0.00476617 15.2085 0.83733C17.2185 1.66989 18.9365 3.07979 20.1452 4.88873C21.3539 6.69767 21.999 8.82441 21.999 11C21.999 13.9174 20.8401 16.7153 18.7772 18.7782C16.7143 20.8411 13.9164 22 10.999 22ZM12.129 6.631C12.129 6.283 11.622 5.93101 10.999 5.93101C10.347 5.93101 9.884 6.279 9.884 6.631V12.149C9.884 12.554 10.347 12.83 10.999 12.83C11.622 12.83 12.129 12.555 12.129 12.149V6.631ZM10.999 14.165C10.7043 14.15 10.4154 14.2506 10.1937 14.4454C9.97199 14.6402 9.83506 14.9138 9.812 15.208C9.83604 15.5006 9.97379 15.7721 10.1957 15.9643C10.4176 16.1564 10.706 16.254 10.999 16.236C11.29 16.2515 11.5755 16.1527 11.7946 15.9606C12.0138 15.7686 12.1492 15.4985 12.172 15.208C12.1499 14.916 12.0153 14.6439 11.7964 14.4493C11.5775 14.2547 11.2916 14.1528 10.999 14.165Z"
              fill="#F04D4D"
            />
          </svg>
        )}

        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 3,
          }}
        >
          <p
            css={{
              fontSize: 14,
              fontWeight: "bold",
              whiteSpace: "pre-line",
              color: THEME_VARIANT[theme].title,
            }}
          >
            {title}
          </p>
          {description && (
            <p
              css={{
                fontSize: 13,
                color: THEME_VARIANT[theme].sub,
                whiteSpace: "pre-line",
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "100%",
          minHeight: 4,
          maxHeight: 4,
        }}
      >
        <div
          css={{
            width: `calc(100%/${closeTime ?? 3})`,
            height: 4,
            backgroundColor: status === "success" ? "#3ECC39" : "#ef6565",
            transition: "0.3s ease-in-out",
            borderRadius: "14px",
          }}
        />
      </div>
    </div>
  );
}
