"use client";
import { useEffect } from "react";
import gsap from "gsap";

const LoadingScreen = () => {
  useEffect(() => {
    const counter1 = document.querySelector(".counter-1");
    const counter2 = document.querySelector(".counter-2");
    const counter3 = document.querySelector(".counter-3");

    // Populate counter-3 with digits dynamically
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    const animate = (counter, duration, delay = 0) => {
      const numHeight = counter.querySelector(".num").clientHeight;
      const totalDistance =
        (counter.querySelectorAll(".num").length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    };

    animate(counter3, 5);
    animate(counter2, 6);
    animate(counter1, 2, 4);

    gsap.to(".digit", {
      top: "-150px",
      stagger: { amount: 0.25 },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
    });

    gsap.from(".loader-1", {
      width: 0,
      duration: 6,
      ease: "power2.inOut",
    });

    gsap.from(".loader-2", {
      width: 0,
      delay: 1.9,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to(".loader", {
      background: "none",
      delay: 6,
      duration: 0.1,
    });

    gsap.to(".loader-1", {
      rotate: 90,
      y: -50,
      duration: 0.5,
      delay: 6,
    });

    gsap.to(".loader-2", {
      x: -75,
      y: 70,
      duration: 0.2,
      delay: 0,
    });

    gsap.to(".loader", {
      scale: 40,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(".loader", {
      rotate: 45,
      y: 500,
      x: 2000,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(".loading-screen", {
      opacity: 0,
      duration: 0.5,
      delay: 7.5,
      ease: "power1.inOut",
    });

    gsap.to("h1", {
      delay: 7,
      y: -80,
      ease: "power4.inOut",
      duration: 1.5,
      stagger: {
        amount: 0.1,
      },
    });
  }, []);

  return (
    <div className="relative w-screen h-screen font-sans overflow-hidden">
      <div className="absolute w-full h-full flex justify-center items-center">
        <div className="relative">
          <div className="flex">
            <h1 className="text-[80px] uppercase font-normal relative top-20 mx-2">Website</h1>
            <h1 className="text-[80px] uppercase font-normal relative top-20 mx-2">Content</h1>
          </div>
          <div className="absolute top-0 w-full h-full after:absolute after:top-20 after:left-0 after:w-[105%] after:h-[110%] after:bg-white" />
        </div>
      </div>

      <div className="fixed inset-0 bg-black text-white pointer-events-none loading-screen">
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[50px] flex bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 loader">
          <div className="w-[200px] h-[50px] bg-white loader-1 bar" />
          <div className="w-[100px] h-[50px] bg-white loader-2 bar" />
        </div>

        <div className="fixed left-[50px] bottom-[50px] flex h-[100px] text-[100px] leading-[102px] font-normal counter">
          <div className="relative -top-[15px] counter-1 digit">
            <div className="num">0</div>
            <div className="num num1offset">1</div>
          </div>
          <div className="relative -top-[15px] counter-2 digit">
            <div className="num">0</div>
            <div className="num">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
          </div>
          <div className="relative -top-[15px] counter-3 digit">
            <div className="num">0</div>
            <div className="num">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
