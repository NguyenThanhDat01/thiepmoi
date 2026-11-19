
import { useEffect, useRef, useState } from "react";
import "./App.css";

import nhac from "./assets/nhac2.mp3";

import Page1 from "./Page/Page1";
import Page2 from "./Page/Page2";
import Page3 from "./Page/Page3";
import Page4 from "./Page/Page4";
import Page5 from "./Page/Page5";
import Page6 from "./Page/Page6";

const pages = [Page1, Page2, Page6, Page3, Page4, Page5];

function App() {
  const [opened, setOpened] = useState(false);
  const [loadedPages, setLoadedPages] = useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const openInvitation = async () => {
    setOpened(true);

    try {
      await audioRef.current?.play();
    } catch (error) {
      console.log("Không thể phát nhạc:", error);
    }
  };

  // Chỉ tải trang tiếp theo khi cuộn đến cuối trang hiện tại
  useEffect(() => {
    if (!opened || loadedPages >= pages.length) return;

    const target = bottomRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadedPages((current) =>
            Math.min(current + 1, pages.length)
          );
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [opened, loadedPages]);

  return (
    <main className="invitation">
      <audio
        ref={audioRef}
        src={nhac}
        loop
        preload="auto"
      />

      {!opened ? (
        <section className="opening">
          <div className="envelope-wrapper">
            <div className="envelope">
              <div className="envelope-back" />

              <div className="envelope-paper">
                <span>Graduation</span>
              </div>

              <div className="envelope-flap" />
              <div className="envelope-front" />
              <div className="envelope-bow">🎀</div>
            </div>
          </div>

          <h2
            style={{
              color: "#842b40",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Thân mời bạn
          </h2>

          <p>Một lời mời nhỏ, một ngày thật đặc biệt</p>

          <button onClick={openInvitation}>
            Nhấn để mở thiệp
          </button>
        </section>
      ) : (
        <div className="invitation-content">
          {pages.slice(0, loadedPages).map((Page, index) => (
            <section className="scroll-page" key={index}>
              <Page />
            </section>
          ))}

          {/* Điểm theo dõi để tải trang tiếp theo */}
          {loadedPages < pages.length && (
            <div
              ref={bottomRef}
              className="page-loading-trigger"
            />
          )}
        </div>
      )}
    </main>
  );
}

export default App;
