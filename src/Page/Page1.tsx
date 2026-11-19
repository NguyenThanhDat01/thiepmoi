
import { useEffect, useRef, useState } from "react";
import totnghiep from "../assets/totnghiep.png";

function Page1() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Kích hoạt hiệu ứng khi Page1 xuất hiện
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
        width: "100%",
        maxWidth: "426px",
        margin: "0 auto",
        padding: "0",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <img
        src={totnghiep}
        alt="Thiệp tốt nghiệp"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
          margin: "0 auto",

          // Hiệu ứng bay lên và zoom nhẹ
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(70px) scale(0.88)",
          transition:
            "opacity 1.2s ease, transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}

export default Page1;
