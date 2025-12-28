import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight, faUtensils, faShare} from "@fortawesome/free-solid-svg-icons";
import html2canvas from 'html2canvas-pro';

export default function App() {
  const [items, setItems] = useState(null);

  const categories = [
    [
      "গাজর, ক্যাপসিকাম ভাজা",
      "মুলো ভাজা",
      "বিট ভাজা",
      "ফুলকপি ভাজা",
      "কাঁচকলার ভাজা",
      "কুমড়ো ভাজা",
      "উচ্ছে ভাজা",
      "পটল ভাজা",
      "সিম ভাজা",
      "বেগুন ভাজা",
      "আলু ভাজা",
      "পালং শাক ভাজা",
      "লাল শাক ভাজা",
      "মেথি শাক ভাজা",
      "পুঁই শাক ভাজা",
    ],
    [
      "রুই মাছের ঝোল",
      "ইলিশ মাছের ঝোল",
      "পাবদা মাছের ঝোল",
      "পুঁটি মাছের ঝোল",
      "মৌরলা মাছের ঝোল",
      "চিংড়ি মাছের মালাইকারি",
      "রুই মাছের কালিয়া",
      "কাতলা মাছের কালিয়া",
      "মাছের ঝাল",
      "সরষে ইলিশ",
      "আমুদি মাছের ঝাল",
      "লটে মাছের ঝাল",
      "ভোলা মাছের ঝাল",
      "পাবদা মাছের ঝাল",
      "পার্সে মাছের ঝাল",
    ],
    [
      "মুসুর ডাল",
      "মুগ ডাল",
      "মিক্স ডাল",
      "ফুলকপি আলু তরকারি",
      "সয়াবিন তরকারি",
      "আলু বেগুন বড়ি রসা",
      "মিক্স সবজি ঝোল",
      "পনির আলু তরকারি",
      "আলু পোস্ত",
      "পেঁয়াজ পোস্ত",
      "টমেটো পোস্ত",
      "ঝিঙে পোস্ত",
      "পটল আলু তরকারি",
      "ভেন্ডি আলু তরকারি",
      "বড়ি আলু টমেটো",
      "ডিমের তরকারি",
    ],
    [
      "বাঁধাকপির ঘন্টো",
      "নবরত্ন তরকারি",
      "কুমড়ো পুঁইশাক ঘন্টো",
      "কুমড়ো ছোলার ঘাঁট",
      "শুক্তো",
      "চচ্চড়ি",
    ],
  ];

  const shuffleMenu = () => {
    setItems(categories.map(cat => cat[Math.floor(Math.random() * cat.length)]));
  };

  const shuffleSingleItem = (index) => {
    setItems(prev => {
      if (!prev) return prev;
      const next = [...prev];
      const opts = categories[index];
      let v;
      do {
        v = opts[Math.floor(Math.random() * opts.length)];
      } while (v === next[index]);
      next[index] = v;
      return next;
    });
  };

  const captureAndShare = async () => {
    const element = document.getElementById("menuCard");

    const canvas = await html2canvas(element, {
      scale: 2,      // better quality
      useCORS: true
    });

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], "menu.jpg", {
        type: "image/jpeg"
      });

      // ✅ Web Share API (mobile)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Today's Menu",
          text: "আজকের রান্না"
        });
      } else {
        // fallback (desktop)
        const url = URL.createObjectURL(blob);
        window.open(url);
      }
    }, "image/jpeg", 0.95);
  };

  return (
      <div
          className="h-dvh overflow-hidden bg-slate-100 p-5 flex flex-col"
          style={{ fontFamily: '"Noto Sans Bengali", sans-serif' }}>
        <div
            id="menuCard"
            className="relative flex-1 rounded-2xl shadow-lg overflow-hidden flex flex-col justify-center bg-no-repeat bg-bottom"
            style={{ backgroundImage: "url(bg.jpg)", backgroundColor: "#FBF0EC", backgroundSize: "100% auto" }}>
          <div className="absolute inset-0 bg-white/75" />
          <div className="relative z-10 p-6 flex-1 flex flex-col justify-center">
            <div
                className="absolute inset-0 opacity-10"
                style={{backgroundImage: "url(food.png)", backgroundSize: "270px 270px"}}></div>
            <div className="flex flex-col justify-center z-10">
              {!items ? (
                  <div className="flex items-center justify-center flex-1">
                    <button
                        onClick={shuffleMenu}
                        type="button"
                        className="cursor-pointer flex items-center gap-3 px-8 py-4 bg-[#652810] text-white text-lg font-semibold rounded-full">
                      <FontAwesomeIcon icon={faUtensils} />
                      Generate Menu
                    </button>
                  </div>
              ) : (
                  <div className="space-y-6 flex-1 flex flex-col justify-center">
                    {items.map((item, i) => (
                        <div key={i} className="flex flex-col w-full">
                          <p onClick={() => shuffleSingleItem(i)}
                             className="flex items-center justify-center gap-3 text-2xl font-bold pt-4 pb-8 relative px-0 w-full cursor-pointer">
                            {item}
                          </p>
                          {i !== items.length - 1 && (
                              <div className="w-full border-t border-dashed border-slate-400" />
                          )}
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>

        {items && (
            <div className="pt-4 flex items-center gap-2">
              <button
                  onClick={shuffleMenu}
                  type="button"
                  className="grow cursor-pointer flex items-center justify-center gap-2 w-full py-3 px-5  bg-[#652810] text-white rounded-full">
                <FontAwesomeIcon icon={faRotateRight} />
                Regenerate
              </button>

              <button
                  onClick={captureAndShare}
                  type="button"
                  className="cursor-pointer flex items-center justify-center gap-2 py-3 px-5  bg-[#652810] text-white rounded-full">
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
            </div>
        )}
      </div>
  );
}
