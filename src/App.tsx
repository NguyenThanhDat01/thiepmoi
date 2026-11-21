
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

  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);

  // Theo dõi và tiếp tục nhạc khi quay lại website
  useEffect(() => {
    const resumeAudio = () => {
      const audio = audioRef.current;

      if (
        document.visibilityState === "visible" &&
        hasStarted.current &&
        audio &&
        audio.paused
      ) {
        audio.play().catch((error) => {
          console.log("Không thể tự phát lại nhạc:", error);
        });
      }
    };

    document.addEventListener("visibilitychange", resumeAudio);
    window.addEventListener("pageshow", resumeAudio);
    window.addEventListener("focus", resumeAudio);

    return () => {
      document.removeEventListener("visibilitychange", resumeAudio);
      window.removeEventListener("pageshow", resumeAudio);
      window.removeEventListener("focus", resumeAudio);
    };
  }, []);

  // Mở thiệp và phát nhạc
  const openInvitation = async () => {
    if (opened) return;

    setOpened(true);

    const audio = audioRef.current;

    if (audio) {
      try {
        audio.volume = 0.5;
        await audio.play();
        hasStarted.current = true;
      } catch (error) {
        console.log("Không thể phát nhạc:", error);
      }
    }

    // Đợi hiệu ứng mở phong bì hoàn tất
    setTimeout(() => {
      setShowContent(true);
    }, 4000);
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

    </main>
  );
}

export default App;
