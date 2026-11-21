
import { useEffect, useRef, useState } from "react";
import totnghiep from "../assets/totnghiep.png";

function Page1() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
        maxWidth: "426px",
        margin: "0 auto",
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Ảnh thiệp gốc */}
      <img
        src={totnghiep}
        alt="Thiệp tốt nghiệp"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          objectFit: "contain",
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(70px) scale(0.88)",
          transition:
            "opacity 1.2s ease, transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Chữ LỄ TỐT NGHIỆP */}
      <div
        style={{
          position: "absolute",
          top: "25.5%",
          left: "-5%",
          width: "92%",
          textAlign: "center",
          fontFamily: "'Times New Roman', serif",
          fontSize: "clamp(25px, 10.5vw, 35px)",
          fontWeight: "bold",
          color: "#861d2d",
          whiteSpace: "nowrap",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease",
          pointerEvents: "none",
        }}
      >
            <span
          style={{
            display: "inline-block",
            animation: visible
              ? "timeZoom 1.5s ease-in-out infinite"
              : "none",
          }}
        >
          LỄ TỐT NGHIỆP
        </span>
        
      </div>

      {/* Giờ tham dự */}
      <div
        style={{
          position: "absolute",
          top: "66.5%",
          left: "35%",
          width: "64%",
          textAlign: "center",
          fontFamily: "'Times New Roman', serif",
          fontSize: "clamp(16px, 5.2vw, 18px)",
          fontWeight: "bold",
          color: "#861d2d",
          whiteSpace: "nowrap",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            display: "inline-block",
            animation: visible
              ? "timeZoom 1.5s ease-in-out infinite"
              : "none",
          }}
        >
          Trước lễ: 6h00-08h00
          <br/>
          Sau lễ:   10h30-11h00
        </span>
      </div>

      {/* Hiệu ứng zoom liên tục */}
      <style>
        {`
          @keyframes timeZoom {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.15);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Page1;
