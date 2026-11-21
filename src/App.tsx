
import { useEffect, useRef, useState } from "react";
import "./App.css";

import nhac from "./assets/nhac2.mp3";
import thiepTotNghiep from "./assets/anh5.png";

import Page1 from "./Page/Page1";
import Page2 from "./Page/Page2";
import Page3 from "./Page/Page3";
import Page4 from "./Page/Page4";
import Page5 from "./Page/Page5";
import Page6 from "./Page/Page6";

function App() {
  const [opened, setOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [needsResume, setNeedsResume] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);
  const isResuming = useRef(false);

  // Hàm tiếp tục nhạc
  const resumeAudio = async () => {
    const audio = audioRef.current;

    if (
      !audio ||
      !hasStarted.current ||
      !audio.paused ||
      isResuming.current
    ) {
      return;
    }

    isResuming.current = true;

    try {
      await audio.play();
      setNeedsResume(false);
    } catch (error) {
      console.log("Trình duyệt đang chặn phát nhạc:", error);
      setNeedsResume(true);
    } finally {
      isResuming.current = false;
    }
  };

  // Tự động tiếp tục nhạc ngay khi quay lại website
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        resumeAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", handleVisibility);
    window.addEventListener("focus", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
    };
  }, []);

  // Mở thiệp và phát nhạc
  const openInvitation = async () => {
    if (opened) return;

    setOpened(true);

    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.5;
      hasStarted.current = true;

      try {
        await audio.play();
        setNeedsResume(false);
      } catch (error) {
        console.log("Không thể phát nhạc:", error);
        setNeedsResume(true);
      }
    }

    // Đợi hiệu ứng mở phong bì hoàn tất
    setTimeout(() => {
      setShowContent(true);
    }, 4000);
  };

  // Người dùng bấm tiếp tục nhạc nếu trình duyệt chặn
  const handleResumeMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setNeedsResume(false);
    } catch (error) {
      console.log("Không thể tiếp tục phát nhạc:", error);
      setNeedsResume(true);
    }
  };

  return (
    <main className="invitation">

      {/* Nhạc nền duy nhất cho toàn bộ website */}
      <audio
        ref={audioRef}
        src={nhac}
        loop
        preload="auto"
      />

      {!showContent ? (
        <section className={`opening ${opened ? "opened" : ""}`}>

          {/* Phong bì */}
          <div className="envelope-wrapper">
            <div className="envelope">

              <div className="envelope-back" />

              <div className="envelope-paper">
                <img
                  src={thiepTotNghiep}
                  alt="Lễ tốt nghiệp Lê Lâm Linh"
                />
              </div>

              <div className="envelope-flap" />

              <div className="envelope-front" />

              <div className="envelope-bow">
                🎀
              </div>

            </div>
          </div>

          {/* Lời mời */}
          <h2>Thân mời bạn</h2>

          <p>
            Một lời mời nhỏ, một ngày thật đặc biệt
          </p>

          <button
            onClick={openInvitation}
            disabled={opened}
          >
            {opened ? "Đang mở thiệp..." : "Nhấn để mở thiệp"}
          </button>

        </section>
      ) : (

        <div className="invitation-content">
          <Page1 />
          <Page2 />
          <Page6 />
          <Page3 />
          <Page4 />
          <Page5 />
        </div>

      )}

      {/* Chỉ hiện khi trình duyệt không cho tự phát nhạc */}
      {needsResume && opened && (
        <button
          onClick={handleResumeMusic}
          style={{
            position: "fixed",
            right: "16px",
            bottom: "20px",
            zIndex: 99999,
            padding: "10px 18px",
            border: "none",
            borderRadius: "30px",
            background: "#7c1c27",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
          }}
        >
          ▶ Tiếp tục nhạc
        </button>
      )}

    </main>
  );
}

export default App;
