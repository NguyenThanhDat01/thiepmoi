
import { useEffect, useRef, useState } from "react";
import background from "../assets/backgourg1.png";
import anh1 from "../assets/anh1.jpg";
import anh2 from "../assets/anh2.jpg";
import anh3 from "../assets/anh3.jpg";
import noDo from "../assets/backgourg7.png";

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
          {/* KHUNG 3 ẢNH */}
          <div
            style={{
              position: "absolute",
              top: "-30px",
              left: "0",
              width: "125px",
              height: "440px",
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
                  marginTop: "5px",
                }}
              />
            ))}

            {/* NƠ Ở ĐÁY KHUNG 3 ẢNH */}
            <img
              src={noDo}
              alt="Nơ trang trí"
              style={{
                position: "absolute",
                bottom: "-30px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "110px",
                height: "auto",
                objectFit: "contain",
                pointerEvents: "none",
                zIndex: 4,
              }}
            />
          </div>

          {/* PHẦN CHỮ */}
          <div
            style={{
              width: "55%",
              maxWidth: "285px",
              marginLeft: "135px",
              marginTop: "-8px",
              padding: "20px 8px",
              boxSizing: "border-box",
              minWidth: 0,
              color: "#4A1728",
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: "clamp(12px, 3.2vw, 13px)",
              lineHeight: 1.25,
              textAlign: "justify",
              opacity: visible ? 1 : 0,
              animation: visible
                ? "contentFade 1.5s ease 1s both"
                : "none",
            }}
          >
            <p
              style={{
                textIndent: "18px",
                margin: "0 0 12px",
              }}
            >
              Một hành trình tại IUH đã khép lại, mang theo những tháng ngày
              đáng nhớ, từ những bỡ ngỡ đầu tiên khi bước chân vào giảng đường
              đến những lúc trưởng thành hơn qua từng bài học, thử thách và trải
              nghiệm.
            </p>

            <p
              style={{
                textIndent: "18px",
                margin: "0 0 12px",
              }}
            >
              Trên hành trình ấy, mình thật may mắn khi luôn nhận được sự yêu
              thương, quan tâm và đồng hành từ gia đình, thầy cô, bạn bè, anh
              chị cùng những người đã từng gặp gỡ. Cảm ơn tất cả vì đã góp phần
              tạo nên một quãng đời sinh viên thật nhiều ý nghĩa và kỷ niệm đẹp.
            </p>

            <p
              style={{
                textIndent: "18px",
                margin: 0,
              }}
            >
              Tấm bằng tốt nghiệp hôm nay không chỉ là dấu mốc của những nỗ lực
              đã qua, mà còn là khởi đầu cho những ước mơ mới. Mong rằng mỗi
              chúng ta sẽ luôn vững bước, gặp nhiều may mắn và tỏa sáng trên
              hành trình phía trước! ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2;
