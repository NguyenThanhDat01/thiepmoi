
import { useEffect, useRef, useState } from "react";
import background from "../assets/backgourg1.png";

function Page2() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Kích hoạt hiệu ứng khi Page2 xuất hiện
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (pageRef.current) {
      observer.observe(pageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={pageRef}
      style={{
        position: "relative",
        width: "100%",
       
        
        margin: "0 auto",
        padding: "20px 16px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Background bay từ dưới lên kết hợp zoom nhẹ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${background})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(70px) scale(0.88)",
          transition:
            "opacity 1.2s ease, transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: "100%",
          minWidth: 0,
          minHeight: "580px",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          boxSizing: "border-box",
          borderRadius: "18px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Tiêu đề */}
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            color: "#a20d36",
            fontFamily: "Georgia, serif",
            fontSize: "clamp(22px, 5vw, 36px)",
            fontWeight: "bold",
            lineHeight: 1.1,
            margin: "0 0 35px",
            textShadow:
              "2px 2px white, -2px -2px white, 2px -2px white, -2px 2px white",
            position: "relative",
            zIndex: 2,

            opacity: visible ? 1 : 0,
            animation: visible
              ? "titleFlyZoom 2s ease forwards, titlePulse 1.5s ease-in-out 2s infinite"
              : "none",
          }}
        >
          For the besties
          <br />
          OF YOUTH

          <style>
            {`
              @keyframes titleFlyZoom {
                0% {
                  opacity: 0;
                  transform: translateY(-100px) scale(0.5);
                }

                70% {
                  opacity: 1;
                  transform: translateY(0) scale(1.2);
                }

                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }

              @keyframes titlePulse {
                0%, 100% {
                  transform: scale(1);
                }

                50% {
                  transform: scale(1.15);
                }
              }
            `}
          </style>
        </h1>

        {/* Nội dung */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            width: "100%",
            minHeight: "420px",
            position: "relative",
            zIndex: 2,
            boxSizing: "border-box",
          }}
        >
          {/* Phần nội dung bên phải */}
          <div style={{ flex: 1, minWidth: 0 }} />
        </div>
      </div>
    </div>
  );
}

export default Page2;
