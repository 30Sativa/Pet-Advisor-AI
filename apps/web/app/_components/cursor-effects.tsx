"use client";

import { useEffect } from "react";

const isDesktopFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function CursorEffects() {
  useEffect(() => {
    if (!isDesktopFinePointer() || prefersReducedMotion()) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("cursor-glow");

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const update = () => {
      root.style.setProperty("--cursor-x", `${lastX}px`);
      root.style.setProperty("--cursor-y", `${lastY}px`);
      raf = 0;
    };

    const onMove = (event: MouseEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (!raf) {
        raf = window.requestAnimationFrame(update);
      }
    };

    const applyMagnetic = (el: HTMLElement) => {
      const maxOffset = 6;

      const onMagneticMove = (event: MouseEvent) => {
        if ("disabled" in el && (el as HTMLButtonElement).disabled) return;
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - rect.left - rect.width / 2;
        const relY = event.clientY - rect.top - rect.height / 2;
        const moveX = Math.max(Math.min(relX / 6, maxOffset), -maxOffset);
        const moveY = Math.max(Math.min(relY / 6, maxOffset), -maxOffset);
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      const onMagneticLeave = () => {
        el.style.transform = "translate(0px, 0px)";
      };

      el.addEventListener("mousemove", onMagneticMove);
      el.addEventListener("mouseleave", onMagneticLeave);

      return () => {
        el.removeEventListener("mousemove", onMagneticMove);
        el.removeEventListener("mouseleave", onMagneticLeave);
      };
    };

    const magneticTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".btn, [data-magnetic='true']")
    );

    const cleanups = magneticTargets.map((el) => {
      el.style.willChange = "transform";
      return applyMagnetic(el);
    });

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      root.classList.remove("cursor-glow");
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
