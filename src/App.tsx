
import { useRef, useState } from "react";
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

  const openInvitation = async () => {
    if (opened) return;

    setOpened(true);

    try {
      await audioRef.current?.play();
    } catch (error) {
      console.log("Không thể phát nhạc:", error);
    }

    // Đợi hiệu ứng mở phong bì hoàn tất
    setTimeout(() => {
      setShowContent(true);
    }, 3000);
  };

  return (
    <main className="invitation">

      {/* Nhạc nền */}
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

              {/* Mặt sau */}
              <div className="envelope-back" />

              {/* Lá thư chứa ảnh thiệp */}
              <div className="envelope-paper">
                <img
                  src={thiepTotNghiep}
                  alt="Lễ tốt nghiệp Lê Lâm Linh"
                />
              </div>

              {/* Nắp phong bì */}
              <div className="envelope-flap" />

              {/* Mặt trước phong bì */}
              <div className="envelope-front" />

              {/* Nơ */}
              <div className="envelope-bow">
                🎀
              </div>

            </div>
          </div>

          {/* Nội dung lời mời */}
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

        /* Nội dung thiệp sau khi mở */
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
