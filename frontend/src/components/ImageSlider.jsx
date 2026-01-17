import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageSlider = () => {
  const navigate = useNavigate();

  // 🔴 IMAGE + PRODUCT ID
  const slides = [
    {
      image:
        "https://res.cloudinary.com/dmt9lcnbq/image/upload/v1768650224/medibazaar/products/xfc54bh8wt3hqvnmoqht.jpg",
      productId: "69678ab0667fa38879a4fde0",
    },
    {
      image:
        "https://res.cloudinary.com/dmt9lcnbq/image/upload/v1768649762/medibazaar/products/tnxyhininjtnjo8nlexs.jpg",
      productId: "69678ab0667fa38879a4fd1a",
    },
    {
      image:
        "https://res.cloudinary.com/dmt9lcnbq/image/upload/v1768647759/WhatsApp_Image_2026-01-17_at_4.26.11_PM_kzyewh.jpg",
      productId: "696b90afdc20a987f0c3df03",
    },
    {
      image:
        "https://res.cloudinary.com/dmt9lcnbq/image/upload/v1768649506/medibazaar/products/jphkpdbi0dopioe2ao9t.jpg",
      productId: "69678ab0667fa38879a4fde6",
    },
    {
      image:
        "https://res.cloudinary.com/dmt9lcnbq/image/upload/v1768652426/WhatsApp_Image_2026-01-17_at_4.26.11_PM_1_c7tgph.jpg",
      productId: "69678ab0667fa38879a4fde6",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden rounded-3xl shadow-2xl bg-gray-100">

      {/* SLIDES */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-full cursor-pointer"
            onClick={() => navigate(`/products/${slide.productId}`)}
          >
            <img
              src={slide.image}
              alt="product-slide"
              className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* ARROWS */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg text-xl"
      >
        ‹
      </button>

      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg text-xl"
      >
        ›
      </button>
    </div>
  );
};

export default ImageSlider;
