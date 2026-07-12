// ProductPdfView.tsx

import React, { useEffect, useRef } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useProducts } from "@/contexts/ProductContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ProductPdfView() {
  const { id: productId } = useParams();
  const { getProductById } = useProducts();
  const navigate = useNavigate();

  const contentRef = useRef<HTMLDivElement>(null);

  const product = productId ? getProductById(productId) : null;

  useEffect(() => {
    if (!product || !contentRef.current) return;

    const generatePdf = async () => {
      const node = contentRef.current;

      const images = Array.from(node.querySelectorAll("img"));

      await Promise.all(
        images.map(
          (img) =>
            img.complete
              ? Promise.resolve()
              : new Promise<void>((resolve) => {
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                })
        )
      );

      const canvas = await html2canvas(node, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const imgData = canvas.toDataURL("image/png");

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pageHeight;
      }

      const blob = pdf.output("blob");

      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");

      navigate("/catalog", { replace: true });
    };

    generatePdf();
  }, [product, navigate]);

  if (!productId || !product) {
    return <Navigate to="/catalog" replace />;
  }
console.log(product.specifications);
 let specPairs: [string, string][] = [];

try {
  const specs =
    typeof product.specifications === "string"
      ? JSON.parse(product.specifications)
      : product.specifications;

  if (Array.isArray(specs)) {
    specPairs = specs.map((item: any) => [
      item.key,
      item.value,
    ]);
  } else {
    specPairs = Object.entries(specs || {}) as [string, string][];
  }
} catch {
  specPairs = [];
}

  return (
    <div
      style={{
        position: "fixed",
        left: "-9999px",
        top: 0,
        width: "794px",
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: "794px",
          padding: "40px",
          background: "#ffffff",
          fontFamily: "Arial,sans-serif",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            borderBottom: "3px solid #14294C",
            paddingBottom: "18px",
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#14294C",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              color: "#777",
              marginTop: "8px",
              fontSize: "14px",
              textTransform: "capitalize",
            }}
          >
            {product.category}
          </p>
        </div>


        {/* TOP SECTION */}

        <div
          style={{
            display: "flex",
            gap: "30px",
            marginBottom: "35px",
          }}
        >

          {/* IMAGE */}

          <div
            style={{
              width: "45%",
            }}
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              crossOrigin="anonymous"
              style={{
                width: "100%",
                height: "340px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>



          {/* RIGHT SIDE */}

          <div
            style={{
              width: "55%",
            }}
          >

            {/* <div
              style={{
                display: "inline-block",
                background: "#14294C",
                color: "#fff",
                padding: "0 6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                marginBottom: "15px",
              }}
            >
              {product.category}
            </div> */}


            <h2
              style={{
                marginTop: 0,
                color: "#14294C",
                fontSize: "30px",
                fontWeight: 700,
              }}
            >
              {product.name}
            </h2>



            <p
              style={{
                color: "#555",
                lineHeight: "1.8",
                fontSize: "14px",
                marginBottom: "25px",
              }}
            >
              {product.description}
            </p>



            <div
              style={{
                fontSize: "15px",
                color: "#555",
              }}
            >
              Starting From
            </div>

            <div
              style={{
                fontSize: "30px",
                color: "#14294C",
                fontWeight: 700,
                marginTop: "5px",
              }}
            >
              ₹ {product.price.toLocaleString()}
            </div>



            <div
              style={{
                marginTop: "25px",
                background: "#C75A22",
                color: "#fff",
                padding: "14px",
                textAlign: "center",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "15px",
              }}
            >
              Request Quote
            </div>

          </div>
        </div>



        {/* SPECIFICATIONS */}

        <h2
          style={{
            color: "#14294C",
            fontSize: "22px",
            marginBottom: "15px",
          }}
        >
          Specifications
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "30px",
          }}
        >
          <tbody>
            {specPairs.map(([key, value], index) => (
              <tr
                key={key}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "#f9fafb"
                      : "#ffffff",
                }}
              >
                <td
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: "12px",
                    fontWeight: 600,
                    width: "35%",
                    color: "#14294C",
                  }}
                >
                  {key}
                </td>

                <td
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: "12px",
                    color: "#555",
                  }}
                >
                  {String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>



        {/* FOOTER */}

        <div
          style={{
            borderTop: "2px solid #E5E7EB",
            paddingTop: "20px",
            textAlign: "center",
            color: "#888",
            fontSize: "13px",
          }}
        >
          Premium Furniture Collection
        </div>

      </div>
    </div>
  );
}