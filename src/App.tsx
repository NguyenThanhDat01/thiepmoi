
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

  // Tự thử tiếp tục nhạc khi quay lại website
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const resumeAudio = async () => {
      if (
        hasStarted.current &&
        document.visibilityState === "visible" &&
        audio.paused &&
        !audio.ended
      ) {
        try {
          await audio.play();
        } catch (error) {
          console.log("Không thể tiếp tục phát nhạc:", error);
        }
      }
    };

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
          <h2>
            Thân mời bạn
          </h2>

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
