
import { useEffect, useRef, useState } from "react";
import background from "../assets/backgourg7.png";
import anh1 from "../assets/anh1.jpg";
import anh2 from "../assets/anh2.jpg";
import anh3 from "../assets/anh3.jpg";

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
        maxWidth: "426px",
        minHeight: "620px",
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

              @keyframes contentFade {
                from {
                  opacity: 0;
                  transform: translateY(35px);
                }

                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>
        </h1>

        {/* Nội dung dành cho những người bạn thân */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            minHeight: "420px",
            position: "relative",
            zIndex: 2,
            boxSizing: "border-box",
          }}
        >

          {/* KHUNG 3 ẢNH - CHỈ THÊM PHẦN NÀY */}
          <div
            style={{
              position: "absolute",
              top: "9",
              left: "0",
              width: "125px",
              height: "420px",
              backgroundColor: "#85132f",
              padding: "10px 13px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              zIndex: 3,
              opacity: visible ? 1 : 0,
              animation: visible
                ? "contentFade 1.5s ease 1s both"
                : "none",
            }}
          >
            {[anh1, anh2, anh3].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Ảnh ${index + 1}`}
                style={{
                  width: "100%",
                  height: "111px",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* GIỮ NGUYÊN PHẦN CHỮ CỦA BẠN */}
          <div
            style={{
         
              width: "55%",
              maxWidth: "285px",
              marginLeft: "135px",
              padding: "40px 8px",
              boxSizing: "border-box",
              minWidth: 0,
              color: "#4A1728",
              fontFamily: "Georgia, serif",
              fontSize: "clamp(12px, 3.2vw, 13px)",
              lineHeight: 1.55,
              textAlign: "justify",
              opacity: visible ? 1 : 0,
              animation: visible
                ? "contentFade 1.5s ease 1s both"
                : "none",
            }}
          >
            Có những người xuất hiện trong thanh xuân không chỉ để cùng ta
            đi qua những ngày tháng tuổi trẻ, mà còn để biến những ngày
            bình thường trở thành những kỷ niệm thật đặc biệt.

            <br />
            <br />

            Cảm ơn vì đã cùng nhau cười thật nhiều, chia sẻ những câu chuyện
            chẳng đầu chẳng cuối, cùng trải qua những ngày học tập bận rộn
            và cả những khoảnh khắc đáng nhớ dưới mái trường.

            <br />
            <br />

            <div
              style={{
                textAlign: "center",
                fontStyle: "italic",
                fontWeight: "bold",
                color: "#a20d36",
                lineHeight: 1.6,
              }}
            >
              "We may be going different ways, but you'll always be a part
              of my favorite chapter — Youth."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2;
