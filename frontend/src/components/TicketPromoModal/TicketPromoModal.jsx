import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import "./TicketPromoModal.css";

import popupDesktopWebp from "../../assets/popup-desktop.webp";
import popupDesktopJpg from "../../assets/popup-desktop.optimized.jpg";
import popupMobileWebp from "../../assets/popup-mobile.webp";
import popupMobileJpg from "../../assets/popup-mobile.optimized.jpg";

const BOOKING_URL =
  "https://www.pvrcinemas.lk/seatlayout/zUUh(iFDnZ7Y)GGXY0V1yA==";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function TicketPromoModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocusedEl = useRef(null);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedEl.current = document.activeElement;

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusableEls = Array.from(
        modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusableEls.length === 0) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedEl.current?.focus?.();
    };
  }, [isOpen, handleClose]);

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="rd-ticket-modal-overlay"
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="rd-ticket-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rd-ticket-modal-title"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="rd-ticket-modal-close"
          onClick={handleClose}
          aria-label="Close ticket booking announcement"
        >
          <X size={18} strokeWidth={2.4} aria-hidden="true" />
        </button>

        <h2 id="rd-ticket-modal-title" className="rd-ticket-modal-visually-hidden">
          Book your tickets
        </h2>

        <picture>
          <source
            media="(min-width: 640px)"
            srcSet={popupDesktopWebp}
            type="image/webp"
          />
          <source
            media="(min-width: 640px)"
            srcSet={popupDesktopJpg}
            type="image/jpeg"
          />
          <source srcSet={popupMobileWebp} type="image/webp" />
          <img
            src={popupMobileJpg}
            alt="Book your tickets now"
            className="rd-ticket-modal-img"
            width="840"
            height="1281"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <p className="rd-ticket-modal-reserve">
          Reserve Your Seats at{" "}
          <a
            className="rd-ticket-modal-reserve-link"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            PVR Cinemas Colombo
          </a>
        </p>
      </div>
    </div>
  );
}
