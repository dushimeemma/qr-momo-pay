"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from "html-to-image";

type Mode = "code" | "phone";

export default function QRGenerator() {
  const [shopName, setShopName] = useState("");
  const [mode, setMode] = useState<Mode>("code");
  const [value, setValue] = useState("");
  const [ussd, setUssd] = useState("");

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Generate USSD
  const generate = () => {
    if (!shopName.trim() || !value.trim()) {
      alert("Please fill all fields");
      return;
    }

    const rawUssd =
      mode === "code" ? `*182*8*1*${value}#` : `*182*1*1*${value}#`;

    setUssd(`tel:${rawUssd}`);
  };

  // Copy USSD
  const copy = async () => {
    if (!ussd) return;
    await navigator.clipboard.writeText(ussd);
    alert("Copied!");
  };

  // Download full card (NOT just QR)
  const downloadCard = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current, {
      backgroundColor: "#ffffff",
      pixelRatio: 3,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${shopName || "qr-card"}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-xl font-bold text-center mb-4">QR USSD Generator</h1>

      {/* Shop Name */}
      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Shop Name"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />

      {/* Mode */}
      <select
        className="w-full border p-2 rounded mb-3"
        value={mode}
        onChange={(e) => setMode(e.target.value as Mode)}
      >
        <option value="code">Code</option>
        <option value="phone">Phone</option>
      </select>

      {/* Value */}
      <input
        className="w-full border p-2 rounded mb-3"
        placeholder={mode === "code" ? "Enter Code" : "Enter Phone"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Generate */}
      <button
        onClick={generate}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Generate QR
      </button>

      {/* RESULT CARD */}
      {ussd && (
        <div className="mt-6 flex flex-col items-center space-y-3">
          {/* THIS IS WHAT WILL BE DOWNLOADED */}
          <div
            ref={cardRef}
            className="bg-white p-6 w-[280px] text-center border rounded-xl"
          >
            {/* SHOP NAME (dynamic) */}
            <h2 className="text-lg font-bold mb-3">{shopName}</h2>

            {/* QR */}
            <div className="flex justify-center">
              <QRCodeCanvas value={ussd} size={180} />
            </div>

            {/* USSD */}
            <p className="text-sm mt-3 break-all">{ussd.replace("tel:", "")}</p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Copy
            </button>

            <button
              onClick={downloadCard}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
